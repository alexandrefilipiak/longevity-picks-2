import { db } from "./../server/db/index";

export const dynamic = "force-dynamic";


const mockImages = mockUrls.map((url, index)=> ({
  id: index+1,
  url,
}));

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
              <img src={product.image_url}/>
              <div>{product.name}</div>
            </div>
          ))
        }
      </div>
    </main>
    
  );
}
