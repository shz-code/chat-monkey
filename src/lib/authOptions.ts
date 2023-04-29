import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "./db";

// Get google credentials from env file
const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID || null;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || null;

  if (!clientId || !clientSecret) throw new Error("Missing Google Credentials");

  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    // Custom signIn page
    signIn: "/login",
  },
  providers: [
    // Use google authentication
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Embed user.id to token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // Set user session data
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      // Redirect on session modification
      return "/dashboard";
    },
  },
};
