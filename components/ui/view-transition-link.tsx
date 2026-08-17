/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

// Combine standard anchor props with Next.js Link props
interface ViewTransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps<any>>, Omit<LinkProps<any>, "href"> {
  children: ReactNode;
  className?: string;
  href: any;
}

export function ViewTransitionLink({ children, href, className, ...props }: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Allow default browser behavior for modifier keys (Ctrl+Click, Cmd+Click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    const hrefString = href.toString();
    
    // 2. Allow default behavior for external/special links
    if (hrefString.startsWith("http") || hrefString.startsWith("mailto:") || hrefString.startsWith("tel:")) {
      return;
    }

    // 3. Skip View Transitions for hash links to preserve smooth scrolling
    if (hrefString.includes("#")) {
      return;
    }

    e.preventDefault();
    
    // 4. Fallback for browsers that don't support View Transitions yet
    if (!("startViewTransition" in document)) {
      router.push(hrefString as any);
      return;
    }

    // 5. Fire the native View Transition
    // Note: Using 'any' cast as startViewTransition is still experimental in some TS DOM lib versions
    (document as any).startViewTransition(() => {
      router.push(hrefString as any);
    });
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} {...props}>
      {children}
    </Link>
  );
}