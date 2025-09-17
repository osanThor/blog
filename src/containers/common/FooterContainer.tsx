"use client";

import SocialLinks from "@/components/common/SocialLinks";

export default function FooterContainer() {
  return (
    <footer className="w-full transition-colors duration-200 px-4 lg:px-5 py-4  flex justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <div className="w-full max-w-[1082px] flex flex-col md:flex-row justify-center items-center gap-4">
        <SocialLinks pos="top" />
        <div className="flex justify-center items-center text-sm">
          © {new Date().getFullYear()}. Given all rights reserved.
        </div>
      </div>
    </footer>
  );
}
