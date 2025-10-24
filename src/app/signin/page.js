// src/app/login/page.js
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJWT } from '@/lib/jwt'
import LoginForm from './LoginForm'

export default async function LoginPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (token) {
        const user = verifyJWT(token)
        if (user) {
            redirect('/dashboard')
        }
    } else {
        redirect('/signup')
    }

    return <LoginForm />
}
