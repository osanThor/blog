import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
}
