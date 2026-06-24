import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Braided Digital",
    short_name: "Braided",
    description: "Strony i sklepy internetowe dla małych marek.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#191815",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
