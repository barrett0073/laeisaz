import { NextResponse } from 'next/server'
import { db, executeQuery } from '../../lib/database'
import { IGallery, galleryFromDb } from '../../lib/types'
import { uploadImage, deleteImage, UploadResponse } from '../../lib/blob'

export async function GET() {
  try {
    // Test database connection first
    try {
      await db.execute('SELECT 1');
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError);
      return NextResponse.json(
        { error: 'Database connection failed', details: connectionError.message },
        { status: 503 }
      );
    }

    const rows = await executeQuery(
      'SELECT * FROM gallery WHERE is_active = 1 ORDER BY `order` ASC'
    );
    
    // Convert to interface format
    const convertedImages = (rows as any[]).map(galleryFromDb);
    return NextResponse.json(convertedImages)
  } catch (error: any) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch gallery images',
        details: error.message,
        code: error.code 
      }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.title.en || !body.title.fa || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Handle image - either upload base64 data or use existing URL
    let imageUrl = body.image;
    
    // Only upload to blob if it's base64 data
    if (body.image.startsWith('data:')) {
      const uploadResult: UploadResponse = await uploadImage(body.image, 'gallery');
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: `Failed to upload image: ${uploadResult.error}` },
          { status: 500 }
        );
      }
      
      imageUrl = uploadResult.url;
    }
    // If it's already a URL (http/https), use it directly
    else if (body.image.startsWith('http')) {
      imageUrl = body.image;
    }
    else {
      return NextResponse.json(
        { error: 'Invalid image format. Must be base64 data or URL' },
        { status: 400 }
      );
    }

    // Get the highest order number and add 1
    const [orderRows] = await db.execute('SELECT MAX(`order`) as max_order FROM gallery');
    const maxOrder = (orderRows as any[])[0]?.max_order || 0;
    const newOrder = body.order !== undefined ? body.order : maxOrder + 1;

    const galleryId = `gal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    // Create new gallery image
    await db.execute(
      `INSERT INTO gallery (
        id, title_en, title_fa, description_en, description_fa,
        image, \`order\`, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        galleryId,
        body.title.en,
        body.title.fa,
        body.description?.en || '',
        body.description?.fa || '',
        imageUrl,
        newOrder,
        body.isActive !== undefined ? body.isActive : true,
        now,
        now
      ]
    );

    // Fetch the created image
    const [rows] = await db.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [galleryId]
    );
    
    const createdImage = galleryFromDb((rows as any[])[0]);

    return NextResponse.json(createdImage)
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    )
  }
} 