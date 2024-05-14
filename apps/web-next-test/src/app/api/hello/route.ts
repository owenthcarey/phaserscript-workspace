// https://nextjs.org/learn/dashboard-app/fetching-data#api-layer
// http://localhost:4200/api/hello
// export async function GET(request: Request) {
//   return new Response('Hello, from API!');
// }

export async function GET(request: Request) {
  // Set the header Content-Type to 'application/json'
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // Create a JSON response
  return new Response(JSON.stringify({ message: 'Hello, from API!' }), { headers });
}
