import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, href, target, rel, ...props }, ref) => {
  const baseClasses = cn(
    "group relative w-auto min-w-48 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-inchworm bg-transparent p-3 px-8 text-center font-body text-[1rem] tracking-wide text-inchworm",
    className,
  );

  const innerContent = (
    <>
      <span className="inline-block translate-x-1 transition-all duration-[150ms] ease-[cubic-bezier(.43,.195,.02,1)] group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-ink opacity-0 transition-all duration-[150ms] ease-[cubic-bezier(.43,.195,.02,1)] group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="w-5 h-5" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-inchworm transition-all duration-[150ms] ease-[cubic-bezier(.43,.195,.02,1)] group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-inchworm"></div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} target={target} rel={rel}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button ref={ref} className={baseClasses} {...props}>
      {innerContent}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
