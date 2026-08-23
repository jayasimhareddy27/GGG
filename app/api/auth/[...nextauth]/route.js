import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/login";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, user: oauthUser }) {
      try {
        if (!profile?.email) return false;

        await connectToDB();

        // 1. Check if user exists
        let user = await User.findOne({ email: profile.email });

        // 2. IF USER IS NEW (SIGNUP LOGIC)
        if (!user) {
          // Create the User
          user = await User.create({
            email: profile.email,
            name: profile.name || profile.given_name || "New User",
            image: profile.picture || null,
          });
        }
        return true;
      } catch (err) {
        console.error("OAuth SignIn Error:", err.message);
        return false;
      }
    },

    async jwt({ token, account }) {
      if (account) {
        await connectToDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
        }
        token.accessToken = account.access_token; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };