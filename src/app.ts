import express, {Request, Response} from 'express';
import { createOrder, findOrderByName } from './db/repos/orderRepository';
import { NewOrder, Order } from './db/schema';

const app = express(); 
const port = 3030;

app.get('/Order', async (req: Request<{}, {}, {}, {name: string, limit: string | undefined}>, res: Response) => {

    const { name, limit } = req.query;
 
    let queriedOrder;

    try {
        queriedOrder = await findOrderByName(name);
    }   
    catch (e) {
        const qRes = await fetch(`https://octocom-test.myshopify.com/admin/api/2024-01/orders.json?status=any&${limit ? `limit=${limit}` : ''}`, {
            method: 'get',
            headers: {'X-Shopify-Access-Token': 'shpua_499be34dd5bd57ebc590ae0dc6858962'}        
        })

        const orderJson = await qRes.json();
        
        if (typeof orderJson === 'object' && !Array.isArray(orderJson)) {
            if (orderJson["orders"] && Array.isArray(orderJson["orders"])) {

            const orders = orderJson["orders"];

            const promises: Promise<Order>[] = [];
                orders.forEach(o => {
                    console.log('test');
                    if (typeof o === 'object') {
                        
                        if (o["id"] && o["name"] && typeof o["id"]  === 'number' && typeof o["name"] === 'string') {

                            const newOrder: NewOrder = {
                                name: o["name"],
                                id: o["id"]
                            };

                            promises.push(createOrder(newOrder));

                            if (o["name"] === name) {
                                console.log(o["name"]);
                                queriedOrder = o;
                            }
                        }
                    }
                })
                try {
                    Promise.all(promises);
                }
                catch (e) {
                    console.error(`failed to insert new order into db with error ${e}`);
                }
            }
        }
    }
    finally {
        if (queriedOrder) {
            return res.status(200).json(queriedOrder).send();
        }
        else {
            return res.status(404).send();
        }
    }
})



app.listen(port, () => {
    console.log('Express server listening on port', port);
});
