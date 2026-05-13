import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name) => cookieStore.get(name)?.value } }
    );

    // 1. Fetch Product
    const { data: product, error: pErr } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (pErr || !product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // 2. Fetch linked COA
    const { data: links } = await supabase
      .from('document_links')
      .select('documents(file_url)')
      .eq('related_record_type', 'Product')
      .eq('related_record_id', product.id)
      .limit(1);

    const docLink: any = links && links.length > 0 ? links[0] : null;
    const coaUrl = docLink && docLink.documents 
      ? docLink.documents.file_url 
      : "https://command-center-app-six.vercel.app/missing-coa"; // Fallback URL

    // 3. Generate QR Code image (PNG buffer)
    const qrBuffer = await QRCode.toBuffer(coaUrl, {
      margin: 1,
      width: 100, // 100x100 px
      color: { dark: '#000000', light: '#ffffff' }
    });

    // 4. Create PDF Document (4" x 2" -> 288pt x 144pt)
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([288, 144]);
    
    // Embed standard font and QR code image
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const qrImage = await pdfDoc.embedPng(qrBuffer);

    // 5. Draw Content on PDF
    const margin = 10;
    
    // Draw QR Code on the right side
    const qrSize = 80;
    page.drawImage(qrImage, {
      x: 288 - qrSize - margin,
      y: 144 / 2 - qrSize / 2, // Centered vertically
      width: qrSize,
      height: qrSize,
    });

    // Draw Text on the left side
    const textStartX = margin;
    let currentY = 144 - margin - 15;

    // Company/Header
    page.drawText('ITEM NINE ENTERPRISES', {
      x: textStartX,
      y: currentY,
      size: 8,
      font: fontBold,
      color: rgb(0.3, 0.3, 0.3),
    });
    currentY -= 18;

    // Product Name (wrapped if too long)
    const maxNameLength = 22;
    const nameStr = product.name.length > maxNameLength ? product.name.substring(0, maxNameLength) + "..." : product.name;
    page.drawText(nameStr, {
      x: textStartX,
      y: currentY,
      size: 14,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    currentY -= 16;

    // SKU
    page.drawText(`SKU: ${product.sku || 'N/A'}`, {
      x: textStartX,
      y: currentY,
      size: 10,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });
    currentY -= 14;

    // Batch / Date (Mock data for now since we don't have active batches on this screen yet)
    const today = new Date().toLocaleDateString();
    page.drawText(`Date: ${today}`, {
      x: textStartX,
      y: currentY,
      size: 9,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
    currentY -= 12;

    page.drawText('Scan for COA', {
      x: 288 - qrSize - margin + 12,
      y: 144 / 2 - qrSize / 2 - 10,
      size: 8,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // 6. Serialize and Return
    const pdfBytes = await pdfDoc.save();
    
    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="Label_${product.sku || product.id}.pdf"`,
      },
    });

  } catch (err: any) {
    console.error("Label Error:", err);
    return new Response(`Error generating label: ${err.message}`, { status: 500 });
  }
}
