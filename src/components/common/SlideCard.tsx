"use client";
import { PropsWithChildren } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import Link from "next/link";
import Img from "./Img";
import { Post } from "#site/content";

type Props = {
  list: Post[];
} & PropsWithChildren;

export default function SlideCard({ list }: Props) {
  return (
    <Swiper
      grabCursor={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[EffectCreative]}
      loop={true}
      className="mySwiper"
    >
      {list.map((item) => (
        <SwiperSlide key={`slide-card-${item.title}`}>
          <Link
            href={`/post/${item.category}/${item.href}`}
            className="flex transition-all gap-7 items-start rounded-xl h-screen max-h-[300px] md:max-h-[400px] lg:max-h-[480px] group relative overflow-hidden"
          >
            <div className="overflow-hidden w-full h-full rounded-xl mb-2 relative flex items-center justify-center">
              <Img
                className="object-cover w-full group-hover:scale-[1.1] transition-all duration-200"
                src={item.cover}
                alt={`cover-of-${item.title}`}
                fill
                sizes={"720px"}
                priority
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
