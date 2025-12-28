import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const size = parseInt(searchParams.get('size') || '300');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Generate QR code as data URL (PNG)
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // Convert data URL to buffer
    const base64Data = qrCodeDataUrl.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    // Return as PNG image
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('QR Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code', message: error.message },
      { status: 500 }
    );
  }
}

