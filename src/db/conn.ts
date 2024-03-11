import { Kysely, PostgresDialect } from "kysely";
import { Database } from "./schema";
import { Pool } from "pg";

export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            host: 'localhost',
            database: 'postgres',
            user: 'postgres',
            password: 'pw'
        })
    })
 })