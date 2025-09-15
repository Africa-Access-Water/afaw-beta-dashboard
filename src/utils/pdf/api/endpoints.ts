// Example API endpoints for PDF Receipt Service
// This file shows how to implement the endpoints in your microservice

import { Request, Response } from 'express';
import { PDFApiService } from './pdfApiService';
import { GenerateReceiptRequest, ApiErrorResponse } from './types';

/**
 * POST /api/v1/pdf/generate-receipt
 * Generate a PDF receipt and return as base64 encoded string
 */
export const generateReceiptEndpoint = async (req: Request, res: Response) => {
  try {
    const request: GenerateReceiptRequest = req.body;

    const result = await PDFApiService.generateReceipt(request);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Endpoint error:', error);
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'An internal server error occurred',
      statusCode: 500
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * GET /api/v1/pdf/health
 * Health check endpoint
 */
export const healthCheckEndpoint = async (req: Request, res: Response) => {
  try {
    const result = await PDFApiService.healthCheck();
    res.status(200).json(result);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Example Express.js router setup
 */
export const setupPdfRoutes = (app: any) => {
  // Health check
  app.get('/api/v1/pdf/health', healthCheckEndpoint);
  
  // Generate receipt
  app.post('/api/v1/pdf/generate-receipt', generateReceiptEndpoint);
  
  // Optional: Download receipt directly (for testing)
  app.post('/api/v1/pdf/download-receipt', async (req: Request, res: Response) => {
    try {
      const request: GenerateReceiptRequest = req.body;
      const result = await PDFApiService.generateReceipt(request);

      if (result.success && result.data) {
        // Convert base64 back to buffer for download
        const pdfBuffer = Buffer.from(result.data.pdfBase64, 'base64');
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${result.data.filename}"`);
        res.send(pdfBuffer);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Download endpoint error:', error);
      res.status(500).json({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred'
      });
    }
  });
};
