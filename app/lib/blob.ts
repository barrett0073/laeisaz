import { writeFile, unlink, mkdir, readdir, stat, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
  size?: number;
  filename?: string;
}

export interface DeleteResponse {
  success: boolean;
  error?: string;
}

export interface ImageInfo {
  exists: boolean;
  size?: number;
  path?: string;
  created?: Date;
  modified?: Date;
  error?: string;
}

export interface StorageStats {
  totalFiles: number;
  totalSize: number;
  folderStats: Record<string, { files: number; size: number }>;
}

// Base storage path
const STORAGE_BASE = path.join(process.cwd(), 'storage');

// Supported image types and their extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

// Ensure storage directories exist
async function ensureStorageDir(dirPath: string) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

// Validate file type
function isValidImageFile(base64Data: string): boolean {
  try {
    // Check if it's a valid base64 image
    if (!base64Data.startsWith('data:image/')) {
      return false;
    }
    
    // Extract extension from data URL
    const match = base64Data.match(/data:image\/(\w+);base64,/);
    if (!match) return false;
    
    const extension = `.${match[1].toLowerCase()}`;
    return SUPPORTED_EXTENSIONS.includes(extension);
  } catch {
    return false;
  }
}

// Validate file size
function isValidFileSize(base64Data: string): boolean {
  try {
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Content, 'base64');
    return buffer.length <= MAX_FILE_SIZE;
  } catch {
    return false;
  }
}

// Convert base64 to buffer
function base64ToBuffer(base64String: string): Buffer {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
}

// Generate unique filename
function generateFilename(originalName: string, folder: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = path.extname(originalName) || '.jpg';
  return `${folder}_${timestamp}_${random}${extension}`;
}

// Get file extension from base64 data
function getExtensionFromBase64(base64Data: string): string {
  const match = base64Data.match(/data:image\/(\w+);base64,/);
  if (match) {
    const ext = match[1].toLowerCase();
    return ext === 'jpeg' ? '.jpg' : `.${ext}`;
  }
  return '.jpg'; // Default to jpg
}

