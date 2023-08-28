export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/general', '/notebook', '/video', '/word', '/writing']
}
