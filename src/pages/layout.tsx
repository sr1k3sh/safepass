import { Toaster } from "@/components/ui/toaster";
import { createContext, useEffect, useState } from "react";
import { RecoilRoot } from "recoil"
interface RootLayoutProps {
  children: React.ReactNode
}

export const AppProvider = createContext({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => { }
})

export default function RootLayout({ children }: RootLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    setMounted(true);
  }, []);


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
  }, [])

  if (!mounted) return <></>;

  return (
    <RecoilRoot>
      <AppProvider.Provider value={{ isMobile, setIsMobile }}>
        {children}
        <Toaster />
      </AppProvider.Provider>
    </RecoilRoot>
  )
}
