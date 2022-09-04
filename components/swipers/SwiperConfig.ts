export default interface SwiperConfig {
  spaceBetween: number;
  slidesPerView: number;
  loop?: boolean;
  grabCursor?: boolean;
  autoplay?: {
    delay?: number;
  };
  breakpoints?: any;
}
