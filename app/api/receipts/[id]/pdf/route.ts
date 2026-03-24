import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { createClient } from '@/lib/supabase/server';

// Define types for the response data
type Client = {
  company_name: string;
  client_code: string;
  email: string | null;
};

type Invoice = {
  invoice_number: string;
  total_amount: number;
};

type ReceiptData = {
  id: string;
  receipt_number: string;
  payment_id: string;
  invoice_id: string;
  client_id: string;
  receipt_date: string;
  amount: number;
  payment_method: string;
  reference_number: string | null;
  clients: Client | Client[] | null;
  invoices: Invoice | Invoice[] | null;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch receipt data with proper relations
    const { data: receipt, error } = await supabase
      .from('receipts')
      .select(`
        id,
        receipt_number,
        payment_id,
        invoice_id,
        client_id,
        receipt_date,
        amount,
        payment_method,
        reference_number,
        clients (
          company_name,
          client_code,
          email
        ),
        invoices (
          invoice_number,
          total_amount
        )
      `)
      .eq('id', id)
      .single();

    if (error || !receipt) {
      console.error('Error fetching receipt:', error);
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    // Safely extract client and invoice data (handle both array and object responses)
    const typedReceipt = receipt as unknown as ReceiptData;
    const client = Array.isArray(typedReceipt.clients) 
      ? typedReceipt.clients[0] 
      : typedReceipt.clients;
    const invoice = Array.isArray(typedReceipt.invoices) 
      ? typedReceipt.invoices[0] 
      : typedReceipt.invoices;

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Colors
    const primaryColor = rgb(0.36, 0.27, 0.56); // #5B6CFF
    const textColor = rgb(0.2, 0.2, 0.2);
    const lightGray = rgb(0.95, 0.95, 0.95);
    const borderColor = rgb(0.85, 0.85, 0.85);

    // Header background
    page.drawRectangle({
      x: 0,
      y: 750,
      width: 595,
      height: 92,
      color: lightGray,
    });

    // Title
    page.drawText('PAYMENT RECEIPT', {
      x: 50,
      y: 800,
      size: 28,
      font: fontBold,
      color: primaryColor,
    });

    // Receipt Number
    page.drawText(`Receipt No: ${typedReceipt.receipt_number}`, {
      x: 400,
      y: 800,
      size: 12,
      font: fontBold,
      color: textColor,
    });

    // Company Info
    page.drawText('Otaksi Connect FZ-LLC', {
      x: 50,
      y: 720,
      size: 14,
      font: fontBold,
      color: primaryColor,
    });
    page.drawText('Dubai, United Arab Emirates', {
      x: 50,
      y: 705,
      size: 10,
      font: font,
      color: textColor,
    });
    page.drawText('Email: info@otaksiconnect.ae', {
      x: 50,
      y: 690,
      size: 10,
      font: font,
      color: textColor,
    });

    // Divider Line
    page.drawLine({
      start: { x: 50, y: 675 },
      end: { x: 545, y: 675 },
      thickness: 1,
      color: borderColor,
    });

    // Receipt Details Box
    let yPos = 650;

    // Client Section
    page.drawText('RECEIVED FROM:', {
      x: 50,
      y: yPos,
      size: 12,
      font: fontBold,
      color: textColor,
    });
    yPos -= 20;

    page.drawText(client?.company_name || 'N/A', {
      x: 50,
      y: yPos,
      size: 14,
      font: fontBold,
      color: textColor,
    });
    yPos -= 18;

    // Invoice Details
    page.drawText(`Invoice Number: ${invoice?.invoice_number || 'N/A'}`, {
      x: 50,
      y: yPos,
      size: 11,
      font: font,
      color: textColor,
    });
    yPos -= 18;

    page.drawText(`Payment Date: ${new Date(typedReceipt.receipt_date).toLocaleDateString()}`, {
      x: 50,
      y: yPos,
      size: 11,
      font: font,
      color: textColor,
    });
    yPos -= 18;

    page.drawText(`Payment Method: ${typedReceipt.payment_method?.replace('-', ' ').toUpperCase() || 'N/A'}`, {
      x: 50,
      y: yPos,
      size: 11,
      font: font,
      color: textColor,
    });
    yPos -= 18;

    if (typedReceipt.reference_number) {
      page.drawText(`Reference Number: ${typedReceipt.reference_number}`, {
        x: 50,
        y: yPos,
        size: 11,
        font: font,
        color: textColor,
      });
      yPos -= 18;
    }

    yPos -= 10;

    // Amount Box
    page.drawRectangle({
      x: 50,
      y: yPos - 60,
      width: 495,
      height: 80,
      color: lightGray,
      borderColor: borderColor,
      borderWidth: 1,
    });

    page.drawText('AMOUNT RECEIVED', {
      x: 70,
      y: yPos - 35,
      size: 14,
      font: fontBold,
      color: primaryColor,
    });

    page.drawText(`AED ${typedReceipt.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, {
      x: 350,
      y: yPos - 35,
      size: 24,
      font: fontBold,
      color: primaryColor,
    });

    yPos -= 100;

    // Footer
    page.drawLine({
      start: { x: 50, y: 150 },
      end: { x: 545, y: 150 },
      thickness: 1,
      color: borderColor,
    });

    page.drawText('Thank you for your business!', {
      x: 50,
      y: 130,
      size: 10,
      font: font,
      color: textColor,
    });

    page.drawText('This is a computer-generated receipt and does not require a signature.', {
      x: 50,
      y: 115,
      size: 8,
      font: font,
      color: rgb(0.6, 0.6, 0.6),
    });

    // Save PDF - pdfDoc.save() returns Uint8Array
    const pdfBytes = await pdfDoc.save();
    
    // Convert Uint8Array to Buffer for NextResponse compatibility
    const buffer = Buffer.from(pdfBytes);

    // Return PDF with Buffer
    // Use receipt_number if available, otherwise fallback to id (uuid)
    const receiptFileName = typedReceipt.receipt_number
      ? `otaksi-receipt-${typedReceipt.receipt_number}.pdf`
      : `otaksi-receipt-${typedReceipt.id}.pdf`;
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${receiptFileName}"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}