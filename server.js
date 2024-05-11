import { createRequestHandler } from "@remix-run/express";
import express from "express";

import { installGlobals } from "@remix-run/node";

installGlobals();

// this env runs only on development environment. Means when running viteDevServer (see above code)
// eslint-disable-next-line no-undef
const MODE = process.env.NODE_ENV;

const viteDevServer =
  MODE === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", {
      immutable: true,
      maxAge: "1y",
    })
  );
}

app.use(express.static("build/client", { maxAge: "1h" }));

// needs to handle all verbs (GET, POST, etc.)
app.all("*", async (req, res, next) => {
  // purgeRequireCache();
  const build = await import("./build/server/index.js");
  return createRequestHandler({ build })(req, res, next);
});

// this env runs only on development environment. Means when running viteDevServer (see above code)
// eslint-disable-next-line no-undef
const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
