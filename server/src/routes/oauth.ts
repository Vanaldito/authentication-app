import jwt from "jsonwebtoken";
import { Router } from "express";
import { DatabaseError } from "pg";
import { User } from "../models";
import {
  getGithubAccessToken,
  getGithubUserInfo,
  getGoogleAccessToken,
  getGoogleUserInfo,
} from "../services";
import env from "../../environment";

const oauthRouter = Router();

oauthRouter.get("/code/github", async (req, res) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ status: 400, error: "Invalid code" });
  }

  let access_token;
  try {
    const results = await getGithubAccessToken(code);

    if (results.access_token) {
      access_token = results.access_token;
    } else {
      throw new Error("Access token not found");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  let userInfo;
  try {
    userInfo = await getGithubUserInfo(access_token);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  // Add a space to the email to prevent another user can copy it.
  const userEmail = userInfo.email
    ? `${userInfo.email} githubuser`
    : `${userInfo.id}@github.com githubuser`;

  try {
    const user = await new User({
      name: userInfo.login,
      email: userEmail,
      password: "",
      photoUrl: userInfo.avatar_url,
      phone: "",
      bio: userInfo.bio ?? "",
    }).save();

    if (user !== undefined) {
      const token = jwt.sign({ email: userEmail }, env.JWT_SECRET as string);

      res.cookie("auth-token", `Bearer ${token}`, {
        expires: new Date(Date.now() + 8 * 3600000),
        secure: true,
        sameSite: false,
      });

      return res.redirect("/");
    }

    throw new Error("Database result error");
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      const token = jwt.sign({ email: userEmail }, env.JWT_SECRET as string);

      res.cookie("auth-token", `Bearer ${token}`, {
        expires: new Date(Date.now() + 8 * 3600000),
        secure: true,
        sameSite: false,
      });

      return res.redirect("/");
    }

    console.log(err);
    res.status(500).json({ status: 500, error: "internal server error" });
  }
});

oauthRouter.get("/code/google", async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  if (!code || typeof code !== "string") {
    return res.status(400).json({ status: 400, error: "Invalid code" });
  }

  let access_token;
  try {
    const results = await getGoogleAccessToken(code);

    if (results.access_token) {
      access_token = results.access_token;
    } else {
      throw new Error("Access token not found");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  let userInfo;
  try {
    userInfo = await getGoogleUserInfo(access_token);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  // Add a space to the email to prevent another user can copy it.
  const userEmail = userInfo.email
    ? `${userInfo.email} googleuser`
    : `${userInfo.id}@gmail.com googleuser`;

  try {
    const user = await new User({
      name: userInfo.name,
      email: userEmail,
      password: "",
      photoUrl: userInfo.picture ?? "https://secure.gravatar.com/avatar",
      phone: "",
      bio: "",
    }).save();

    if (user !== undefined) {
      const token = jwt.sign({ email: userEmail }, env.JWT_SECRET as string);

      res.cookie("auth-token", `Bearer ${token}`, {
        expires: new Date(Date.now() + 8 * 3600000),
        secure: true,
        sameSite: false,
      });

      return res.redirect("/");
    }

    throw new Error("Database result error");
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      const token = jwt.sign({ email: userEmail }, env.JWT_SECRET as string);

      res.cookie("auth-token", `Bearer ${token}`, {
        expires: new Date(Date.now() + 8 * 3600000),
        secure: true,
        sameSite: false,
      });

      return res.redirect("/");
    }

    console.log(err);
    res.status(500).json({ status: 500, error: "internal server error" });
  }
});

export default oauthRouter;
