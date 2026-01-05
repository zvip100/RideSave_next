import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { cache } from "react";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Helper to check user in DB
async function checkUserInDb(email) {
  if (!email) return null;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0] || null;
}

export const auth = betterAuth({
  // Stateless session management
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      strategy: "jwt",
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // This runs BEFORE user is created - can add fields!
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const dbUser = await checkUserInDb(user.email);

          if (!dbUser) {
            throw new APIError("FORBIDDEN", {
              message: "User not authorized",
            });
          }

          return {
            data: {
              ...user,
              dbId: dbUser.id,
              name: dbUser.name,
              unit: dbUser.unit,
            },
          };
        },
      },
    },
  },

  user: {
    additionalFields: {
      dbId: { type: "number", required: false },
      unit: { type: "string", required: false },
    },
  },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: headers(),
  });
});