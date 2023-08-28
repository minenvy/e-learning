import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByUsername } from '@/app/lib/actions/user.actions'
import bcrypt from 'bcrypt'

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
        const user = await getUserByUsername(credentials?.username as string)

        if (
          !user ||
          !(await bcrypt.compare(
            credentials?.password as string,
            user?.password as string
          ))
        )
          return null

        return user as any
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
}
