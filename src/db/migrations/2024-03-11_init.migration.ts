import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<any>): Promise<void> => {
    await db.schema
        .createTable('orders')
        .ifNotExists()
        .addColumn('id', 'numeric', col => col.primaryKey())
        .addColumn('name', 'varchar', col => col.notNull())
        .addColumn('created_at', 'timestamp', col => 
            col.defaultTo(sql`now()`).notNull()
        )
    .execute();
}

export const down = async (db: Kysely<any>): Promise<void> => {
    await db.schema.dropTable('orders').ifExists().execute();
}
