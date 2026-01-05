"use client";

import Link from "next/link";
import { LogOut as LogOutIcon } from "lucide-react";
import SendWeeklyEmail from "@/components/sendWeeklyEmail";
import { cn } from "@/lib/utils";

export default function DesktopNav({ session, pathname, onSignOut }) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {session ? (
        <>
          <Link
            href="/trips"
            className={cn(
              "text-lg transition-colors",
              pathname === "/trips"
                ? "text-primary opacity-60"
                : "text-secondary-foreground hover:text-foreground"
            )}
          >
            Trips
          </Link>

          {pathname === "/trips" && <SendWeeklyEmail user={session.user} />}

          {/* Avatar with Popover */}
          <div className="relative group pl-6 border-l border-border">
            <button className="w-10 h-10 rounded-full bg-primary/10 flex-center hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="text-base font-medium text-primary">
                {session.user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </button>

            {/* Hover Popover */}
            <div
              className={cn(
                "absolute right-0 top-full mt-2 w-48 py-2 rounded-lg",
                "bg-card border border-border shadow-lg z-50",
                "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                "transition-all duration-200 scale-95 group-hover:scale-100"
              )}
            >
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium truncate mb-1">
                  {session.user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user.email}
                </p>
              </div>
              <div className="p-2">
                <button
                  onClick={onSignOut}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                    "text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10",
                    "transition-all duration-200"
                  )}
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className="text-lg text-secondary-foreground hover:text-foreground transition-colors"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
