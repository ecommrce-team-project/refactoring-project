import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;
    
    // In a real application, you would validate credentials against your database
    // For now, we'll use a simple check for demo purposes
    if (identifier === 'demo_user' && password === 'password') {
      // Set a session cookie
      const response = NextResponse.json({ success: true });
      
      // Set a session cookie that expires in 7 days
      response.cookies.set('session', 'demo_session_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error in http://localhost:3000/api/auth/login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 