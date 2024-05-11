import { createRequestHandler } from "@remix-run/express";
import express from "express";
import { installGlobals } from "@remix-run/node";
import compression from "compression";
import morgan from "morgan";

installGlobals();

const viteDevServer =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const remixHandler = createRequestHandler({
  // @ts-expect-error: expected type mismatch
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("../build/server/index.js"),
});

const app = express();
app.use(compression());

app.disable("x-powered-by");

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use("/assets", express.static("build/client/assets", { immutable: true, maxAge: "1y" }));
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));
app.use(morgan("tiny"));

// handle SSR requests
app.all("*", remixHandler);

const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello from express");
});

app.listen(port, () => console.log(`Express server listening at http://localhost:${port}`));
