import type { WebAppManifest } from "@remix-pwa/dev";
import { json } from "@remix-run/node";

export const loader = () => {
  return json(
    {
      short_name: "PWA",
      name: "Remix PWA",
      description: "Remix Based PWA",
      start_url: "/",
      display: "standalone",
      background_color: "#d3d7dd",
      theme_color: "#34A853",
      orientation: "portrait",
      icons: [
        {
          src: "maskable_icon_x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "screenshot.png",
          sizes: "546x1100",
          type: "image/png",
          // @ts-expect-error: fa
          form_factor: "wide",
        },
      ],
    } as WebAppManifest,
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    }
  );
};
