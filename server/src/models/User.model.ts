import database from "./database.model";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export default class User {
  username: string;
  email: string;
  password: string;

  constructor({ username, email, password }: UserData) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    const { username, email, password } = this;

    return database.query(
      "INSERT INTO Users(username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
  }
}
