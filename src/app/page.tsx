import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "./../server/db/index";

export const dynamic = "force-dynamic";


async function Products() {
  const products = await db.query.products.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });

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
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Products/>
      </SignedIn>
    </main>
    
  );
}
