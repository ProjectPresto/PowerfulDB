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
        className="absolute top-0 bottom-0 right-0 w-16 md:w-36 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsla(231, 11%, 12%, 0) 0%, hsla(231, 11%, 12%, 0.013) 8.1%, hsla(231, 11%, 12%, 0.049) 15.5%, hsla(231, 11%, 12%, 0.104) 22.5%, hsla(231, 11%, 12%, 0.175) 29%, hsla(231, 11%, 12%, 0.259) 35.3%, hsla(231, 11%, 12%, 0.352) 41.2%, hsla(231, 11%, 12%, 0.45) 47.1%, hsla(231, 11%, 12%, 0.55) 52.9%, hsla(231, 11%, 12%, 0.648) 58.8%, hsla(231, 11%, 12%, 0.741) 64.7%, hsla(231, 11%, 12%, 0.825) 71%, hsla(231, 11%, 12%, 0.896) 77.5%, hsla(231, 11%, 12%, 0.951) 84.5%, hsla(231, 11%, 12%, 0.987) 91.9%, hsl(231, 11%, 12%) 100%)",
        }}
      ></div>
    </Swiper>
  );
};

export default SwiperContainer;
