import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/modules/services/auth"

export async function middleware(request: NextRequest) {
    const session = await auth()

    const protectedRoutes = ['/panel']
    if (!session && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}