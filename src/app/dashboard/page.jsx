import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import DashboardClient from './DashboardClient';

async function validateAdminFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      redirect('/unauthorized');
    }
  } catch {
    redirect('/login');
  }
}

export default async function DashboardPage() {
  await validateAdminFromCookies();
  return <DashboardClient />;
}
