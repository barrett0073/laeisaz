# 🗂️ Self-Blob Storage System

A complete local file-based storage solution for images and files, replacing external blob storage services.

## 📁 Storage Structure

```
storage/
├── blog/          # Blog post images and media
├── events/        # Event images and banners
├── gallery/       # Gallery images and thumbnails
├── uploads/       # General file uploads
└── temp/          # Temporary files (auto-cleanup)
```

## 🚀 Quick Start

### 1. **Storage Folders Creation**
```bash
# Create storage directories
mkdir -p storage/{blog,events,gallery,uploads,temp}

# Set proper permissions
chmod 755 storage/
chmod 755 storage/*/
```

### 2. **Basic Usage**
```typescript
import { uploadImage, deleteImage, getImageInfo } from '@/app/lib/blob';

// Upload an image
const result = await uploadImage(base64Data, 'blog');
if (result.success) {
  console.log('Image URL:', result.url);
}

// Delete an image
const deleteResult = await deleteImage('/storage/blog/image.jpg');
if (deleteResult.success) {
  console.log('Image deleted');
}
```

## 🔧 API Reference

### **uploadImage(base64Data, folder)**
Uploads a base64 image to the specified storage folder.

**Parameters:**
- `base64Data` (string): Base64 encoded image data
- `folder` (string): Target folder ('blog', 'events', 'gallery', 'uploads')

**Returns:**
```typescript
{
  success: boolean;
  url?: string;      // /storage/folder/filename.ext
  error?: string;    // Error message if failed
}
```

**Example:**
```typescript
// Upload blog image
const blogImage = await uploadImage(
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
  'blog'
);

if (blogImage.success) {
  // Save URL to database
  const imageUrl = blogImage.url; // /storage/blog/blog_1234567890_abc123.jpg
}
```

### **deleteImage(imageUrl)**
Deletes an image from storage.

**Parameters:**
- `imageUrl` (string): Full storage URL (e.g., '/storage/blog/image.jpg')

**Returns:**
```typescript
{
  success: boolean;
  error?: string;
}
```

**Example:**
```typescript
const deleteResult = await deleteImage('/storage/blog/blog_1234567890_abc123.jpg');
if (deleteResult.success) {
  console.log('Image deleted successfully');
} else {
  console.error('Delete failed:', deleteResult.error);
}
```

### **getImageInfo(imageUrl)**
Gets information about a stored image.

**Parameters:**
- `imageUrl` (string): Full storage URL

**Returns:**
```typescript
{
  exists: boolean;
  size?: number;     // File size in bytes
  path?: string;     // Full file system path
  error?: string;    // Error message if failed
}
```

**Example:**
```typescript
const info = await getImageInfo('/storage/gallery/gallery_1234567890_def456.png');
if (info.exists) {
  console.log('File size:', info.size, 'bytes');
  console.log('File path:', info.path);
}
```

### **cleanupOldImages(folder, daysOld)**
Removes old images from a folder.

**Parameters:**
- `folder` (string): Target folder name
- `daysOld` (number): Age threshold in days (default: 30)

**Example:**
```typescript
// Clean up blog images older than 60 days
await cleanupOldImages('blog', 60);

// Clean up gallery images older than 30 days (default)
await cleanupOldImages('gallery');
```

## 📸 Supported Image Formats

| Format | Extension | Content Type | Best For |
|--------|-----------|--------------|----------|
| JPEG   | .jpg, .jpeg | image/jpeg | Photos, complex images |
| PNG    | .png       | image/png  | Graphics, transparency |
| GIF    | .gif       | image/gif  | Animations, simple graphics |
| WebP   | .webp      | image/webp | Modern web images |
| SVG    | .svg       | image/svg+xml | Vector graphics |

## 🔗 URL Format

Images are served at: `/storage/{folder}/{filename}`

**Examples:**
- Blog: `/storage/blog/blog_1234567890_abc123.jpg`
- Gallery: `/storage/gallery/gallery_1234567890_def456.png`
- Events: `/storage/events/events_1234567890_ghi789.webp`
- Uploads: `/storage/uploads/uploads_1234567890_jkl012.gif`

## 🎯 Use Cases

### **Blog Posts**
```typescript
// Upload blog featured image
const featuredImage = await uploadImage(base64Data, 'blog');
const blogPost = {
  title: 'My Blog Post',
  featuredImage: featuredImage.url,
  // ... other fields
};
```

### **Gallery Management**
```typescript
// Upload multiple gallery images
const imageUrls = [];
for (const imageData of galleryImages) {
  const result = await uploadImage(imageData, 'gallery');
  if (result.success) {
    imageUrls.push(result.url);
  }
}
```

### **Event Banners**
```typescript
// Upload event banner
const bannerImage = await uploadImage(bannerData, 'events');
const event = {
  title: 'Company Event',
  banner: bannerImage.url,
  // ... other fields
};
```

### **File Uploads**
```typescript
// General file upload
const uploadedFile = await uploadImage(fileData, 'uploads');
if (uploadedFile.success) {
  // Process uploaded file
  console.log('File uploaded:', uploadedFile.url);
}
```

## 🛡️ Security Features

