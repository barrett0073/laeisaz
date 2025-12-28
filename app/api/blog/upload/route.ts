import { NextResponse } from 'next/server'
import { uploadImage, deleteImage, UploadResponse } from '../../../lib/blob'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.image) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      )
    }

    // Upload image to blog folder in blob storage
    const uploadResult: UploadResponse = await uploadImage(body.image, 'blog');
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { error: `Failed to upload image: ${uploadResult.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: uploadResult.url,
      success: true
    })
  } catch (error) {
    console.error('Error uploading blog image:', error)
    return NextResponse.json(
      { error: 'Failed to upload blog image' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      )
    }

    const deleteResult = await deleteImage(imageUrl);

    return NextResponse.json({
      success: deleteResult,
      message: deleteResult ? 'Image deleted successfully' : 'Failed to delete image'
    })
  } catch (error) {
    console.error('Error deleting blog image:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog image' },
      { status: 500 }
    )
  }
} 