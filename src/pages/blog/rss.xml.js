import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const sortedBlog = blog.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Camilo Salazar Ocampo - Blog</title>
    <link>https://camilosalazar.dev/blog</link>
    <description>Data Engineering, Cloud Architecture & Web Development</description>
    <language>es-co</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${sortedBlog.map((post) => `
    <item>
      <title>${post.data.title}</title>
      <link>https://camilosalazar.dev/blog/${post.slug}</link>
      <guid isPermaLink="true">https://camilosalazar.dev/blog/${post.slug}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${post.data.description}</description>
      <category>${post.data.category}</category>
      <author>Camilo Salazar Ocampo</author>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}
