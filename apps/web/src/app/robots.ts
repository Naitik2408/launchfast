import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://launchfast.naitik.work/sitemap.xml",
    host: "https://launchfast.naitik.work",
  };
}
