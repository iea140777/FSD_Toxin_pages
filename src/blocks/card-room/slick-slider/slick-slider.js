$('.single-item.noArrows').slick({
  infinite: true,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}),

$('.single-item.noArrows').css("z-index", "100"),

$('.single-item').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<i class="material-icons slick-next" aria-label="Next">expand_more</i>',
    prevArrow: '<i class="material-icons slick-prev" aria-label="Previous">expand_more</i>',
  })

  