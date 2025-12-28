import { NextResponse } from 'next/server'
import { db } from '../../lib/database'
import { put, del } from '@vercel/blob'
import { PoolConnection } from 'mysql2/promise'

interface ServiceStatus {
  connected: boolean;
  message: string;
  responseTime: number;
}

export async function GET() {
  const status = {
    mysql: {
      connected: false,
      message: '',
      responseTime: 0
    } as ServiceStatus,
    vercelBlob: {
      connected: false,
      message: '',
      responseTime: 0
    } as ServiceStatus,
    overall: 'disconnected' as 'disconnected' | 'partially_connected' | 'fully_connected'
  };

  // Run both checks in parallel with shorter timeouts
  const [mysqlResult, blobResult] = await Promise.allSettled([
    // MySQL check with 3s timeout
    Promise.race([
      (async () => {
    const startTime = Date.now();
    const connection = await db.getConnection();
    await connection.execute('SELECT 1 as test');
    connection.release();
        return {
          connected: true,
          message: 'Connected to MySQL database',
          responseTime: Date.now() - startTime
        } as ServiceStatus;
      })(),
      new Promise<ServiceStatus>((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 3000)
      )
    ]),

    // Blob check with 3s timeout
    Promise.race([
      (async () => {
    const startTime = Date.now();
    const blobReadWriteToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!blobReadWriteToken) {
      throw new Error('BLOB_READ_WRITE_TOKEN not configured');
    }
    
        // Create a tiny test image (1x1 transparent pixel)
        const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Try to upload test file
        const { url } = await put(
          'status-test/ping.png',
          buffer,
          {
            access: 'public',
            addRandomSuffix: true,
            contentType: 'image/png'
          }
        );
        
        // If we got here, upload worked. Clean up the test file
        const pathname = new URL(url).pathname;
        const blobPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
        await del(blobPath);
        
        return {
          connected: true,
          message: 'Vercel Blob storage accessible',
          responseTime: Date.now() - startTime
        } as ServiceStatus;
      })(),
      new Promise<ServiceStatus>((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 3000)
      )
    ])
  ]);

  // Process MySQL result
  if (mysqlResult.status === 'fulfilled') {
    status.mysql = mysqlResult.value;
    } else {
    status.mysql = {
      connected: false,
      message: `MySQL Error: ${mysqlResult.reason?.message || 'Unknown error'}`,
      responseTime: 0
    };
    }

  // Process Blob result
  if (blobResult.status === 'fulfilled') {
    status.vercelBlob = blobResult.value;
  } else {
    status.vercelBlob = {
      connected: false,
      message: `Blob Error: ${blobResult.reason?.message || 'Unknown error'}`,
      responseTime: 0
    };
  }

  // Determine overall status
  if (status.mysql.connected && status.vercelBlob.connected) {
    status.overall = 'fully_connected';
  } else if (status.mysql.connected || status.vercelBlob.connected) {
    status.overall = 'partially_connected';
  } else {
    status.overall = 'disconnected';
  }

  return NextResponse.json(status);
} 