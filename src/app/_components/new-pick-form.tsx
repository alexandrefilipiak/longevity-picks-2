"use client";
import { useFormState } from 'react-dom';
import { useRef } from 'react';

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from "~/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "@/_components/new-pick-schema";
import { z } from "zod";

export const NewPickForm = ({ onDataAction, onFormAction }: 
  {onDataAction: (data: z.infer<typeof schema>) 
    => Promise<{
        message: string;
        product?: z.infer<typeof schema>;
        issues?: string[];
    }>, onFormAction: (
        prevState: {
            message: string;
            product?: z.infer<typeof schema>;
            issues?: string[];
        },
        data: FormData) 
    => Promise<{
        message: string;
        product?: z.infer<typeof schema>;
       issues?: string[];
    }>}) => {

    const [state, formAction] = useFormState(onFormAction, {
        message: "Product added, api 2",
    })

    //z.infer will infer the type of the schema
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          title: "",
          tldr_description: ""
        },
      });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
        <div>{state?.message}</div>
        <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) =>{
          evt.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
        className="space-y-8"
      >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Title of your picked product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tldr_description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Short description of your picked product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}