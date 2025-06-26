/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://physioheal.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/diagnostics"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/diagnostics", "/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/diagnostics"],
      },
    ],
    additionalSitemaps: ["https://physioheal.com/sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      "/": { priority: 1.0, changefreq: "daily" },
      "/services": { priority: 0.9, changefreq: "weekly" },
      "/about": { priority: 0.8, changefreq: "monthly" },
      "/team": { priority: 0.8, changefreq: "monthly" },
      "/reviews": { priority: 0.7, changefreq: "weekly" },
      "/contact": { priority: 0.9, changefreq: "monthly" },
      "/book-appointment": { priority: 0.9, changefreq: "daily" },
    }

    const pageConfig = customConfig[path] || { priority: 0.7, changefreq: "monthly" }

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: pageConfig.priority,
      changefreq: pageConfig.changefreq,
    }
  },
}
