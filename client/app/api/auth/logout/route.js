import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    // Create a response
    const response = NextResponse.json({ success: true });
    
    // Clear the session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error in http://localhost:3000/api/auth/logout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 