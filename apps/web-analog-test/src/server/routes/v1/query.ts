import { defineEventHandler, getQuery } from 'h3';

// http://localhost:4200/api/v1/query?param1=Analog&param2=Angular
export default defineEventHandler((event) => {
  const { param1, param2 } = getQuery(event);
  return `Hello, ${param1} and ${param2}!`;
});
