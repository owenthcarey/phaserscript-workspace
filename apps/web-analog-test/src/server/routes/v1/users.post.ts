import { defineEventHandler, readBody } from 'h3';

// http://localhost:4200/api/v1/users
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // TODO: Handle body and add user to your database
  return { updated: true };
});
