import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { addUserFromGoogle, getUserByUsername } from '@/app/lib/actions/user.actions'
import * as bcrypt from 'bcrypt'
import User from '@/app/interfaces/user'

type GoogleUser = {
  name: string
  email: string
  image: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials === undefined) return null

        const user = await getUserByUsername(credentials.username)

        if (
          user === null ||
          !(await bcrypt.compare(credentials.password, user.password as string))
        )
          return null

        return user as any
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        const { name, email, image } = user as GoogleUser
        const username = email

        const userInfo = await getUserByUsername(username)

        if (userInfo === null) {
          await addUserFromGoogle({ name, username, image })
        }
      }

      return Promise.resolve(true)
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.name = user.name
        token.username = user.username
        token.password = user?.password
        token.image = user?.image
        token.onboarding = user.onboarding
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.name = token.name
      session.user.username = token.username
      session.user.password = token?.password
      session.user.image = token?.image
      session.user.onboarding = token.onboarding

      return session
    }
  },
  pages: {
    signIn: '/auth/sign-in',
  },
}
