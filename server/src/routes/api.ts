import { Router } from "express";
import { isValidEmail, isValidPassword } from "../helpers";
import { User } from "../models";

const apiRouter = Router();

apiRouter.post("/register-user", (req, res) => {
  const { username, email, password } = req.body;

  if (typeof username !== "string" || !username)
    return res.status(400).json({ status: 400, error: "username not valid" });
  if (typeof email !== "string" || !email || !isValidEmail(email))
    return res.status(400).json({ status: 400, error: "email not valid" });
  if (typeof password !== "string" || !password || !isValidPassword(password))
    return res.status(400).json({ status: 400, error: "password not valid" });

  new User({ username, email, password })
    .save()
    .then(status => {
      if (status === "OK") {
        return res.json({ status: 200 });
      }

      throw new Error();
    })
    .catch(err => {
      res.status(500).json({ status: 500, error: "internal server error" });
      console.log(err);
    });
});

export default apiRouter;
