import { NextResponse } from 'next/server'
import { db } from '../../../lib/database'
import { IBlogPost, blogPostFromDb } from '../../../lib/types'
import { uploadImage } from '../../../lib/blob'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM blog_posts_laeisaz WHERE id = ?',
      [params.id]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const post = blogPostFromDb((rows as any[])[0]);
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields if they are being updated
    if (body.title && (!body.title.en || !body.title.fa)) {
      return NextResponse.json(
        { error: 'Missing language translations for title' },
        { status: 400 }
      )
    }
    if (body.description && (!body.description.en || !body.description.fa)) {
      return NextResponse.json(
        { error: 'Missing language translations for description' },
        { status: 400 }
      )
    }
    if (body.content && (!body.content.en || !body.content.fa)) {
      return NextResponse.json(
        { error: 'Missing language translations for content' },
        { status: 400 }
      )
    }

    // First get the existing post to track which images we might need to delete
    const [existingRows] = await db.execute(
      'SELECT * FROM blog_posts_laeisaz WHERE id = ?',
      [params.id]
    );
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const existingPost = blogPostFromDb((existingRows as any[])[0]);
    
    // Process and upload new images to Vercel Blob
    let imageUrls: string[] = [];
    
    // Handle all images through Vercel Blob
    if (Array.isArray(body.images) && body.images.length > 0) {
      for (let i = 0; i < body.images.length; i++) {
        const imageData = body.images[i];
        // Only upload if it's a base64 data URL
        if (imageData && imageData.startsWith('data:')) {
          try {
            const uploadResult = await uploadImage(imageData, 'blog');
            if (uploadResult.success && uploadResult.url) {
              imageUrls.push(uploadResult.url);
            }
          } catch (uploadError) {
            console.error('Error uploading image:', uploadError);
          }
        } else if (imageData && imageData.startsWith('http')) {
          // This is already a URL, so keep it as is
          imageUrls.push(imageData);
        }
      }
    }
    
    // Handle single main image
    let mainImage = '';
    if (body.image && body.image.startsWith('data:')) {
      try {
        const uploadResult = await uploadImage(body.image, 'blog');
        if (uploadResult.success && uploadResult.url) {
          mainImage = uploadResult.url;
        }
      } catch (uploadError) {
        console.error('Error uploading main image:', uploadError);
      }
    } else if (body.image && body.image.startsWith('http')) {
      mainImage = body.image;
    }
    
    // If there are no new images, keep existing ones
    if (imageUrls.length === 0 && existingPost.images && existingPost.images.length > 0) {
      imageUrls = existingPost.images;
    }
    
    // Use main image if provided, otherwise use first image from array
    if (!mainImage && imageUrls.length > 0) {
      mainImage = imageUrls[0];
    }

    try {
      const now = new Date();
      const updateDate = body.date ? new Date(body.date) : existingPost.date;
      
      // Build dynamic update query
      const updateFields = [];
      const updateValues = [];
      
      if (body.title) {
        updateFields.push('title_en = ?', 'title_fa = ?');
        updateValues.push(body.title.en, body.title.fa);
      }
      if (body.description) {
        updateFields.push('description_en = ?', 'description_fa = ?');
        updateValues.push(body.description.en, body.description.fa);
      }
      if (body.content) {
        updateFields.push('content_en = ?', 'content_fa = ?');
        updateValues.push(body.content.en, body.content.fa);
      }
      if (body.category !== undefined) {
        updateFields.push('category = ?');
        updateValues.push(body.category);
      }
      if (body.author) {
        updateFields.push('author_en = ?', 'author_fa = ?');
        updateValues.push(body.author.en, body.author.fa);
      }
      if (body.date) {
        updateFields.push('date = ?');
        updateValues.push(updateDate);
      }
      if (mainImage) {
        updateFields.push('image = ?');
        updateValues.push(mainImage);
      }
      if (imageUrls.length > 0) {
        updateFields.push('images = ?');
        updateValues.push(JSON.stringify(imageUrls));
      }
      if (body.featured !== undefined) {
        updateFields.push('featured = ?');
        updateValues.push(body.featured);
      }
      
      // Always update the updated_at timestamp
      updateFields.push('updated_at = ?');
      updateValues.push(now);
      
      // Add the ID parameter for WHERE clause
      updateValues.push(params.id);
      
      await db.execute(
        `UPDATE blog_posts_laeisaz SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
      
      // Fetch the updated post
      const [updatedRows] = await db.execute(
        'SELECT * FROM blog_posts_laeisaz WHERE id = ?',
        [params.id]
      );
      
      const updatedPost = blogPostFromDb((updatedRows as any[])[0]);
      return NextResponse.json(updatedPost);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: `Database error: ${dbError.message}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: `Failed to update blog post: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the post first to delete its images from Blob storage
    const [rows] = await db.execute(
      'SELECT * FROM blog_posts_laeisaz WHERE id = ?',
      [params.id]
    );
    
    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const post = blogPostFromDb((rows as any[])[0]);
    
    // Delete images from Vercel Blob (if needed)
    if (post.images && Array.isArray(post.images)) {
      // Note: You may want to implement deleteImage function if needed
      // For now, we'll just delete the database record
    }
    
    // Delete the post from MySQL
    await db.execute(
      'DELETE FROM blog_posts_laeisaz WHERE id = ?',
      [params.id]
    );
    
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 