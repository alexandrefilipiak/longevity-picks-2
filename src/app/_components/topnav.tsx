"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sign } from "crypto";
import { UploadButton } from "../utils/uploadthing";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
        const router = useRouter();

    return (
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="font-bold">Longevity Picks</div>
        
        <div className="flex flex-row items-center gap-4">
          <Link href={`/new-pick`}>
            <Button>Add a new pick</Button>
          </Link>

          <SignedOut>
            <SignInButton />
          </SignedOut>
            <SignedIn>
                <SimpleUploadButton/>
                <UserButton/>
            </SignedIn>
        </div>
      </nav>
    );
  }