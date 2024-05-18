import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "./../server/db/index";
import { UploadButton } from "./utils/uploadthing";
import { get } from "http";
import { getMyProducts } from "~/server/queries";
import { getProducts } from "~/server/queries";

export const dynamic = "force-dynamic";


async function Products() {
  const products = await getProducts();

  console.log(products);

  return (
    <div className="flex flex-wrap gap-4">
          {
            products.map((product)=> (
              <div key={product.id} className="flex w-48 flex-col">
                <img src={product.image_url ?? undefined}/>
                <div>{product.name}</div>
              </div>
            ))
          }
        </div>
  )
}

async function MyProducts() {
  const products = await getMyProducts();

  console.log(products);

  return (
    <div className="flex flex-wrap gap-4">
          {
            products.map((product)=> (
              <div key={product.id} className="flex w-48 flex-col">
                <img src={product.image_url ?? undefined}/>
                <div>{product.name}</div>
              </div>
            ))
          }
        </div>
  )
}

export default async function HomePage() {
  return (
    <main className="flex flex-row">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <MyProducts/>
      </SignedIn>
    </main>
    
  );
}
