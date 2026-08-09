import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function NotFound() {
  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-ink text-ivory">
      <div className="max-w-2xl flex flex-col items-center gap-8">
        
        <h1 className="font-display text-8xl md:text-9xl text-ivory/20 leading-none select-none">
          404
        </h1>
        
        <div className="flex flex-col gap-4 -mt-12 z-10">
          <h2 className="font-display text-4xl md:text-5xl">
            This page has faded.
          </h2>
          <p className="font-body text-ivory-dim text-lg">
            Like an old tattoo, the link you followed is no longer here. Let's get you back to the gallery.
          </p>
        </div>

        <InteractiveHoverButton className="mt-8 text-ivory border-inchworm hover:bg-inchworm hover:text-ink w-fit">
          <Link href="/">Return to Home</Link>
        </InteractiveHoverButton>

      </div>
    </main>
  );
}
