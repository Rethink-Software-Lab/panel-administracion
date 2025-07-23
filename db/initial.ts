import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL!;

export const db =
  process.env.NODE_ENV === "production"
    ? drizzleNeon(neon(DATABASE_URL), { schema })
    : drizzleNode(DATABASE_URL, { schema });

// export const db = drizzleNeon(neon(DATABASE_URL));
