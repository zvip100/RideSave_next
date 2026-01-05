"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth/authClient";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/mobileNav";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    window.location.href = "/login";
  };

  return (
    <header className="py-6 border-b border-border relative">
      <div className="container-main flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-row gap-3">
          <Image
            src="/logo.svg"
            alt="RideSave Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold tracking-tight">RideSave</span>
        </Link>

        {/* Desktop Nav */}
        <DesktopNav
          session={session}
          pathname={pathname}
          onSignOut={handleSignOut}
        />

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Nav */}
        <MobileNav
          session={session}
          pathname={pathname}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSignOut={handleSignOut}
        />
      </div>
    </header>
  );
}
