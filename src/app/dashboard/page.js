import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJWT } from '@/lib/jwt'
import DashboardContent from './DashboardContent.js'

export default async function DashboardPage() {
  const cookieStore = await cookies()
//   console.log(cookieStore)
  const token = cookieStore.get('token')?.value
//   console.log("Token from cookies:", token)

  if (!token) {
    redirect('/signup')
  }

  const user = verifyJWT(token)
  if (!user) {
    redirect('/signup')
  }

  return <DashboardContent user={user} />
}