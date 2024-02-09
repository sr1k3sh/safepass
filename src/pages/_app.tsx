import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import RootLayout from "./layout"

export default function App({
   Component,
     pageProps: { session, ...pageProps },
 }: AppProps<{ session: Session }>) {

  return (
     <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
     </SessionProvider>
   )
 }