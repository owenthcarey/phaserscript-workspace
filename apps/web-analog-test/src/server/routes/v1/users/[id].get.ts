import { defineEventHandler, getRouterParam } from 'h3';

// http://localhost:4200/api/v1/users/123
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  // TODO: fetch user by id from your database
  return `User profile of ${id}!`;
});
