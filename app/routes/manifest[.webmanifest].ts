import type { WebAppManifest } from "@remix-pwa/dev";
import { json } from "@remix-run/node";

export const loader = () => {
  return json(
    {
      short_name: "Task Traceo",
      name: "Task Traceo",
      description: "A Task Management App",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#34A853",
      orientation: "portrait",
      icons: [
        {
          src: "maskable_icon_x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "login-screenshot.png",
          sizes: "1440x2960",
          type: "image/png",
          form_factor: "wide",
          label: "Login Screen",
        },
        {
          src: "splash-screenshot.png",
          sizes: "1500x3248",
          type: "image/png",
        },
        {
          src: "dashboard-screenshot.png",
          sizes: "1500x3248",
          type: "image/png",
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
