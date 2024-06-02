import Image from "next/image";
import { NewPickForm } from "@/_components/new-pick-form";

import { schema } from "~/app/_components/new-pick-schema";
import { z } from "zod";

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
    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);
    

    if (parsed.success) {
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
