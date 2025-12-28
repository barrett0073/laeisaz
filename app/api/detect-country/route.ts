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

    // Use ip-api.com to get country information
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    return NextResponse.json({ 
      country: data.country || 'unknown',
      countryCode: data.countryCode || 'unknown'
    });
  } catch (error) {
    console.error('Error detecting country:', error);
    return NextResponse.json({ country: 'unknown' });
  }
} 