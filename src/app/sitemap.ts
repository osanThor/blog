import type { MetadataRoute } from 'next'
import { getAllPosts } from "@/services/posts.service.velite";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticUrls = ["/", "/posts/dev", "/posts/life", "/resume"];
    const staticSitemap = staticUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(),
    }));

  // Google의 제한은 사이트맵당 50,000개의 URL입니다.
  const products =  getAllPosts().slice(0, 50000);

  return [...staticSitemap, ...products.map((post) => ({
    url:`${BASE_URL}/${post.category}/${post.href}`,
    lastModified: new Date(post.date) 
  }))]
}

