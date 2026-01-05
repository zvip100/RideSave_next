"use client";

import Link from "next/link";
import { LogOut as LogOutIcon } from "lucide-react";
import SendWeeklyEmail from "@/components/sendWeeklyEmail";
import { cn } from "@/lib/utils";

export default function MobileNav({ session, isOpen, onClose, onSignOut }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg z-50 p-4">
        {session ? (
          <>
            {/* User Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex-center">
                <span className="text-base font-medium text-primary">
                  {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-3 pt-4">
              <SendWeeklyEmail user={session.user} />
              <button
                onClick={onSignOut}
                className={cn(
                  "flex items-center justify-center min-w-[155px] gap-2 px-4 py-2.5 rounded-lg",
                  "text-rose-400 bg-rose-500/10 border border-rose-500/20",
                  "hover:bg-rose-500/20 transition-all text-sm font-medium"
                )}
              >
                <LogOutIcon className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            onClick={onClose}
            className="block py-3 text-lg text-secondary-foreground hover:text-foreground"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
}
