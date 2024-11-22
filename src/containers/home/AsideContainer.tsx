"use client";

import SmallTitle from "@/components/common/SmallTitle";
import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AsideContainer() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (ref.current)
        transformVisible(Array.from(ref.current.children), null, "left", 0.2);
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
          <div className="max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] rounded-full overflow-hidden">
            <Image
              className="object-cover max-w-full"
              src="/me.png"
              alt="Give's log logo"
              width={320}
              height={82}
              priority
            />
          </div>
        </div>
        <p className="text-center break-keep">
          프론트엔드 개발자 이준영입니다.
          <br />
          개발자로서 항상 도전과 성장의 기회를 찾고 있습니다.
        </p>
        <div className="text-center py-4">
          <Link href={"/resume"} className="font-medium hover:underline">
            더보기
          </Link>
        </div>
      </aside>
    </div>
  );
}
