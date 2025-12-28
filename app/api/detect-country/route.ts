import { NextResponse } from 'next/server';

// Add dynamic route configuration
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Get the user's IP address from the request headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : request.headers.get('x-real-ip');

    if (!ip) {
      return NextResponse.json({ country: 'unknown' });
    }

    // Use ip-api.com to get country information with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    try {
      const response = await fetch(`https://ip-api.com/json/${ip}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ 
          country: data.country || 'unknown',
          countryCode: data.countryCode || 'unknown'
        });
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // If it's a timeout or abort, return unknown
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({ country: 'unknown' });
      }
      throw fetchError;
    }

    return NextResponse.json({ country: 'unknown' });
  } catch (error) {
    // Only log non-timeout errors
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('Error detecting country:', error);
    }
    return NextResponse.json({ country: 'unknown' });
  }
} 