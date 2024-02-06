import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toaster";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark">
        <Main />
        <NextScript />
        <Toaster/>
      </body>
    </Html>
  );
}
