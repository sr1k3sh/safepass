import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { createContext, use, useEffect, useState } from "react"

export const AppProvider = createContext({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => {}
})

export default function App({
   Component,
     pageProps: { session, ...pageProps },
 }: AppProps<{ session: Session }>) {

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })
  },[])

  return (
     <SessionProvider session={session}>
        <AppProvider.Provider value={{ isMobile, setIsMobile }}>
          <Component {...pageProps} />
        </AppProvider.Provider>
     </SessionProvider>
   )
 }