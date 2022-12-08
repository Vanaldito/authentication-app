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

    return database.set(
      username,
      JSON.stringify({ username, email, password })
    );
  }
}