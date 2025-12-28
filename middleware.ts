import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and Next.js internal routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    /\.(pdf|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Get the user's IP address
  const ip = request.ip || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0];
  
  // Get the current language cookie
  const languageCookie = request.cookies.get('language');
  
  // If language is already set, continue
  if (languageCookie) {
    return NextResponse.next();
  }

  // Default to English
  let language = 'en';

  // If we have an IP, try to detect the country
  if (ip) {
    try {
      // Use ip-api.com to get country information
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      
      // If the country is Iran, set language to Farsi
      if (data.countryCode === 'IR') {
        language = 'fa';
      }
    } catch (error) {
      console.error('Error detecting country:', error);
    }
  }

  // Create a response
  const response = NextResponse.next();

  // Set the language cookie
  response.cookies.set('language', language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax'
  });

  return response;
}

// Specify which paths the middleware should run on
// We match all paths and filter inside the middleware function
export const config = {
  matcher: [
    /*
     * Match all request paths - we filter inside the middleware function
     * to skip static files, API routes, and Next.js internal routes
     */
    '/:path*',
  ],
}; 