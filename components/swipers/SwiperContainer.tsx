import type { NextComponentType, NextPageContext } from "next";
import { ReactNode, useRef } from "react";

import { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperConfig from "./SwiperConfig";

interface Props {
  children: ReactNode;
  config: SwiperConfig;
}

const SwiperContainer: NextComponentType<NextPageContext, {}, Props> = ({ config, children }: Props) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={config.spaceBetween}
      slidesPerView={config.slidesPerView}
      autoplay={config.autoplay}
      loop={config.loop}
      grabCursor={config.grabCursor}
      breakpoints={config.breakpoints}
      navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
      className="w-full"
    >
      {children}
      <div className="swiper-button-prev ml-2 !z-20 select-none">
        <span className="material-symbols-outlined !text-5xl md:!text-6xl text-primary-accent" style={{ textShadow: "0 0 20px rgba(0,0,0,0.25)" }}>
          navigate_before
        </span>
      </div>
      <div className="swiper-button-next mr-2 !z-20 select-none">
        <span className="material-symbols-outlined !text-5xl md:!text-6xl text-primary-accent">navigate_next</span>
      </div>

      <div
        className="absolute top-0 bottom-0 right-0 w-16 md:w-36 z-10 rotate-180 pointer-events-none"
        style={{ background: "linear-gradient(270deg, rgba(27, 28, 34, 0) 0%, #1B1C22 100%)" }}
      ></div>
    </Swiper>
  );
};

export default SwiperContainer;
