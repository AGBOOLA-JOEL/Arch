import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { login, refresh } from "@/actions/user-auth";
import type {
  AuthOptions,
  User,
  UserObject,
  AuthValidity,
  BackendAccessJWT,
  BackendJWT,
  DecodedJWT,
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { login, refresh } from "@/_lib/actions/user-auth";

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    // Get a new access token from backend using the refresh token
    const res = await refresh(nextAuthJWTCookie.data.tokens.refreshToken);

    const tokens: BackendJWT = await res.json();

    // const accessToken: BackendAccessJWT = await res.json();
    if (!res.ok)
      throw {
        status: res.status,
        message: "Token refresh failed",
        body: tokens,
      };

    const accessvalid: DecodedJWT = jwtDecode(tokens.accessToken);
    const refreshvalid: DecodedJWT = jwtDecode(tokens.refreshToken);

    // Update the token and validity in the next-auth cookie
    nextAuthJWTCookie.data.validity.valid_until = accessvalid.exp;
    nextAuthJWTCookie.data.tokens.accessToken = tokens.accessToken;

    // Update the token and validity in the next-auth cookie
    nextAuthJWTCookie.data.validity.refresh_until = refreshvalid.exp;
    nextAuthJWTCookie.data.tokens.refreshToken = tokens.refreshToken;

    // Clone the object to ensure it has a new ref id
    return { ...nextAuthJWTCookie };
  } catch (error) {
    console.debug(error);
    return {
      ...nextAuthJWTCookie,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // <- Add this line to redirect to your custom login page
  },
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await login(
            credentials?.username || "",
            credentials?.password || ""
          );
          const tokens: BackendJWT | any = await res.json();
          // if (!res.ok) throw tokens;
          if (!res.ok) {
            // Extract the specific error message from your backend
            const errorMessage =
              tokens?.message ||
              "Wrong username, email or password supplied, please check and try again!";
            throw new Error(errorMessage); // NextAuth will surface this to `result.error`
          }

          const access: DecodedJWT = jwtDecode(tokens.accessToken);
          const refresh: DecodedJWT = jwtDecode(tokens.refreshToken);
          // Extract the user from the access token
          const user: UserObject = {
            username: access.username,
            email: access.email,
            userId: access.userId,
            role: access.role,
          };
          // Extract the auth validity from the tokens
          const validity: AuthValidity = {
            valid_until: access.exp,
            refresh_until: refresh.exp,
          };
          // Return the object that next-auth calls 'User'
          // (which we've defined in next-auth.d.ts)
          return {
            // User object needs to have a string id so use refresh token id
            id: refresh.type,
            tokens: tokens,
            user: user,
            validity: validity,
          } as User;
        } catch (error: any) {
          console.error("Authorize error:", error);
          // Throwing as Error ensures result.error gets populated
          throw new Error(error?.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account }) {
      // Initial signin contains a 'User' object from authorize method
      if (user && account) {
        console.debug("Initial signin");
        return { ...token, data: user };
      }

      // The current access token is still valid
      if (Date.now() < token.data.validity.valid_until * 1000) {
        console.debug("Access token is still valid");
        return token;
      }

      // The refresh token is still valid
      if (Date.now() < token.data.validity.refresh_until * 1000) {
        console.debug("Access token is being refreshed");
        return await refreshAccessToken(token);
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug("Both tokens have expired");
      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token, user }) {
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;

      session.accessToken = token.data.tokens.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
