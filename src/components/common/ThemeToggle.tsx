"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button>기둘</button>;
  }
  if (resolvedTheme === "dark")
    return <button onClick={() => setTheme("light")}>해</button>;
  if (resolvedTheme === "light")
    return <button onClick={() => setTheme("dark")}>달</button>;
}
