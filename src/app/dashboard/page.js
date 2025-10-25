import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJWT } from '@/lib/jwt'
import DashboardContent from './DashboardContent'

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) redirect('/signin')
    const user = verifyJWT(token)
    if (!user) redirect('/signin')

    return (<>

    <DashboardContent token={token} />
    </>)
}
