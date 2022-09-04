import type { NextComponentType, NextPageContext } from "next";
import { SwiperSlide } from "swiper/react";

import Album from "../../models/album";
import AlbumCard from "../albums/AlbumCard";
import SwiperConfig from "./SwiperConfig";
import SwiperContainer from "./SwiperContainer";

interface Props {
  albums: Album[];
}

const AlbumSwiper: NextComponentType<NextPageContext, {}, Props> = ({ albums }: Props) => {
  const config: SwiperConfig = {
    slidesPerView: 1.9,
    spaceBetween: 10,
    grabCursor: true,
    autoplay: {
      delay: 7500,
    },
    breakpoints: {
      480: {
        slidesPerView: 2.1,
      },
      640: {
        slidesPerView: 3.3,
      },
      768: {
        slidesPerView: 2.6,
      },
      920: {
        slidesPerView: 3.1,
      },
      1080: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 5.3,
        spaceBetween: 30,
      },
      1600: {
        slidesPerView: 6.6,
        spaceBetween: 40,
      },
    },
  };
  return (
    <SwiperContainer config={config}>
      {albums.map((album) => (
        <SwiperSlide key={album.id}>
          <AlbumCard album={album} />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};

export default AlbumSwiper;
