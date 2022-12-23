import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { ensureAuthenticated } from "./src/middlewares";
import { database } from "./src/models";

import { apiRouter, oauthRouter } from "./src/routes/";
import env from "./environment";

async function main() {
  await database.connect(err => {
    if (err) console.error(err);
    else console.log("Connected to database");
  });

  const app = express();

  if (process.env.VEREX_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "static")));
  }

  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/v1", apiRouter);
  app.use("/oauth", oauthRouter);

  app.get("/", ensureAuthenticated, (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/edit", ensureAuthenticated, (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/sign-up", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/login", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/logout", (_req, res) => {
    res.clearCookie("auth-token").redirect("/login");
  });

  /* Add your routes here */

  if (process.env.VEREX_ENV === "development") {
    const { Assets } = await import("verex");
    new Assets().useRouter(app);
  }

  app.get("/*", (_req, res) => {
    res
      .status(404)
      .sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  const { PORT = 8080 } = env;

  app.listen(PORT, () => {
    console.log();
    console.log(`  App running in port ${PORT}`);
    console.log();
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
  });
}

main();
