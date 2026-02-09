import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('csc29_auth')
    const { pathname } = request.nextUrl

    // Protect all routes except /login and /admin and api routes
    if (
        !authCookie &&
        pathname !== '/login' &&
        !pathname.startsWith('/admin') &&
        !pathname.startsWith('/api') &&
        !pathname.startsWith('/_next') &&
        pathname !== '/favicon.ico'
    ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect to dashboard if logged in and trying to access /login
    if (authCookie && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
