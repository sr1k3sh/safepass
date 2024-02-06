import { Toaster } from "@/components/ui/toaster";
import { Lato } from "next/font/google";
const lato = Lato({ subsets: ["latin"] , weight: ["100","300","400","700","900"]});

export default function RootLayout({
  children,
  themeMode='light',
}: Readonly<{
  children: React.ReactNode;
  themeMode?: string;
}>) {
  return (
      <>
        <main className={`${lato.className} ${themeMode}`}>{children}</main>
        <Toaster/>
      </>
  );
}