// Upload image to local storage
export async function uploadImage(
  base64Data: string, 
  folder: 'blog' | 'events' | 'gallery' | 'uploads' | 'temp'
): Promise<UploadResponse> {
  try {
    // Validate file type
    if (!isValidImageFile(base64Data)) {
      return {
        success: false,
        error: 'Invalid image format. Supported: JPEG, PNG, GIF, WebP, SVG'
      };
    }

    // Validate file size
    if (!isValidFileSize(base64Data)) {
      return {
        success: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      };
    }

    // Ensure storage directory exists
    const storageDir = path.join(STORAGE_BASE, folder);
    await ensureStorageDir(storageDir);

    // Generate unique filename with proper extension
    const extension = getExtensionFromBase64(base64Data);
    const filename = generateFilename(`image${extension}`, folder);
    const filePath = path.join(storageDir, filename);

    // Convert base64 to buffer and save
    const buffer = base64ToBuffer(base64Data);
    await writeFile(filePath, buffer);

    // Get file stats
    const stats = await stat(filePath);
    
    // Return the local URL path
    const url = `/storage/${folder}/${filename}`;
    
    console.log(`Image uploaded successfully to ${filePath} (${stats.size} bytes)`);
    
    return {
      success: true,
      url,
      size: stats.size,
      filename
    };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Delete image from local storage
export async function deleteImage(imageUrl: string): Promise<DeleteResponse> {
  try {
    // Extract file path from URL
    const urlPath = imageUrl.replace('/storage/', '');
    const filePath = path.join(STORAGE_BASE, urlPath);

    // Check if file exists
    if (existsSync(filePath)) {
      const stats = await stat(filePath);
      await unlink(filePath);
      console.log(`Image deleted successfully: ${filePath} (was ${stats.size} bytes)`);
      
      return {
        success: true
      };
    } else {
      return {
        success: false,
        error: 'File not found'
      };
    }
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get image info
export async function getImageInfo(imageUrl: string): Promise<ImageInfo> {
  try {
    const urlPath = imageUrl.replace('/storage/', '');
    const filePath = path.join(STORAGE_BASE, urlPath);
    
    if (existsSync(filePath)) {
      const stats = await stat(filePath);
      return {
        exists: true,
        size: stats.size,
        path: filePath,
        created: stats.birthtime,
        modified: stats.mtime
      };
    }
    
    return {
      exists: false
    };
  } catch (error: any) {
    return {
      exists: false,
      error: error.message
    };
  }
}

// Get storage statistics
export async function getStorageStats(): Promise<StorageStats> {
  try {
    const folders = ['blog', 'events', 'gallery', 'uploads', 'temp'];
    const stats: StorageStats = {
      totalFiles: 0,
      totalSize: 0,
      folderStats: {}
    };

    for (const folder of folders) {
      const folderPath = path.join(STORAGE_BASE, folder);
      if (!existsSync(folderPath)) {
        stats.folderStats[folder] = { files: 0, size: 0 };
        continue;
      }

      const files = await readdir(folderPath);
      let folderSize = 0;
      let fileCount = 0;

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        try {
          const fileStats = await stat(filePath);
          if (fileStats.isFile()) {
            folderSize += fileStats.size;
            fileCount++;
          }
        } catch (error) {
          console.warn(`Could not stat file: ${filePath}`);
        }
      }

      stats.folderStats[folder] = { files: fileCount, size: folderSize };
      stats.totalFiles += fileCount;
      stats.totalSize += folderSize;
    }

    return stats;
  } catch (error: any) {
    console.error('Error getting storage stats:', error);
    throw error;
  }
}

// Clean up old images
export async function cleanupOldImages(folder: string, daysOld: number = 30): Promise<number> {
  try {
    const storageDir = path.join(STORAGE_BASE, folder);
    if (!existsSync(storageDir)) return 0;

    const files = await readdir(storageDir);
    const now = Date.now();
    const cutoff = now - (daysOld * 24 * 60 * 60 * 1000);
    let deletedCount = 0;

    for (const file of files) {
      const filePath = path.join(storageDir, file);
      try {
        const stats = await stat(filePath);
        
        if (stats.isFile() && stats.mtime.getTime() < cutoff) {
          await unlink(filePath);
          console.log(`Cleaned up old file: ${file} (${stats.size} bytes)`);
          deletedCount++;
        }
      } catch (error) {
        console.warn(`Could not process file: ${filePath}`);
      }
    }

    console.log(`Cleanup completed: ${deletedCount} files deleted from ${folder}`);
    return deletedCount;
  } catch (error: any) {
    console.error('Error cleaning up old images:', error);
    throw error;
  }
}

// Move image between folders
export async function moveImage(
  imageUrl: string, 
  newFolder: 'blog' | 'events' | 'gallery' | 'uploads' | 'temp'
): Promise<UploadResponse> {
  try {
    const urlPath = imageUrl.replace('/storage/', '');
    const oldFilePath = path.join(STORAGE_BASE, urlPath);
    
    if (!existsSync(oldFilePath)) {
      return {
        success: false,
        error: 'Source file not found'
      };
    }

    // Ensure new folder exists
    const newStorageDir = path.join(STORAGE_BASE, newFolder);
    await ensureStorageDir(newStorageDir);

    // Generate new filename
    const filename = path.basename(oldFilePath);
    const newFilePath = path.join(newStorageDir, filename);

    // Read old file and write to new location
    const fileBuffer = await readFile(oldFilePath);
    await writeFile(newFilePath, fileBuffer);

    // Delete old file
    await unlink(oldFilePath);

    const newUrl = `/storage/${newFolder}/${filename}`;
    console.log(`Image moved from ${imageUrl} to ${newUrl}`);

    return {
      success: true,
      url: newUrl,
      filename
    };
  } catch (error: any) {
    console.error('Error moving image:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Copy image to another folder
export async function copyImage(
  imageUrl: string, 
  targetFolder: 'blog' | 'events' | 'gallery' | 'uploads' | 'temp'
): Promise<UploadResponse> {
  try {
    const urlPath = imageUrl.replace('/storage/', '');
    const sourceFilePath = path.join(STORAGE_BASE, urlPath);
    
    if (!existsSync(sourceFilePath)) {
      return {
        success: false,
        error: 'Source file not found'
      };
    }

    // Ensure target folder exists
    const targetStorageDir = path.join(STORAGE_BASE, targetFolder);
    await ensureStorageDir(targetStorageDir);

    // Generate new filename
    const originalFilename = path.basename(sourceFilePath);
    const filename = generateFilename(originalFilename, targetFolder);
    const targetFilePath = path.join(targetStorageDir, filename);

    // Copy file
    const fileBuffer = await readFile(sourceFilePath);
    await writeFile(targetFilePath, fileBuffer);

    const newUrl = `/storage/${targetFolder}/${filename}`;
    console.log(`Image copied from ${imageUrl} to ${newUrl}`);

    return {
      success: true,
      url: newUrl,
      filename
    };
  } catch (error: any) {
    console.error('Error copying image:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Validate storage integrity
export async function validateStorage(): Promise<{ valid: boolean; errors: string[] }> {
  try {
    const folders = ['blog', 'events', 'gallery', 'uploads', 'temp'];
    const errors: string[] = [];

    for (const folder of folders) {
      const folderPath = path.join(STORAGE_BASE, folder);
      if (!existsSync(folderPath)) {
        errors.push(`Folder ${folder} does not exist`);
        continue;
      }

      const files = await readdir(folderPath);
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        try {
          const stats = await stat(filePath);
          if (stats.size === 0) {
            errors.push(`Empty file found: ${filePath}`);
          }
        } catch (error) {
          errors.push(`Cannot access file: ${filePath}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  } catch (error: any) {
    return {
      valid: false,
      errors: [error.message]
    };
  }
} 