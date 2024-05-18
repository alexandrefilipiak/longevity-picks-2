import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getProducts() {
    const products = await db.query.products.findMany({
        orderBy: (model, {desc}) => desc(model.id),
    });
    
    return products;
}

export async function getMyProducts() {
    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    const products = await db.query.products.findMany({
        where: (model, {eq}) => eq(model.createdBy,user.userId),
        orderBy: (model, {desc}) => desc(model.id),
    });
    
    return products;
}