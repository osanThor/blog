"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

export default function Slider({}: Props) {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={30}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  );
}
