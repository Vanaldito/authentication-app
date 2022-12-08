import { Router } from "express";
import { hash } from "bcrypt";
import { isValidEmail, isValidPassword } from "../helpers";
import { User } from "../models";

const apiRouter = Router();

apiRouter.post("/register-user", async (req, res) => {
  const { username, email, password } = req.body;

  if (typeof username !== "string" || !username)
    return res.status(400).json({ status: 400, error: "username not valid" });
  if (typeof email !== "string" || !email || !isValidEmail(email))
    return res.status(400).json({ status: 400, error: "email not valid" });
  if (typeof password !== "string" || !password || !isValidPassword(password)) {
    return res.status(400).json({ status: 400, error: "password not valid" });
  }

  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);

  try {
    const result = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();
    if (result?.toUpperCase() === "OK") return res.json({ status: 200 });

    throw new Error("Database result error");
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, error: "internal server error" });
  }
});

export default apiRouter;
