import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/83dcdb81-8b40-4c5f-b35f-b5eda313f14b-vegkb0.png",
  "https://utfs.io/f/1ee55b32-1ea9-4476-b465-9c5d06e427a5-3zq5kh.webp",
  "https://utfs.io/f/02b1e970-cf84-4475-a481-7a4af3b32e94-n555hx.webp"
];

const mockImages = mockUrls.map((url, index)=> ({
  id: index+1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
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
