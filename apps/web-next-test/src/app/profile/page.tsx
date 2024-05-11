// https://nextjs.org/docs/app/building-your-application/routing#the-app-router
// https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages
// http://localhost:4200/profile
import Button from '../components/button';
import { fetchDummyData } from '../lib/data';

export default async function Page() {
  const users = await fetchDummyData();
  return (
    <div>
      <h1>User List</h1>
      {users.map(user => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
      <Button></Button>
    </div>
  );
}
