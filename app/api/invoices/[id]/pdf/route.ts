import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { createClient } from '@/lib/supabase/server';

// Define types for the response data
type Client = {
  id: string;
  company_name: string;
  client_code: string;
  email: string | null;
  phone: string | null;
  address: string | null;
};

type Engagement = {
  project_name: string;
  engagement_code: string;
};

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  discount_rate: number;
  line_total: number;
};

type InvoiceData = {
  id: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  status: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_rate: number;
  discount_amount: number;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  payment_terms: string | null;
  notes: string | null;
  terms: string | null;
  clients: Client | Client[] | null;
  engagements: Engagement | Engagement[] | null;
  invoice_items: InvoiceItem[] | null;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch invoice data with all relations
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        id,
        invoice_number,
        invoice_date,
        due_date,
        status,
        subtotal,
        tax_rate,
        tax_amount,
        discount_rate,
        discount_amount,
        total_amount,
        amount_paid,
        balance_due,
        payment_terms,
        notes,
        terms,
        clients:client_id (
          id,
          company_name,
          client_code,
          email,
          phone,
          address
        ),
        engagements:engagement_id (
          project_name,
          engagement_code
        ),
        invoice_items (
          id,
          description,
          quantity,
          unit_price,
          tax_rate,
          discount_rate,
          line_total
        )
      `)
      .eq('id', id)
      .single();

    if (error || !invoice) {
      console.error('Error fetching invoice:', error);
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Type assertion to handle the data properly
    const typedInvoice = invoice as unknown as InvoiceData;
    
    // Safely extract client and engagement data (handle both array and object)
    const client = typedInvoice.clients 
      ? (Array.isArray(typedInvoice.clients) ? typedInvoice.clients[0] : typedInvoice.clients)
      : null;
    
    const engagement = typedInvoice.engagements 
      ? (Array.isArray(typedInvoice.engagements) ? typedInvoice.engagements[0] : typedInvoice.engagements)
      : null;
    
    const items = typedInvoice.invoice_items || [];

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
    const redColor = rgb(0.9, 0.2, 0.2);
    const greenColor = rgb(0.2, 0.7, 0.3);

    // Header background
    page.drawRectangle({
      x: 0,
      y: 750,
      width: 595,
      height: 92,
      color: lightGray,
    });

    // Title
    page.drawText('INVOICE', {
      x: 50,
      y: 800,
      size: 32,
      font: fontBold,
      color: primaryColor,
    });

    // Invoice Number
    page.drawText(`#${typedInvoice.invoice_number}`, {
      x: 400,
      y: 800,
      size: 14,
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

    // Bill To Section and Invoice Details
    let yPos = 650;
    page.drawText('BILL TO:', {
      x: 50,
      y: yPos,
      size: 12,
      font: fontBold,
      color: textColor,
    });
    yPos -= 18;
    
    // Safe client text with null checks
    const companyName = client?.company_name || 'N/A';
    page.drawText(companyName.substring(0, 40), {
      x: 50,
      y: yPos,
      size: 11,
      font: fontBold,
      color: textColor,
    });
    yPos -= 14;
    
    if (client?.address) {
      const addressText = client.address || '';
      page.drawText(addressText.substring(0, 50), {
        x: 50,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      yPos -= 12;
    }
    
    if (client?.email) {
      const emailText = `Email: ${client.email || ''}`;
      page.drawText(emailText.substring(0, 50), {
        x: 50,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      yPos -= 12;
    }
    
    if (client?.phone) {
      const phoneText = `Phone: ${client.phone || ''}`;
      page.drawText(phoneText.substring(0, 30), {
        x: 50,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      yPos -= 12;
    }
    
    // Invoice Details Box
    let detailsY = 650;
    page.drawRectangle({
      x: 350,
      y: detailsY - 70,
      width: 195,
      height: 85,
      borderColor: borderColor,
      borderWidth: 1,
    });
    
    let rightY = detailsY - 25;
    page.drawText('Invoice Date:', {
      x: 360,
      y: rightY,
      size: 10,
      font: fontBold,
      color: textColor,
    });
    page.drawText(new Date(typedInvoice.invoice_date).toLocaleDateString(), {
      x: 460,
      y: rightY,
      size: 10,
      font: font,
      color: textColor,
    });
    rightY -= 16;
    
    page.drawText('Due Date:', {
      x: 360,
      y: rightY,
      size: 10,
      font: fontBold,
      color: textColor,
    });
    page.drawText(new Date(typedInvoice.due_date).toLocaleDateString(), {
      x: 460,
      y: rightY,
      size: 10,
      font: font,
      color: textColor,
    });
    rightY -= 16;
    
    if (engagement) {
      page.drawText('Engagement:', {
        x: 360,
        y: rightY,
        size: 10,
        font: fontBold,
        color: textColor,
      });
      const projectName = engagement.project_name || 'N/A';
      page.drawText(projectName.substring(0, 30), {
        x: 460,
        y: rightY,
        size: 10,
        font: font,
        color: textColor,
      });
    }
    
    // Status Badge
    const statusColors: Record<string, any> = {
      paid: greenColor,
      overdue: redColor,
      sent: rgb(0.2, 0.5, 0.8),
      draft: rgb(0.6, 0.6, 0.6),
    };
    const statusColor = statusColors[typedInvoice.status] || textColor;
    page.drawText(typedInvoice.status.toUpperCase(), {
      x: 360,
      y: rightY - 22,
      size: 12,
      font: fontBold,
      color: statusColor,
    });
    
    // Add extra space before items table
    yPos = Math.min(yPos, 540);

    // Items Table Header
    yPos = 540;
    page.drawRectangle({
      x: 50,
      y: yPos - 5,
      width: 495,
      height: 30,
      color: lightGray,
    });

    page.drawText('Description', { x: 55, y: yPos, size: 10, font: fontBold, color: textColor });
    page.drawText('Qty', { x: 320, y: yPos, size: 10, font: fontBold, color: textColor });
    page.drawText('Unit Price', { x: 380, y: yPos, size: 10, font: fontBold, color: textColor });
    page.drawText('Total', { x: 480, y: yPos, size: 10, font: fontBold, color: textColor });

    yPos -= 25;

    // Items
    for (const item of items) {
      if (yPos < 150) {
        // Add new page if needed
        const newPage = pdfDoc.addPage([595, 842]);
        yPos = 750;
      }

      const descriptionText = item.description || '';
      page.drawText(descriptionText.substring(0, 40), {
        x: 55,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      page.drawText(item.quantity.toString(), {
        x: 325,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      page.drawText(`AED ${item.unit_price.toFixed(2)}`, {
        x: 375,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      page.drawText(`AED ${item.line_total.toFixed(2)}`, {
        x: 475,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
      });
      yPos -= 18;
    }

    // Summary Section
    yPos -= 15;
    page.drawLine({
      start: { x: 350, y: yPos },
      end: { x: 545, y: yPos },
      thickness: 1,
      color: borderColor,
    });

    yPos -= 8;
    page.drawText('Subtotal:', { x: 400, y: yPos, size: 10, font: font, color: textColor });
    page.drawText(
      `AED ${typedInvoice.subtotal.toFixed(2)}`,
      {
        x: 545 - fontBold.widthOfTextAtSize(`AED ${typedInvoice.subtotal.toFixed(2)}`, 10),
        y: yPos,
        size: 10,
        font: fontBold,
        color: textColor,
      }
    );
    yPos -= 18;

    if (typedInvoice.tax_rate > 0) {
      page.drawText(`Tax (${typedInvoice.tax_rate}%):`, { x: 400, y: yPos, size: 10, font: font, color: textColor });
      page.drawText(
        `AED ${typedInvoice.tax_amount.toFixed(2)}`,
        {
          x: 545 - font.widthOfTextAtSize(`AED ${typedInvoice.tax_amount.toFixed(2)}`, 10),
          y: yPos,
          size: 10,
          font: font,
          color: textColor,
        }
      );
      yPos -= 18;
    }

    if (typedInvoice.discount_rate > 0) {
      page.drawText(`Discount (${typedInvoice.discount_rate}%):`, { x: 400, y: yPos, size: 10, font: font, color: textColor });
      page.drawText(
        `- AED ${typedInvoice.discount_amount.toFixed(2)}`,
        {
          x: 545 - font.widthOfTextAtSize(`- AED ${typedInvoice.discount_amount.toFixed(2)}`, 10),
          y: yPos,
          size: 10,
          font: font,
          color: redColor,
        }
      );
      yPos -= 18;
    }

    yPos -= 5;
    page.drawLine({
      start: { x: 350, y: yPos },
      end: { x: 545, y: yPos },
      thickness: 2,
      color: borderColor,
    });

    yPos -= 12;
    page.drawText('Total:', { x: 400, y: yPos, size: 14, font: fontBold, color: textColor });
    page.drawText(
      `AED ${typedInvoice.total_amount.toFixed(2)}`,
      {
        x: 545 - fontBold.widthOfTextAtSize(`AED ${typedInvoice.total_amount.toFixed(2)}`, 14),
        y: yPos,
        size: 14,
        font: fontBold,
        color: primaryColor,
      }
    );
    yPos -= 18;

    if (typedInvoice.amount_paid > 0) {
      page.drawText('Amount Paid:', { x: 400, y: yPos, size: 10, font: font, color: textColor });
      page.drawText(
        `AED ${typedInvoice.amount_paid.toFixed(2)}`,
        {
          x: 545 - font.widthOfTextAtSize(`AED ${typedInvoice.amount_paid.toFixed(2)}`, 10),
          y: yPos,
          size: 10,
          font: font,
          color: greenColor,
        }
      );
      yPos -= 18;
    }

    if (typedInvoice.balance_due > 0) {
      page.drawText('Balance Due:', { x: 400, y: yPos, size: 12, font: fontBold, color: textColor });
      page.drawText(
        `AED ${typedInvoice.balance_due.toFixed(2)}`,
        {
          x: 545 - fontBold.widthOfTextAtSize(`AED ${typedInvoice.balance_due.toFixed(2)}`, 12),
          y: yPos,
          size: 12,
          font: fontBold,
          color: redColor,
        }
      );
    }

    // Notes Section
    if (typedInvoice.notes) {
      yPos -= 40;
      page.drawText('Notes:', {
        x: 50,
        y: yPos,
        size: 10,
        font: fontBold,
        color: textColor,
      });
      yPos -= 15;
      page.drawText(typedInvoice.notes, {
        x: 50,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
        maxWidth: 495,
      });
      yPos -= 30;
    }

    // Terms Section
    if (typedInvoice.terms) {
      page.drawText('Terms & Conditions:', {
        x: 50,
        y: yPos,
        size: 10,
        font: fontBold,
        color: textColor,
      });
      yPos -= 15;
      page.drawText(typedInvoice.terms, {
        x: 50,
        y: yPos,
        size: 9,
        font: font,
        color: textColor,
        maxWidth: 495,
      });
    }

    // Footer
    page.drawLine({
      start: { x: 50, y: 100 },
      end: { x: 545, y: 100 },
      thickness: 1,
      color: borderColor,
    });

    page.drawText('Thank you for your business!', {
      x: 50,
      y: 80,
      size: 10,
      font: font,
      color: textColor,
    });

    page.drawText('This is a computer-generated invoice.', {
      x: 50,
      y: 65,
      size: 8,
      font: font,
      color: rgb(0.6, 0.6, 0.6),
    });

    // Save PDF - pdfDoc.save() returns Uint8Array
    const pdfBytes = await pdfDoc.save();
    
    // Convert Uint8Array to Buffer for NextResponse compatibility
    const buffer = Buffer.from(pdfBytes);

    // Return PDF with Buffer
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="otaksi-invoice-${typedInvoice.invoice_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}