import { json } from "@remix-run/react";
import db from "../db.server";
import { cors } from "remix-utils/cors";

export async function loader() {
    return json({status: 200, message: 'data from api'})
}

export async function action({ request }) {
    const method = request.method;
    let data = await request.formData();
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;

    if (!customerId || !productId || !shop) {
        return json({ status: 400, message: "Missing required fields" });
    } 

    switch(method) {
        case 'POST':
            const wishlist = await db.Wishlist.create({
                data: {
                    customerId,
                    productId,
                    shop
                }
            })    
        
            const response = json({ message: "product added to wishlist", method: "POST", wishlist: wishlist });
            return cors(request, response);

        case 'PATCH': 
            return json({ message: "Success", method: "PATCH" });
        default: 
            return new Response("Method not allowed", { status: 405 })
    }
}