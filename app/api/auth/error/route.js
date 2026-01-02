import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error") || "unknown";

  redirect(`/auth-error?error=${error}`);
}