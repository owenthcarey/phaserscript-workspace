import { defineEventHandler } from 'h3';

// http://localhost:4200/api/v1/anything/you/type/here
export default defineEventHandler((event) => `Default page`);
