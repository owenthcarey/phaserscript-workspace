import { defineEventHandler, setHeader } from 'h3';

// http://localhost:4200/api/v1/rss.xml
export default defineEventHandler((event) => {
  const feedString = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>My RSS Feed</title>
    <link>http://localhost:4200</link>
    <description>This is a test RSS feed</description>
  </channel>
</rss>`;
  setHeader(event, 'content-type', 'text/xml');
  return feedString;
});
