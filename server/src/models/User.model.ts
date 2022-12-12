import database from "./database.model";
import { UserData } from "./UserData.model";

export default class User implements UserData {
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  bio: string;
  phone: string;

  constructor({ name, email, password, photoUrl, bio, phone }: UserData) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.photoUrl = photoUrl;
    this.bio = bio;
    this.phone = phone;
  }

  save() {
    const { name, email, password, photoUrl, bio, phone } = this;

    return database.query(
      "INSERT INTO Users(name, email, password, bio, phone, photourl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, password, bio, phone, photoUrl]
    );
  }

  static findByEmail(email: string) {
    return database.query("SELECT * FROM Users WHERE email=$1", [email]);
  }
}
