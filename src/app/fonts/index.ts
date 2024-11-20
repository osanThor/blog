import localFont from "next/font/local";
import { Imperial_Script } from "next/font/google";

export const pretendard = localFont({
  src: [
    {
      path: "./Pretendard-Thin.woff2",
      weight: "100",
    },
    {
      path: "./Pretendard-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "./Pretendard-Light.woff2",
      weight: "300",
    },
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
});

export const imperialScript = Imperial_Script({
  weight: "400",
  style: "normal",
  variable: "--font-imperialScript",
});
