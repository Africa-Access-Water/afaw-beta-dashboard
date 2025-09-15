# PDF Receipt API Service

This service provides REST API endpoints for generating PDF receipts that can be called from other microservices.

## API Endpoints

### 1. Generate Receipt
**POST** `/api/v1/pdf/generate-receipt`

Generates a PDF receipt and returns it as base64 encoded string.

**Request Body:**
```json
{
  "donation": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 100.00,
    "message": "Keep up the great work!",
    "created_at": "2025-01-27T10:30:00Z",
    "method": "Credit Card",
    "transaction_id": "txn_123456789"
  },
  "organizationInfo": {
    "name": "AFRICA ACCESS WATER",
    "address": "Lot 5676/M/6, Lusaka West, Lusaka, Zambia",
    "email": "info@africaaccesswater.org",
    "phone": "+260 211 231 174 | +260 976 944 695",
    "website": "www.africaaccesswater.org",
    "regNumber": "Non-profit Organization, Company No. 120190001569"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pdfBase64": "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
    "filename": "donation-receipt-123-2025-01-27.pdf",
    "contentType": "application/pdf"
  },
  "message": "PDF receipt generated successfully"
}
```

### 2. Health Check
**GET** `/api/v1/pdf/health`

**Response:**
```json
{
  "success": true,
  "message": "PDF Receipt Service is healthy",
  "timestamp": "2025-01-27T10:30:00Z",
  "version": "1.0.0"
}
```

### 3. Download Receipt
**POST** `/api/v1/pdf/download-receipt`

Same request body as generate-receipt, but returns PDF file directly for download.

## Usage in Other Microservices

```typescript
import { PdfApiClient } from './pdfApiClient';

const pdfClient = new PdfApiClient({
  baseUrl: 'http://pdf-service:3000',
  apiKey: 'your-api-key',
  timeout: 30000
});

// Generate receipt
const result = await pdfClient.generateReceipt(donation, organizationInfo);

if (result.success && result.data) {
  const pdfBase64 = result.data.pdfBase64;
  const filename = result.data.filename;
  
  // Convert to blob for email attachment
  const pdfBlob = new Blob([
    Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))
  ], { type: 'application/pdf' });
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Valid donation ID is required"
}
```

Common error codes:
- `VALIDATION_ERROR` - Invalid request data
- `PDF_GENERATION_ERROR` - Error generating PDF
- `API_CALL_ERROR` - Network/API call error
- `INTERNAL_SERVER_ERROR` - Server error
