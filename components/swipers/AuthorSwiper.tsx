import type { NextComponentType, NextPageContext } from "next";
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "./SwiperContainer";
import SwiperConfig from "./SwiperConfig";
import AuthorCard from "@components/authors/AuthorCard";
import Artist from "@models/artist";
import Band from "@models/band";

interface Props {
  authors: Artist[] | Band[];
  authorType: "artist" | "band";
}

const AuthorSwiper: NextComponentType<NextPageContext, {}, Props> = ({ authors, authorType }: Props) => {
  const config: SwiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1.3,
    loop: false,
    grabCursor: true,
    autoplay: {
      delay: 7500,
    },
    breakpoints: {
      440: {
        slidesPerView: 1.7,
      },
      640: {
        slidesPerView: 2.3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 3.3,
        spaceBetween: 30,
      },
      1600: {
        slidesPerView: 3.7,
        spaceBetween: 50,
      },
    },
  };

  return (
    <SwiperContainer config={config}>
      {authors.map((author) => (
        <SwiperSlide key={author.id}>
          <AuthorCard author={author} authorType={authorType} />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};

export default AuthorSwiper;
