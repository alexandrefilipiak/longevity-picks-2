import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

//import ProductCard from "../../_components/product-card";

import { getProductById } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(+id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <Image
          className="aspect-[2/2] rounded-md object-cover"
          src={product.image_url ?? ""}
          alt={`${product.name} image`}
          width={1024}
          height={1024}
        />
      </div>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-3xl font-bold leading-10 text-gray-100">
          {product.name}
        </h1>
      </div>
    </div>
  );
}
