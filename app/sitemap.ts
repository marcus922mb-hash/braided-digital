import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/oferta", "/portfolio", "/o-mnie", "/proces", "/cennik", "/faq", "/kontakt", "/regulamin", "/polityka-prywatnosci", "/polityka-cookies"];
  return routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : .8 }));
}
