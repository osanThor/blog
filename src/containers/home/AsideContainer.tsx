"use client";

import Img from "@/components/common/Img";
import SmallTitle from "@/components/common/SmallTitle";
import SocialLinks from "@/components/common/SocialLinks";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

export default function AsideContainer() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    async () => {
      if (ref.current)
        await transformVisible(
          Array.from(ref.current.children),
          null,
          "left",
          0.2
        );
    },
    { scope: ref }
  );
  return (
    <div className="w-full md:max-w-[320px] md:w-2/6 flex flex-col gap-10">
      <aside
        ref={ref}
        className="w-full sticky top-[90px] left-0 flex flex-col"
      >
        <SmallTitle text="About Me" />
        <div className="w-full flex flex-col items-center mb-10 opacity-0">
          <div className="max-w-[calc(100%-32px)] lg:max-w-[calc(100%-60px)] rounded-full overflow-hidden">
            <video autoPlay loop muted playsInline>
              <source src="/videos/aside.webm" type="video/webm" />
              <source src="/videos/aside.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <p className="text-center break-keep mb-2">
          프론트엔드 개발자 이준영입니다.
          <br />
          개발자로서 항상 도전과 성장의 기회를 찾고 있습니다.
        </p>
        <div className="text-center mb-4 z-[9]">
          <Link href={"/resume"} className="font-medium hover:underline  z-[9]">
            더보기
          </Link>
        </div>
        <div className="w-full hidden md:block">
          <SocialLinks />
        </div>
      </aside>
    </div>
  );
}
