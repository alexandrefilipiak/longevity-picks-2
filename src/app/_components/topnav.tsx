import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sign } from "crypto";

export function TopNav() {
    return (
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="font-bold">Longevity Picks</div>
        
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </div>
      </nav>
    );
  }