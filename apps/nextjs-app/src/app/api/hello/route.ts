import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.API_URL || 'http://backend-service:8080';
    const response = await fetch(`${apiUrl}/hello`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    return NextResponse.json({ message: data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Error calling backend API' }, { status: 500 });
  }
}