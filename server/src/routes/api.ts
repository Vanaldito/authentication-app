import { Router } from "express";
import { hash } from "bcrypt";
import { isValidEmail, isValidPassword } from "../helpers";
import { User } from "../models";
import { DatabaseError } from "pg";

const apiRouter = Router();

apiRouter.post("/register-user", async (req, res) => {
  const { username, email, password } = req.body;

  if (typeof username !== "string" || !username.trim())
    return res.status(400).json({ status: 400, error: "username not valid" });
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
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    }).save();
    if (result !== undefined) return res.json({ status: 200 });
    console.log(result);

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

export default apiRouter;
