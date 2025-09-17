import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { pretendard } from "./fonts";
import HeaderContainer from "@/containers/common/HeaderContainer";
import FooterContainer from "@/containers/common/FooterContainer";
import { getMetadata } from "@/utils/getMetadata";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <GoogleTagManager gtmId={process.env.GOOGLE_GT || ""} />
      <GoogleAnalytics gaId={process.env.GOOGLE_GA || ""} />
      <body
        className={`${pretendard.variable} antialiased relative`}
        suppressHydrationWarning
      >
        <Providers>
          <HeaderContainer />
          <main
            id="container"
            className="py-10 flex min-h-screen w-full flex-col items-center relative bg-white dark:bg-neutral-950 transition-colors duration-200"
          >
            <div className="w-[calc(100%-32px)] max-w-[1082px] flex flex-col">
              {children}
            </div>
          </main>
          <FooterContainer />
        </Providers>
      </body>
    </html>
  );
}
