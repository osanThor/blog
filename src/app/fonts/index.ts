import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "./Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "./Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "./Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "./Pretendard-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "./Pretendard-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
