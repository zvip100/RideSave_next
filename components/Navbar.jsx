"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="py-6 border-b border-border">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="RideSave Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold tracking-tight">RideSave</span>
        </Link>
        <nav className="flex gap-8 items-center">
          <Link
            href="/trips"
            className={`text-[0.9375rem] hover:text-foreground transition-colors ${
              pathname === "/trips"
                ? "text-foreground font-medium"
                : "text-secondary-foreground"
            }`}
          >
            Trips
          </Link>
          <Link
            href="/api"
            className={`py-2 px-4 text-sm rounded-xl transition-all ${
              pathname === "/api"
                ? "bg-primary text-primary-foreground border border-primary"
                : "bg-secondary text-foreground border border-border hover:bg-muted hover:border-muted-foreground"
            }`}
          >
            API Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
