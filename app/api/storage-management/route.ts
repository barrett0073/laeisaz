import { NextRequest, NextResponse } from 'next/server';
import { 
  getStorageStats, 
  cleanupOldImages, 
  validateStorage,
  moveImage,
  copyImage,
  getImageInfo
} from '../../lib/blob';

// GET storage statistics
export async function GET() {
  try {
    const stats = await getStorageStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get storage stats', details: error.message },
      { status: 500 }
    );
  }
}

// POST storage management operations
export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    switch (action) {
      case 'cleanup':
        const { folder, daysOld = 30 } = params;
        if (!folder) {
          return NextResponse.json(
            { error: 'Folder parameter required for cleanup' },
            { status: 400 }
          );
        }
        const deletedCount = await cleanupOldImages(folder, daysOld);
        return NextResponse.json({ 
          success: true, 
          deletedCount, 
          folder, 
          daysOld 
        });

      case 'validate':
        const validation = await validateStorage();
        return NextResponse.json(validation);

      case 'move':
        const { imageUrl, newFolder } = params;
        if (!imageUrl || !newFolder) {
          return NextResponse.json(
            { error: 'imageUrl and newFolder parameters required for move' },
            { status: 400 }
          );
        }
        const moveResult = await moveImage(imageUrl, newFolder);
        return NextResponse.json(moveResult);

      case 'copy':
        const { sourceUrl, targetFolder } = params;
        if (!sourceUrl || !targetFolder) {
          return NextResponse.json(
            { error: 'sourceUrl and targetFolder parameters required for copy' },
            { status: 400 }
          );
        }
        const copyResult = await copyImage(sourceUrl, targetFolder);
        return NextResponse.json(copyResult);

      case 'info':
        const { url } = params;
        if (!url) {
          return NextResponse.json(
            { error: 'url parameter required for info' },
            { status: 400 }
          );
        }
        const imageInfo = await getImageInfo(url);
        return NextResponse.json(imageInfo);

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported: cleanup, validate, move, copy, info' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Storage management operation failed', details: error.message },
      { status: 500 }
    );
  }
}
