export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/estate/${category ? `getByCategory/${category}` : 'getAll'}`
    );
    
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch estates' }, { status: 500 });
  }
}