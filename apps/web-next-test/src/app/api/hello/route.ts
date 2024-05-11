// https://nextjs.org/learn/dashboard-app/fetching-data#api-layer
// http://localhost:4200/api/hello
export async function GET(request: Request) {
  return new Response('Hello, from API!');
}
