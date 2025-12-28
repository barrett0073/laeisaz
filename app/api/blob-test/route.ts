import { NextResponse } from 'next/server'
import { put, list } from '@vercel/blob'

export async function GET() {
  try {
    // Create a simple test image (1x1 transparent pixel)
    const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Try to upload test image
    const { url } = await put(
      'test/ping.png',
      buffer,
      {
        access: 'public',
        addRandomSuffix: true,
        contentType: 'image/png'
      }
    );
    
    // Try to list contents
    const contents = await list();
    
    return NextResponse.json({
      success: true,
      message: 'Blob storage is working',
      uploadedUrl: url,
      contents: contents.blobs.slice(0, 5) // Show first 5 items only
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 