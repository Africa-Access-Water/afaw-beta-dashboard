import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DonationData {
  id: number;
  name: string;
  email: string;
  amount: number;
  message?: string;
  created_at: string;
  method: string;
  transaction_id?: string;
}

interface OrganizationInfo {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  regNumber?: string;
}

export class PDFService {
  /**
   * Generate PDF receipt as blob for email attachment (reusable for mailing service)
   */
  static async generateDonationReceiptBlob(
    donation: DonationData,
    organizationInfo?: OrganizationInfo
  ): Promise<Blob> {
    try {
      // Create a temporary container for the receipt
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      document.body.appendChild(tempContainer);

      // Import the template component dynamically
      const { default: DonationReceiptTemplate } = await import('../../components/pdf/DonationReceiptTemplate');
      
      // Create React element
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      
      const root = ReactDOM.createRoot(tempContainer);
      
      // Render the template
      root.render(
        React.createElement(DonationReceiptTemplate, {
          donation,
          organizationName: organizationInfo?.name,
          organizationAddress: organizationInfo?.address,
          organizationEmail: organizationInfo?.email,
          organizationPhone: organizationInfo?.phone,
          organizationWebsite: organizationInfo?.website,
          organizationRegNumber: organizationInfo?.regNumber,
          printDate: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          }),
        })
      );

      // Wait for the component to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the receipt element
      const receiptElement = tempContainer.querySelector('#donation-receipt') as HTMLElement;
      
      if (!receiptElement) {
        throw new Error('Receipt element not found');
      }

      // Generate canvas from HTML
      const canvas = await html2canvas(receiptElement, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff',
        width: receiptElement.scrollWidth,
        height: receiptElement.scrollHeight,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);

      // Return PDF as blob
      return pdf.output('blob');

    } catch (error) {
      console.error('Error generating PDF blob:', error);
      throw new Error('Failed to generate PDF receipt blob');
    }
  }

  /**
   * Generate and download a PDF receipt for a donation
   */
  static async generateDonationReceipt(
    donation: DonationData,
    organizationInfo?: OrganizationInfo
  ): Promise<void> {
    try {
      // Create a temporary container for the receipt
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      document.body.appendChild(tempContainer);

      // Import the template component dynamically
      const { default: DonationReceiptTemplate } = await import('../../components/pdf/DonationReceiptTemplate');
      
      // Create React element
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      
      const root = ReactDOM.createRoot(tempContainer);
      
      // Render the template
      root.render(
        React.createElement(DonationReceiptTemplate, {
          donation,
          organizationName: organizationInfo?.name,
          organizationAddress: organizationInfo?.address,
          organizationEmail: organizationInfo?.email,
          organizationPhone: organizationInfo?.phone,
          organizationWebsite: organizationInfo?.website,
          organizationRegNumber: organizationInfo?.regNumber,
          printDate: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          }),
        })
      );

      // Wait for the component to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the receipt element
      const receiptElement = tempContainer.querySelector('#donation-receipt') as HTMLElement;
      
      if (!receiptElement) {
        throw new Error('Receipt element not found');
      }

      // Generate canvas from HTML
      const canvas = await html2canvas(receiptElement, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff',
        width: receiptElement.scrollWidth,
        height: receiptElement.scrollHeight,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Generate filename
      const date = new Date(donation.created_at).toISOString().split('T')[0];
      const filename = `donation-receipt-${donation.id}-${date}.pdf`;

      // Download PDF
      pdf.save(filename);

      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF receipt');
    }
  }


  /**
   * Generate a simple text-based PDF receipt (alternative method)
   */
  static generateSimpleReceipt(
    donation: DonationData,
    organizationInfo?: OrganizationInfo
  ): void {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    // Helper function to add text with line breaks
    const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) {
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
      }
      
      const lines = pdf.splitTextToSize(text, pageWidth - 40);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * (fontSize * 0.35) + 5;
    };

    // Header
    addText(organizationInfo?.name || 'AFAW Foundation', 20, true);
    addText('DONATION RECEIPT', 16, true);
    addText(organizationInfo?.address || '123 Charity Street, Lusaka, Zambia', 10);
    addText(`Email: ${organizationInfo?.email || 'info@afaw.org'}`, 10);
    addText(`Phone: ${organizationInfo?.phone || '+260 123 456 789'}`, 10);
    
    yPosition += 10;

    // Receipt details
    addText('RECEIPT INFORMATION', 14, true);
    addText(`Receipt Number: #${donation.id.toString().padStart(6, '0')}`, 12);
    addText(`Date: ${new Date(donation.created_at).toLocaleDateString()}`, 12);
    addText(`Time: ${new Date(donation.created_at).toLocaleTimeString()}`, 12);
    
    if (donation.transaction_id) {
      addText(`Transaction ID: ${donation.transaction_id}`, 12);
    }

    yPosition += 10;

    // Donor information
    addText('DONOR INFORMATION', 14, true);
    addText(`Name: ${donation.name}`, 12);
    addText(`Email: ${donation.email}`, 12);

    yPosition += 10;

    // Donation details
    addText('DONATION DETAILS', 14, true);
    addText(`Amount: $${donation.amount.toFixed(2)}`, 12);
    addText(`Payment Method: ${donation.method}`, 12);
    
    if (donation.message) {
      addText(`Message: "${donation.message}"`, 12);
    }

    yPosition += 10;

    // Tax information
    addText('TAX DEDUCTIBLE INFORMATION', 14, true);
    addText('This donation is tax-deductible to the full extent allowed by law. Please keep this receipt for your tax records.', 10);

    yPosition += 10;

    // Footer
    addText('Thank you for your generous donation!', 12, true);
    addText(`Generated on: ${new Date().toLocaleString()}`, 10);

    // Generate filename and save
    const date = new Date(donation.created_at).toISOString().split('T')[0];
    const filename = `donation-receipt-${donation.id}-${date}.pdf`;
    pdf.save(filename);
  }
}
