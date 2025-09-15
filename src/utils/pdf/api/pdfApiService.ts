import { PDFService } from '../pdfService';
import { 
  GenerateReceiptRequest, 
  GenerateReceiptResponse, 
  ApiErrorResponse,
  HealthCheckResponse,
  DonationData,
  OrganizationInfo
} from './types';

export class PDFApiService {
  private static readonly API_VERSION = '1.0.0';

  /**
   * Generate PDF receipt and return as base64 encoded string
   * This is the main endpoint for microservice communication
   */
  static async generateReceipt(request: GenerateReceiptRequest): Promise<GenerateReceiptResponse> {
    try {
      // Validate request
      const validationError = this.validateRequest(request);
      if (validationError) {
        return {
          success: false,
          error: 'VALIDATION_ERROR',
          message: validationError
        };
      }

      // Generate PDF blob
      const pdfBlob = await PDFService.generateDonationReceiptBlob(
        request.donation,
        request.organizationInfo
      );

      // Convert blob to base64
      const pdfBase64 = await this.blobToBase64(pdfBlob);
      
      // Generate filename
      const filename = this.generateFilename(request.donation);

      return {
        success: true,
        data: {
          pdfBase64,
          filename,
          contentType: 'application/pdf'
        },
        message: 'PDF receipt generated successfully'
      };

    } catch (error) {
      console.error('Error generating PDF receipt:', error);
      return {
        success: false,
        error: 'PDF_GENERATION_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Health check endpoint
   */
  static async healthCheck(): Promise<HealthCheckResponse> {
    return {
      success: true,
      message: 'PDF Receipt Service is healthy',
      timestamp: new Date().toISOString(),
      version: this.API_VERSION
    };
  }

  /**
   * Validate the incoming request
   */
  private static validateRequest(request: GenerateReceiptRequest): string | null {
    if (!request) {
      return 'Request body is required';
    }

    if (!request.donation) {
      return 'Donation data is required';
    }

    const { donation } = request;

    // Validate required donation fields
    if (!donation.id || typeof donation.id !== 'number') {
      return 'Valid donation ID is required';
    }

    if (!donation.name || typeof donation.name !== 'string') {
      return 'Donation name is required';
    }

    if (!donation.email || typeof donation.email !== 'string') {
      return 'Valid donation email is required';
    }

    if (!donation.amount || typeof donation.amount !== 'number' || donation.amount <= 0) {
      return 'Valid donation amount is required';
    }

    if (!donation.created_at || typeof donation.created_at !== 'string') {
      return 'Valid donation date is required';
    }

    if (!donation.method || typeof donation.method !== 'string') {
      return 'Payment method is required';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donation.email)) {
      return 'Invalid email format';
    }

    // Validate date format
    if (isNaN(Date.parse(donation.created_at))) {
      return 'Invalid date format';
    }

    return null;
  }

  /**
   * Convert blob to base64 string
   */
  private static async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:application/pdf;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Generate filename for the receipt
   */
  private static generateFilename(donation: DonationData): string {
    const date = new Date(donation.created_at).toISOString().split('T')[0];
    return `donation-receipt-${donation.id}-${date}.pdf`;
  }

  /**
   * Convert base64 back to blob (utility method for testing)
   */
  static base64ToBlob(base64: string, contentType: string = 'application/pdf'): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
}
