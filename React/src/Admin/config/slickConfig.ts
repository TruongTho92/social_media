export const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  className: "slider variable-width",
  //   nextArrow: <i className="bi bi-arrow-right-short">123</i>,
  //   prevArrow: <i className="bi bi-arrow-left-short"></i>,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 769,
      settings: {
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
