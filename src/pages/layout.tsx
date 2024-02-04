import { Toaster } from "@/components/ui/toaster";
import { DM_Mono, Inter, Lato, Montserrat } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"] , weight: ["100","300","400","700","900"]});
const mono = Montserrat({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

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
