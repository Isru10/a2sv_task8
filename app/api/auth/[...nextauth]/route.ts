import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
/* eslint-disable @typescript-eslint/no-explicit-any */

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {

          const errorData = await res.json();
          throw new Error(errorData.message || 'Invalid credentials');
        }

        const responseData = await res.json();
        const user = responseData.data;
        if (user) {
          return { ...user, accessToken: responseData.token };
        } else {
          return null;
        }
      }
    })
  ],
  
  callbacks: {

    async jwt({ token, user, account }) {
      if (account && user) {
      if(account.provider === 'google'){
            token.provider = 'google';

        }


        if(account.provider === 'credentials'){
            token.accessToken = (user as any).accessToken;
            token.id = (user as any).id;
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      if(token.accessToken){
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },

  pages: {
    signIn: '/auth/signin',

  },
});

export { handler as GET, handler as POST };