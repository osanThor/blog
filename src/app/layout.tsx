import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { pretendard } from "./fonts";
import HeaderContainer from "@/containers/common/HeaderContainer";
import FooterContainer from "@/containers/common/FooterContainer";
import { getMetadata } from "@/utils/getMetadata";

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pretendard.variable} antialiased relative `}>
        <Providers>
          <HeaderContainer />
          <main
            id="container"
            className="py-10 flex min-h-screen w-full flex-col items-center relative bg-white dark:bg-neutral-800 transition-colors duration-200"
          >
            <section className="w-[calc(100%-32px)] max-w-[1082px] flex flex-col">
              {children}
            </section>
          </main>
          <FooterContainer />
        </Providers>
      </body>
    </html>
  );
}
