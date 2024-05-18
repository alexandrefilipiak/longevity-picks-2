"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sign } from "crypto";
import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

export function TopNav() {
        const router = useRouter();

    return (
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="font-bold">Longevity Picks</div>
        
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
            <SignedIn>
                <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
                    router.refresh();
                }}/>
                <UserButton/>
            </SignedIn>
        </div>
      </nav>
    );
  }