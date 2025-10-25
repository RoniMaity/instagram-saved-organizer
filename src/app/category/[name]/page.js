import { cookies } from 'next/headers';
import CategoryPageClient from './CategoryPageClient';

export default async function CategoryPage({ params }) {
  const { name } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || null;


  return <CategoryPageClient name={name} token={token} />;
}
