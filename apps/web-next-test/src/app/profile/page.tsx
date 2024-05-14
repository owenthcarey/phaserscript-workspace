// 'use client'

// https://nextjs.org/docs/app/building-your-application/routing#the-app-router
// https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages
// http://localhost:4200/profile
import Button from '../components/button';
import { fetchDummyData } from '../lib/data';

export default async function Page() {
  // Only works with 'use client' for some reason?
  // fetch('/api/hello')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));
  // const response = await fetch('/api/hello');
  // const data = await response.json();
  const users = await fetchDummyData();
  return (
    <div>
      <h1>User List</h1>
      {users.map(user => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/*<p>Data: {data}</p>*/}
        </div>
      ))}
      <Button></Button>
    </div>
  );
}
