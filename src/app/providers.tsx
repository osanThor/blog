"use client";

import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

type Props = {
  children: React.ReactNode;
};
export default function Providers({ children }: Props) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <Suspense fallback={null}>
        <GoogleAnalytics GID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
      </Suspense>
    </>
  );
}
