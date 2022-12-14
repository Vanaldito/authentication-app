import { Router } from "express";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidEmail, isValidPassword } from "../helpers";
import { User, UserData } from "../models";
import { DatabaseError } from "pg";
import env from "../../environment";

const apiRouter = Router();

apiRouter.post("/register-user", async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || !email.trim() || !isValidEmail(email.trim()))
    return res.status(400).json({ status: 400, error: "email not valid" });
  if (
    typeof password !== "string" ||
    !password.trim() ||
    !isValidPassword(password.trim())
  ) {
    return res.status(400).json({ status: 400, error: "password not valid" });
  }

  const saltRounds = 10;
  const hashedPassword = await hash(password.trim(), saltRounds);

  try {
    const result = await new User({
      name: `default--${new Date().getTime()}`,
      email: email.trim(),
      password: hashedPassword,
      photoUrl: "https://secure.gravatar.com/avatar",
      bio: "",
      phone: "",
    }).save();
    if (result !== undefined) {
      const token = jwt.sign({ email }, env.JWT_SECRET as string);

      return res
        .cookie("auth-token", `Bearer ${token}`, {
          expires: new Date(Date.now() + 8 * 3600000),
          secure: true,
          sameSite: true,
        })
        .json({ status: 200 });
    }

    throw new Error("Database result error");
  } catch (err) {
    console.log(err);
    if (err instanceof DatabaseError && err.code === "23505") {
      return res
        .status(409)
        .json({ status: 409, error: "email is already used" });
    }

    res.status(500).json({ status: 500, error: "internal server error" });
  }
});

apiRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ status: 400, error: "email not valid" });
  }
  if (typeof password !== "string" || !password.trim()) {
    return res.status(400).json({ status: 400, error: "password not valid" });
  }

  let results;
  try {
    results = await User.findByEmail(email.trim());
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  if (results.rows.length === 0)
    return res
      .status(404)
      .json({ status: 404, error: "user with given email not found" });

  const userInfo = results.rows[0] as UserData;

  const isCorrectPassword = await compare(password, userInfo.password);

  if (!isCorrectPassword) {
    return res
      .status(401)
      .json({ status: 401, error: "bad email or password" });
  }

  const token = jwt.sign({ email: userInfo.email }, env.JWT_SECRET as string);

  res
    .cookie("auth-token", `Bearer ${token}`, {
      expires: new Date(Date.now() + 8 * 3600000),
      secure: true,
      sameSite: true,
    })
    .json({ status: 200 });
});

apiRouter.get("/is-logged", (req, res) => {
  try {
    jwt.verify(
      req.cookies["auth-token"].split(" ")[1],
      env.JWT_SECRET as string
    );

    res.json({ status: 200, data: { isLogged: true } });
  } catch {
    res.json({ status: 200, data: { isLogged: false } });
  }
});

apiRouter.get("/user-info", async (req, res) => {
  let tokenInfo;
  try {
    tokenInfo = jwt.verify(
      req.cookies["auth-token"].split(" ")[1],
      env.JWT_SECRET as string
    ) as { email: string };
  } catch {
    return res
      .status(401)
      .json({ status: 401, error: "auth token wrong or invalid" });
  }

  let results;
  try {
    results = await User.findByEmail(tokenInfo.email.trim());
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ status: 500, error: "internal server error" });
  }

  if (results.rows.length === 0)
    return res.status(404).json({ status: 404, error: "user not found" });

  const userInfo = results.rows[0] as {
    name: string;
    email: string;
    bio: string;
    phone: string;
    photourl: string;
    userid: number;
  };

  res.status(200).json({
    status: 200,
    data: {
      userid: userInfo.userid,
      name: userInfo.name,
      email: userInfo.email,
      bio: userInfo.bio,
      phone: userInfo.phone,
      photourl: userInfo.photourl,
    },
  });
});

apiRouter.post("/update-user", async (req, res) => {
  const { name, bio, photoUrl, phone } = req.body;

  if (typeof name !== "string" && name !== undefined) {
    return res
      .status(400)
      .json({ status: 400, error: "name value is not allowed" });
  }

  if (typeof bio !== "string" && bio !== undefined) {
    return res
      .status(400)
      .json({ status: 400, error: "bio value is not allowed" });
  }

  if (typeof photoUrl !== "string" && photoUrl !== undefined) {
    return res
      .status(400)
      .json({ status: 400, error: "photo url value is not allowed" });
  }

  if (typeof phone !== "string" && phone !== undefined) {
    return res
      .status(400)
      .json({ status: 400, error: "phone value is not allowed" });
  }

  let tokenInfo;
  try {
    tokenInfo = jwt.verify(
      req.cookies["auth-token"].split(" ")[1],
      env.JWT_SECRET as string
    ) as { email: string };
  } catch {
    return res
      .status(401)
      .json({ status: 401, error: "auth token wrong or invalid" });
  }

  try {
    await User.update(tokenInfo.email, {
      name,
      bio,
      photoUrl,
      phone,
    });

    return res.status(200).json({ status: 200 });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, error: "internal server error" });
  }
});

export default apiRouter;
