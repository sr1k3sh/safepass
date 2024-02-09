import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toaster";
// import { useContext } from "react";
// import { AppProvider } from "./_app";


export default function Document() {
  // const { isMobile } = useContext(AppProvider)
  return (
    <Html lang="en">
      <Head />
      <body className="dark">
        <Main />
        <Toaster />
      </body>
      <NextScript />
    </Html>
  );
}
