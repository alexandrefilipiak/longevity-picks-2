import "server-only";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { products } from "./db/schema";

export async function getProductById(productId: number) {
    const product = await db.query.products.findFirst({
        where: (model, {eq}) => eq(model.id,productId),
    });
    
    return product;
}

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

export async function deleteImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    await db.delete(products).where(and(eq(products.id, id),eq(products.createdBy, user.userId)));

    redirect("/");
}