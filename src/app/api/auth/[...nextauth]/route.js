// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import connectDb from "@/lib/connectDB"
// export const authOptions = {
//     secret: process.env.NEXT_PUBLIC_SECRET,
//     session: {
//         strategy: "jwt",
//     },
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     // Configure one or more authentication providers
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: { label: 'Email', type: 'email', placeholder: 'type your email' },
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: { label: "Password", type: "password", placeholder: 'Enter your password' }
//             },

//             async authorize(credentials, req) {
//                 const { email, password } = credentials
//                 const db = await connectDb()
//                 let currentUser = await db.collection('users').findOne({ email })
//                 if (!credentials) {
//                     return null
//                 }

//                 if (currentUser && currentUser.password === password) {
//                     return currentUser
//                 }

//                 return null
//             },




//         }),
//         GithubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),


//         // ...add more providers here
//     ],

//     callbacks: {
//         async jwt({ token, account, user }) {
//             // Persist the OAuth access_token and or the user id to the token right after signin
//             if (account) {
//                 token.type = user.type
//                 //   token.id = profile.id
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.type = token.type
//             return session;
//         },

//     }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }













import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/lib/connectDB";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "type your email" },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const db = await connectDb();
        let currentUser = await db.collection("users").findOne({ email });

        if (!credentials || !currentUser || currentUser.password !== password) {
          return null;
        }

        return currentUser;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.type = user?.type;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.type = token.type;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
