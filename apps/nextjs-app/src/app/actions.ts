'use server';

export async function getBackendData(): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.API_URL || 'http://backend-service:8080'}/hello`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Server Action Error:', error);
    return 'Error calling backend API';
  }
}
