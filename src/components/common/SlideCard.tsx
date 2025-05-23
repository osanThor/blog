"use client";
import { PropsWithChildren, useMemo } from "react";
import { EffectCreative } from "swiper/modules";
import Link from "next/link";
import { Post } from "#site/content";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Img from "@/components/common/Img";

type Props = {
  list: Post[];
} & PropsWithChildren;

export default function SlideCard({ list }: Props) {
  const creativeEffect = useMemo(
    () => ({
      prev: { shadow: true, translate: [0, 0, -400] },
      next: { translate: ["100%", 0, 0] },
    }),
    []
  );

  return (
    <Swiper
      grabCursor={true}
      effect={"creative"}
      creativeEffect={creativeEffect}
      modules={[EffectCreative]}
      loop={true}
      className="mySwiper"
    >
      {list.map((item, idx) => (
        <SwiperSlide key={`slide-card-${item.title}`}>
          <Link
            href={`/post/${item.category}/${item.href}`}
            className="flex transition-all gap-7 items-start rounded-xl  group relative overflow-hidden"
          >
            <div className="overflow-hidden w-full h-full rounded-xl relative flex items-center justify-center">
              <Img
                className="object-cover aspect-[5/3] group-hover:scale-[1.1] transition-all duration-200"
                src={item.cover}
                alt={`cover-of-${item.title}`}
                width={720}
                height={400}
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL={item.blurDataURL}
              />
            </div>
            <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 overflow-hidden bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 px-10 py-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h2>
              <p className="text-neutral-100 text-lg mb-2">
                {item.description}
              </p>
              <span className="text-sm font-medium text-neutral-400">
                {item.date}
              </span>
              <span className="flex-grow" />
              <div className="w-full flex justify-end gap-2">
                {item.tags.map((tag) => (
                  <span
                    className="inline-block text-white font-semibold bg-yellow-500 py-1 px-4 rounded-2xl"
                    key={`slide-${item.title}-tag-${tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
