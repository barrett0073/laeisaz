import { NextResponse } from 'next/server'
import { db, executeQuery } from '../../lib/database'
import { IBlogPost, blogPostFromDb } from '../../lib/types'
import { uploadImage } from '../../lib/blob'

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
      'SELECT * FROM blog_posts_laeisaz ORDER BY date DESC'
    );
    
    // Convert to interface format
    const convertedPosts = (rows as any[]).map(blogPostFromDb);
    return NextResponse.json(convertedPosts)
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
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
    
    console.log('Received blog post data:', JSON.stringify(body, null, 2))
    
    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      console.log('Missing required fields:', {
        hasTitle: !!body.title,
        hasDescription: !!body.description,
        hasCategory: !!body.category
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate language translations
    if (!body.title.en || !body.title.fa || 
        !body.description.en || !body.description.fa) {
      console.log('Missing language translations:', {
        hasTitleEn: !!body.title.en,
        hasTitleFa: !!body.title.fa,
        hasDescriptionEn: !!body.description.en,
        hasDescriptionFa: !!body.description.fa
      })
      return NextResponse.json(
        { error: 'Missing title or description translations' },
        { status: 400 }
      )
    }

    // Connection is handled by the pool

    // Process and upload images to Vercel Blob
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
    
    console.log('Final image data:', { mainImage, imagesCount: imageUrls.length });

    try {
      const postId = `bp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date();
      const postDate = body.date ? new Date(body.date) : now;
      
      // Properly handle empty arrays for JSON serialization
      const imagesJson = imageUrls.length > 0 ? JSON.stringify(imageUrls) : '[]';
      
      await db.execute(
        `INSERT INTO blog_posts_laeisaz (
          id, title_en, title_fa, description_en, description_fa, 
          content_en, content_fa, category, date, author_en, author_fa,
          image, images, featured, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          postId,
          body.title.en,
          body.title.fa,
          body.description.en,
          body.description.fa,
          body.content?.en || '',
          body.content?.fa || '',
          body.category,
          postDate,
          body.author?.en || 'Admin',
          body.author?.fa || 'ادمین',
          mainImage || '',
          imagesJson,
          body.featured || false,
          now,
          now
        ]
      );

      // Fetch the created post
      const [rows] = await db.execute(
        'SELECT * FROM blog_posts_laeisaz WHERE id = ?',
        [postId]
      );
      
      const createdPost = blogPostFromDb((rows as any[])[0]);
      
      console.log('Post created successfully:', postId);
      return NextResponse.json(createdPost);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: `Database error: ${dbError.message}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: `Failed to create blog post: ${error.message}` }, { status: 500 });
  }
} 