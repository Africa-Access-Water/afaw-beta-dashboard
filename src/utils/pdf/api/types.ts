// API Types for PDF Receipt Service

export interface DonationData {
  id: number;
  name: string;
  email: string;
  amount: number;
  message?: string;
  created_at: string;
  method: string;
  transaction_id?: string;
}

export interface OrganizationInfo {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  regNumber?: string;
}

// API Request Types
export interface GenerateReceiptRequest {
  donation: DonationData;
  organizationInfo?: OrganizationInfo;
}

export interface GenerateReceiptResponse {
  success: boolean;
  data?: {
    pdfBase64: string;
    filename: string;
    contentType: string;
  };
  error?: string;
  message?: string;
}

// API Error Response
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// Health Check Response
export interface HealthCheckResponse {
  success: boolean;
  message: string;
  timestamp: string;
  version: string;
}
