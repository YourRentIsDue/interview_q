import { db } from "../conn"
import { NewOrder, Order } from "../schema";

export const findOrderByName = async (name: string) => {
    return await db.selectFrom('orders')
        .where('name', '=', name)
        .selectAll()
        .executeTakeFirstOrThrow();
}

export const createOrder = async (order: NewOrder): Promise<Order> => {
    return await db.insertInto('orders')
        .values(order)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export const deleteOrder = async (id: number) => {
    return await db.deleteFrom('orders')
        .where('id', '=', id)
        .executeTakeFirst();
}