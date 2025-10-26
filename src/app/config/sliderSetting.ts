const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  swipeToSlide: true,
  autoplaySpeed: 2000,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

export default sliderSettings;
