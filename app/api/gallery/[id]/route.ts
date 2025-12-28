import { NextResponse } from 'next/server'
import { db } from '../../../lib/database'
import { IGallery, galleryFromDb } from '../../../lib/types'
import { uploadImage, deleteImage, UploadResponse } from '../../../lib/blob'

// GET a single gallery image
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [params.id]
    );
    
    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }
    
    const image = galleryFromDb((rows as any[])[0]);
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
      { status: 500 }
    );
  }
}

// PUT (update) a gallery image
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields if provided
    if (body.title && (!body.title.en || !body.title.fa)) {
      return NextResponse.json(
        { error: 'Missing language translations for title' },
        { status: 400 }
      )
    }

    // Check if gallery image exists
    const [existingRows] = await db.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [params.id]
    );
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }
    
    const existingImage = galleryFromDb((existingRows as any[])[0]);
    
    // Handle image upload if new image provided
    let imageUrl = existingImage.image;
    if (body.image && body.image.startsWith('data:')) {
      try {
        const uploadResult: UploadResponse = await uploadImage(body.image, 'gallery');
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
        }
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
      }
    } else if (body.image && body.image.startsWith('http')) {
      imageUrl = body.image;
    }
    
    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    if (body.title) {
      updateFields.push('title_en = ?', 'title_fa = ?');
      updateValues.push(body.title.en, body.title.fa);
    }
    if (body.description !== undefined) {
      updateFields.push('description_en = ?', 'description_fa = ?');
      updateValues.push(
        body.description?.en || '', 
        body.description?.fa || ''
      );
    }
    if (imageUrl !== existingImage.image) {
      updateFields.push('image = ?');
      updateValues.push(imageUrl);
    }
    if (body.order !== undefined) {
      updateFields.push('`order` = ?');
      updateValues.push(body.order);
    }
    if (body.isActive !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(body.isActive);
    }
    
    updateFields.push('updated_at = ?');
    updateValues.push(new Date());
    updateValues.push(params.id);

    // Start a transaction for order updates
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Update the current image
      await connection.execute(
      `UPDATE gallery SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

      // If order was changed, update other images' orders
      if (body.order !== undefined && body.order !== existingImage.order) {
        // If moving up (order decreased), increment orders of images in between
        if (body.order < existingImage.order) {
          await connection.execute(
            'UPDATE gallery SET `order` = `order` + 1 WHERE `order` >= ? AND `order` < ? AND id != ?',
            [body.order, existingImage.order, params.id]
          );
        }
        // If moving down (order increased), decrement orders of images in between
        else if (body.order > existingImage.order) {
          await connection.execute(
            'UPDATE gallery SET `order` = `order` - 1 WHERE `order` <= ? AND `order` > ? AND id != ?',
            [body.order, existingImage.order, params.id]
          );
        }
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
    // Fetch and return the updated image
    const [updatedRows] = await db.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [params.id]
    );
    
    const updatedImage = galleryFromDb((updatedRows as any[])[0]);
    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: `Failed to update gallery image: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE a gallery image
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if gallery image exists
    const [rows] = await db.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [params.id]
    );
    
    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }
    
    const image = galleryFromDb((rows as any[])[0]);
    
    // Delete image from blob storage (optional)
    try {
      if (image.image && image.image.startsWith('http')) {
        // await deleteImage(image.image);
      }
    } catch (blobError) {
      console.error('Error deleting image from blob storage:', blobError);
      // Continue with database deletion even if blob deletion fails
    }
    
    // Delete the gallery image from MySQL
    await db.execute(
      'DELETE FROM gallery WHERE id = ?',
      [params.id]
    );
    
    return NextResponse.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
} 