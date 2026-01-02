import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage({ searchParams }) {
  const error = searchParams?.error;

  const errorMessages = {
    User_not_authorized: {
      title: "Access Denied",
      message: "You are not authorized to access this application.",
    },
    default: {
      title: "Authentication Error",
      message: "Something went wrong during sign-in. Please try again.",
    },
  };

  const { title, message } = errorMessages[error] || errorMessages.default;

  return (
    <main className="min-h-safe flex-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold mb-3">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        {error && (
          <p className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-md font-mono">
            Error code: {error}
          </p>
        )}

        <div className="flex-center gap-4">
          <Link href="/login">
            <Button variant="outline">Try Again</Button>
          </Link>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
