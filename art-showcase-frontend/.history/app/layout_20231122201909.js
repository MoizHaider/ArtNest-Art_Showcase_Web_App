import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Head from "next/head";
import { Providers } from "./GlobalRedux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <body className={inter.className}>
        <Providers>
          
        </Providers>
        <Nav />
        {children}
      </body>
    </html>
  );
}
