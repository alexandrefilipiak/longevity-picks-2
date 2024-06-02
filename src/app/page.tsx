import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyProducts } from "~/server/queries";
import { getProducts } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";


async function Products() {
  const products = await getProducts();

  console.log(products);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
          {
            products.map((product)=> (
              <div key={product.id} className="flex h-48 w-48 flex-col">
                {product.imageUrl ? (
                <Image src={product.imageUrl} 
                style={{objectFit: "contain"}}
                width={192}
                height={192}
                alt={product.name}/>
                ) : (
                  <div>No image available</div>
                )}
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
    <div className="flex flex-wrap gap-4 justify-center">
          {
            products.map((product)=> (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div key={product.id} className="flex h-48 w-48 flex-col">
                  {product.imageUrl ? (
                  <Image src={product.imageUrl} 
                  style={{objectFit: "contain"}}
                  width={192}
                  height={192}
                  alt={product.name}/>
                  ) : (
                    <div>No image available</div>
                  )}
                  <div>{product.name}</div>
                </div>
              </Link>
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
