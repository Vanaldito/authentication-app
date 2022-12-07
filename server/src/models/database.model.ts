import { createClient } from "redis";
import env from "../../environment";

const database = createClient({ url: env.REDIS_ENV ?? "" });

export default database;
