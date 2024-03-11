import { ColumnType, Insertable, Selectable } from "kysely";

export interface Database {
    orders: OrderTable
}

export interface OrderTable { 
    id: number;
    name: string;
    created_at: ColumnType<Date, string | undefined, never>
}

export type Order = Selectable<OrderTable>
export type NewOrder = Insertable<OrderTable>