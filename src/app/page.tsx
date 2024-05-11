import { db } from "./../server/db/index";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/83dcdb81-8b40-4c5f-b35f-b5eda313f14b-vegkb0.png",
  "https://utfs.io/f/1ee55b32-1ea9-4476-b465-9c5d06e427a5-3zq5kh.webp",
  "https://utfs.io/f/02b1e970-cf84-4475-a481-7a4af3b32e94-n555hx.webp"
];

const mockImages = mockUrls.map((url, index)=> ({
  id: index+1,
  url,
}));

export default async function HomePage() {
  const products = await db.query.products.findMany();

  console.log(products);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        <div key="1232">test</div>
        { 
          products.map((product)=> (<div key={product.id}>{product.name}</div>))
        }
        {
          mockImages.map((image)=> (
            <div key={image.id} className="w-48">
              <img src={image.url}/>
            </div>
          ))
        }
      </div>
    </main>
    
  );
}
