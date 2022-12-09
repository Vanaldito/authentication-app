import { Client } from "pg";
import env from "../../environment";

const database = new Client({
  host: env.PGHOST,
  user: env.PGUSER,
  password: env.PGPASSWORD,
});

export default database;
