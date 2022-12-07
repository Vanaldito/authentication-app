import { createClient } from "redis";
import env from "../../environment";

const database = createClient({ url: env.REDIS_URI ?? "" });

export default database;
