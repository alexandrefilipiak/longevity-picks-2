import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { NewPickForm } from "@/_components/new-pick-form";
import { products } from "~/server/db/schema";
import { db } from "~/server/db/index";
import { schema } from "@/_components/new-pick-schema";
import { ZodIssueCode, z } from "zod";

export default function NewPick() {

  const onDataAction= async (data: z.infer<typeof schema>) => {
    "use server";
    const parsed = schema.safeParse(data);
    

    if (parsed.success) {
      console.log("User registered");
      return { message: "User registered", user: parsed.data };
    } else {
        console.log("Invalid data");
        return {
            message: "Invalid data",
            issues: parsed.error.issues.map((issue) => issue.message)
          };
    }
  };

  const onFormAction= async (prevState: {
    message: string;
    product?: z.infer<typeof schema>;
    issues?: string[];
}, formData: FormData) => {
    "use server";
    const user = auth();

    if (!user.userId) {
      console.log("Invalid user");
      return {
          message: "Invalid user",
          issues: []
        };
    }

    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);

    if (parsed.success) {

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const productsToInsert = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: parsed.data.name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tldrDescription: parsed.data.tldrDescription,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdBy: user.userId,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await db.insert(products).values(productsToInsert);

      console.log("New pick submitted");
      return { message: "New pick submitted", product: parsed.data };
    } else {
        console.log("Invalid data");
        return {
            message: "Invalid data",
            issues: parsed.error.issues.map((issue) => issue.message)
          };
    }
  };

  return (
    <NewPickForm onDataAction={onDataAction} onFormAction={onFormAction}/>
  );
}
