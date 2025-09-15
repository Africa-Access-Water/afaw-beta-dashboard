// Client service for calling PDF Receipt API from other microservices

import { 
  GenerateReceiptRequest, 
  GenerateReceiptResponse, 
  HealthCheckResponse,
  DonationData,
  OrganizationInfo 
} from './types';

export interface PdfApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export class PdfApiClient {
  private baseUrl: string;
  private apiKey?: string;
  private timeout: number;

  constructor(config: PdfApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000; // 30 seconds default
  }

  /**
   * Generate PDF receipt by calling the microservice API
   */
  async generateReceipt(
    donation: DonationData, 
    organizationInfo?: OrganizationInfo
  ): Promise<GenerateReceiptResponse> {
    const request: GenerateReceiptRequest = {
      donation,
      organizationInfo
    };

    try {
      const response = await this.makeRequest('/api/v1/pdf/generate-receipt', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Error calling PDF API:', error);
      return {
        success: false,
        error: 'API_CALL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Check if the PDF service is healthy
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      const response = await this.makeRequest('/api/v1/pdf/health', {
        method: 'GET',
        headers: {
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Error calling health check:', error);
      return {
        success: false,
        message: 'Health check failed',
        timestamp: new Date().toISOString(),
        version: 'unknown'
      };
    }
  }

  /**
   * Download PDF receipt directly (for testing or direct download scenarios)
   */
  async downloadReceipt(
    donation: DonationData, 
    organizationInfo?: OrganizationInfo
  ): Promise<Blob> {
    const request: GenerateReceiptRequest = {
      donation,
      organizationInfo
    };

    try {
      const response = await this.makeRequest('/api/v1/pdf/download-receipt', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  }

  /**
   * Make HTTP request with timeout and error handling
   */
  private async makeRequest(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }
}

// Example usage in another microservice:
/*
import { PdfApiClient } from './pdfApiClient';

// Initialize the client
const pdfClient = new PdfApiClient({
  baseUrl: 'http://pdf-service:3000', // Your PDF microservice URL
  apiKey: 'your-api-key', // Optional
  timeout: 30000
});

// Generate receipt
const donation = {
  id: 123,
  name: 'John Doe',
  email: 'john@example.com',
  amount: 100.00,
  message: 'Keep up the great work!',
  created_at: '2025-01-27T10:30:00Z',
  method: 'Credit Card',
  transaction_id: 'txn_123456789'
};

const organizationInfo = {
  name: 'AFRICA ACCESS WATER',
  address: 'Lot 5676/M/6, Lusaka West, Lusaka, Zambia',
  email: 'info@africaaccesswater.org',
  phone: '+260 211 231 174 | +260 976 944 695',
  website: 'www.africaaccesswater.org',
  regNumber: 'Non-profit Organization, Company No. 120190001569'
};

try {
  // Generate PDF receipt
  const result = await pdfClient.generateReceipt(donation, organizationInfo);
  
  if (result.success && result.data) {
    // Use the base64 PDF data
    const pdfBase64 = result.data.pdfBase64;
    const filename = result.data.filename;
    
    // Convert to blob if needed for email attachment
    const pdfBlob = new Blob([
      Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))
    ], { type: 'application/pdf' });
    
    // Now you can attach this to an email or save it
    console.log('PDF generated successfully:', filename);
  } else {
    console.error('Failed to generate PDF:', result.message);
  }
} catch (error) {
  console.error('Error:', error);
}
*/
