"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut as LogOutIcon } from "lucide-react";
import { useSession, signOut } from "@/lib/auth/authClient";
import SendWeeklyEmail from "@/components/sendWeeklyEmail";
import { cn } from "@/lib/utils";

function NavLink({ href, pathname, children }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative transition-all duration-200 text-lg",
        isActive
          ? "text-primary font-medium"
          : "text-secondary-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
    router.push("/login");
    // window.location.href = "/login";
  };

  return (
    <header className="py-6 border-b border-border">
      <div className="container-main flex justify-between items-center">
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

        <nav className="flex-row gap-8">
          {session ? (
            <>
              <NavLink href="/trips" pathname={pathname}>
                Trips
              </NavLink>

              {pathname === "/trips" && <SendWeeklyEmail user={session.user} />}

              {/* Avatar with Hover Popover */}
              <div className="relative group pl-6 border-l border-border">
                {/* Avatar Button */}
                <button className="w-10 h-10 rounded-full bg-primary/10 flex-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-base font-medium text-primary">
                    {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </button>

                {/* Hover Popover */}
                <div
                  className={cn(
                    "absolute right-0 top-full mt-2 w-48 py-2 rounded-lg",
                    "bg-card border border-border shadow-lg",
                    "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                    "transition-all duration-200 transform origin-top-right",
                    "scale-95 group-hover:scale-100 z-50"
                  )}
                >
                  {/* User Info */}
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground truncate mb-1">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <div className="p-2">
                    <button
                      onClick={handleSignOut}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                        "text-rose-400/70 hover:text-rose-400",
                        "bg-transparent hover:bg-rose-500/10",
                        "border border-transparent hover:border-rose-500/20",
                        "transition-all duration-200 group/logout"
                      )}
                    >
                      <LogOutIcon className="w-4 h-4 group-hover/logout:-translate-x-0.5 transition-transform duration-200" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <NavLink href="/login" pathname={pathname}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
