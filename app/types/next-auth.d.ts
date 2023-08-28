import NextAuth, { DefaultSession } from "next-auth"

interface DbUser {
  name: string
  username: string
  password?: string
  image?: string
  onboarding: boolean
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: unknown
    user: DbUser & DefaultSession["user"]
  }

  interface User {
    name: string
    username: string
    password?: string
    image?: string
    onboarding: boolean
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name: string
    username: string
    password?: string
    image?: string
    onboarding: boolean
  }
}
