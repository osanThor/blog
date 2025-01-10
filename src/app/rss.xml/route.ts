import RSS from "rss";
import { getAllPosts } from "@/services/posts.service.velite";

const BASE_URI = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET() {
  const feed = new RSS({
    title: "Given's log",
    description: "FE 개발자 준영의 개발 및 일상 일지",
    generator: "RSS for Node and Next.js",
    feed_url: `${BASE_URI}/feed.xml`,
    site_url: BASE_URI,
    copyright: `Copyright ${new Date().getFullYear().toString()}`,
    language: "ko-KR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const allPosts = getAllPosts();

  if (allPosts) {
    allPosts.map((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${BASE_URI}/${post.category}/${post.href}`,
        date: post.date,
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