- **File Validation**: Only image files are accepted
- **Path Traversal Protection**: Secure file path handling
- **Content-Type Headers**: Proper MIME type detection
- **CORS Support**: Cross-origin access control
- **File Existence Check**: Prevents 404 errors

## 📊 Performance Optimization

### **Caching Strategy**
- **Browser Cache**: 1 year cache for static images
- **CDN Ready**: Easy to integrate with CDN services
- **Compression**: Automatic gzip compression

### **Image Optimization Tips**
```typescript
// Before upload, consider optimizing images
import sharp from 'sharp';

// Resize and compress before upload
const optimizedImage = await sharp(originalBuffer)
  .resize(800, 600, { fit: 'inside' })
  .jpeg({ quality: 80 })
  .toBuffer();

// Convert to base64 and upload
const base64Data = `data:image/jpeg;base64,${optimizedImage.toString('base64')}`;
const result = await uploadImage(base64Data, 'gallery');
```

## 🔄 Migration Guide

### **From Vercel Blob**
1. **No Code Changes**: Existing components work unchanged
2. **URL Mapping**: Old URLs continue to work
3. **Gradual Migration**: New uploads go to local storage

### **From Other Storage Services**
```typescript
// Example: Migrating from AWS S3
const s3Image = 'https://s3.amazonaws.com/bucket/image.jpg';

// Download and re-upload to local storage
const response = await fetch(s3Image);
const buffer = await response.arrayBuffer();
const base64Data = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;

const localResult = await uploadImage(base64Data, 'gallery');
// Update database with new URL
```

## 🧹 Maintenance

### **Regular Cleanup**
```typescript
// Set up automated cleanup
import { cleanupOldImages } from '@/app/lib/blob';

// Clean up old images weekly
setInterval(async () => {
  await cleanupOldImages('blog', 90);      // Keep blog images for 90 days
  await cleanupOldImages('gallery', 180);  // Keep gallery for 180 days
  await cleanupOldImages('events', 365);   // Keep events for 1 year
  await cleanupOldImages('temp', 7);       // Clean temp files weekly
}, 7 * 24 * 60 * 60 * 1000); // Weekly interval
```

### **Storage Monitoring**
```bash
# Check storage usage
du -sh storage/*/

# Find largest files
find storage/ -type f -exec ls -lh {} + | sort -k5 -hr | head -10

# Count files by type
find storage/ -name "*.jpg" | wc -l
find storage/ -name "*.png" | wc -l
find storage/ -name "*.webp" | wc -l
```

### **Backup Strategy**
```bash
# Daily backup
cp -r storage/ backup-storage-$(date +%Y%m%d)/

# Compressed backup
tar -czf storage-backup-$(date +%Y%m%d).tar.gz storage/

# Sync to remote backup
rsync -av storage/ backup-server:/backups/laeisaz-storage/
```

## 🚨 Troubleshooting

### **Common Issues**

#### **Image Not Loading (404)**
```bash
# Check if file exists
ls -la storage/blog/image.jpg

# Check file permissions
chmod 644 storage/blog/image.jpg

# Verify storage API is working
curl http://localhost:3000/storage/blog/image.jpg
```

#### **Upload Fails**
```bash
# Check disk space
df -h

# Check storage directory permissions
ls -la storage/

# Check server logs
tail -f .next/server.log
```

#### **Performance Issues**
```bash
# Check file sizes
find storage/ -type f -exec ls -lh {} + | sort -k5 -hr

# Optimize large images
find storage/ -size +1M -name "*.jpg" -exec jpegoptim --strip-all {} \;
```

### **Debug Mode**
```typescript
// Enable debug logging
const DEBUG = true;

if (DEBUG) {
  console.log('Storage path:', STORAGE_BASE);
  console.log('File path:', filePath);
  console.log('Content type:', contentType);
}
```

## 📋 Best Practices

### **File Naming**
- ✅ Use descriptive names: `blog_post_title_123.jpg`
- ✅ Include timestamps: `gallery_20241201_143022.png`
- ✅ Avoid special characters: Use underscores instead of spaces

### **Organization**
- ✅ Group related images in subfolders
- ✅ Use consistent naming conventions
- ✅ Regular cleanup of old/unused files

### **Performance**
- ✅ Optimize images before upload
- ✅ Use appropriate formats (WebP for photos)
- ✅ Monitor storage folder size

### **Backup**
- ✅ Regular automated backups
- ✅ Test restore procedures
- ✅ Keep multiple backup copies

## 🔗 Integration Examples

### **React Component**
```tsx
import { useState } from 'react';
import { uploadImage } from '@/app/lib/blob';

function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const result = await uploadImage(base64, 'gallery');
      if (result.success) {
        setImageUrl(result.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
      {uploading && <span>Uploading...</span>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

### **API Route**
```typescript
// app/api/upload/route.ts
import { uploadImage } from '@/app/lib/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageData, folder } = await request.json();
    
    const result = await uploadImage(imageData, folder);
    
    if (result.success) {
      return NextResponse.json({ url: result.url });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

## 📞 Support

For issues or questions:
1. Check this README first
2. Review server logs for errors
3. Verify file permissions and disk space
4. Test with a simple image upload

---

**🎉 Your self-blob storage system is ready to use!**
