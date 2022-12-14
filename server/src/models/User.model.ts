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

  static update(
    email: string,
    newValues: {
      name?: string;
      photoUrl?: string;
      bio?: string;
      phone?: string;
    }
  ) {
    const validValues: string[] = [];
    let query = "UPDATE Users SET";
    let i = 1;

    for (const [key, value] of Object.entries(newValues)) {
      if (value === undefined) continue;

      validValues.push(value);
      query += ` ${key}=$${i},`;
      i++;
    }

    if (!validValues.length) return undefined;

    // Remove last comma
    query = query.substring(0, query.length - 1);

    query += ` WHERE email=$${i}`;

    return database.query(query, validValues.concat(email));
  }

  static findByEmail(email: string) {
    return database.query("SELECT * FROM Users WHERE email=$1", [email]);
  }
}
