import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get the session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // In a real application, you would validate the session and fetch the user from your database
    // For now, we'll return a mock user
    const user = {
      id: '1',
      username: 'demo_user',
      email: 'demo@example.com',
      role: 'customer',
      pfp: null
    };
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in http://localhost:3000/api/auth/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 