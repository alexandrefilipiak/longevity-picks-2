import { db } from "./../server/db/index";

export const dynamic = "force-dynamic";




export default async function HomePage() {
  const products = await db.query.products.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });

  console.log(products);

  return (
    <main className="">
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
    </main>
    
  );
}
