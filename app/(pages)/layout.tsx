import '@/app/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/app/providers/NextAuthProvider'
import StyledComponentsRegistry from '@/app/providers/StyledComponentsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Learning',
  description: 'Learning English Yourself!',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <NextAuthProvider>{children}</NextAuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
