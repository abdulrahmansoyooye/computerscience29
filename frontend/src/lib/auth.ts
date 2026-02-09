import { cookies } from 'next/headers'

const AUTH_COOKIE_NAME = 'csc29_auth'

export async function isAuthenticated() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME)
    return !!authCookie?.value
}

export async function getUser() {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME)
    return authCookie?.value || null
}

export async function login(matricNumber: string, password: string) {
    const sharedPassword = process.env.SHARED_ACCESS_PASSWORD || 'csc29-portal'

    // Basic validation
    if (!matricNumber || !password) return { success: false, message: 'Please provide all credentials' }

    // Unified matric number validation (e.g. CSC/20XX/XXX or similar)
    const matricRegex = /^\d{6}$/;
    if (!matricRegex.test(matricNumber)) {
        return { success: false, message: 'Invalid Matric Number format (e.g. 202110)' }
    }

    if (password === sharedPassword) {
        const cookieStore = await cookies()
        cookieStore.set(AUTH_COOKIE_NAME, matricNumber, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        })
        return { success: true }
    }

    return { success: false, message: 'Incorrect departmental password' }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE_NAME)
}
