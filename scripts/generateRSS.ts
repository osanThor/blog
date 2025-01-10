import { Feed } from "feed";
import fs from "fs";
import path from "path";
import { Post, posts } from "../.velite";

const BASE_URI = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

function generateRSS() {
  const feedOptions = {
    id: BASE_URI,
    title: "Given's log",
    description: "FE 개발자 준영의 개발 및 일상 일지",
    generator: "RSS for Node and Next.js",
    feed_url: `${BASE_URI}/feed.xml`,
    site_url: BASE_URI,
    copyright: `Copyright ${new Date().getFullYear().toString()}`,
    language: "ko-KR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  };
  const feed = new Feed(feedOptions);

  posts.map((post: Post) => {
    feed.addItem({
      title: post.title,
      description: post.description,
      link: `${BASE_URI}/${post.category}/${post.href}`,
      date: new Date(post.date),
    });
  });

  const OUTPUT_PATHS = {
    RSS: path.join(process.cwd(), "public", "rss.xml"),
    JSON: path.join(process.cwd(), "public", "rss.json"),
    ATOM: path.join(process.cwd(), "public", "atom.xml"),
  };

  fs.writeFileSync(OUTPUT_PATHS.RSS, feed.rss2());
  fs.writeFileSync(OUTPUT_PATHS.JSON, feed.json1());
  fs.writeFileSync(OUTPUT_PATHS.ATOM, feed.atom1());
  console.log("RSS Feed generated successfully!");
}

generateRSS();
