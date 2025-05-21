// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await axios.post(`${baseURL}/auth/login`, {
//             username: credentials?.username,
//             password: credentials?.password,
//           });

//           const user = res.data;

//           if (user && user.accessToken && user.refreshToken) {
//             return {
//               ...user,
//               id: user.userId || user.id || "user",
//             };
//           }
//           return null;
//         } catch (err) {
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60, // 1 hour session max age (adjust as needed)
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   callbacks: {
//     // Store tokens in JWT token
//     async jwt({ token, user, account }) {
//       // First time sign in
//       if (user) {
//         return {
//           ...token,
//           accessToken: user.accessToken,
//           refreshToken: user.refreshToken,
//           accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour expiry
//         };
//       }

//       // Return previous token if access token not expired yet
//       if (Date.now() < (token.accessTokenExpires ?? 0)) {
//         return token;
//       }

//       // Access token expired, try to refresh it
//       return await refreshAccessToken(token);
//     },
//     // Make tokens accessible in session object
//     async session({ session, token }) {
//       session.user = session.user || {};
//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;
//       session.error = token.error;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// });

// // Refresh token function
// async function refreshAccessToken(token: any) {
//   try {
//     const response = await axios.post(`${baseURL}/auth/token/refresh`, {
//       refreshToken: token.refreshToken,
//     });

//     const refreshedTokens = response.data;

//     return {
//       ...token,
//       accessToken: refreshedTokens.accessToken,
//       refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // fallback if no new refreshToken
//       accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour expiry (adjust based on your token)
//     };
//   } catch (error) {
//     console.error("Refresh token error", error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }
