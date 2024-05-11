import { defineEventHandler } from 'h3';

// http://localhost:4200/api/v1/hello
export default defineEventHandler(() => ({ message: 'Hello World' }));
