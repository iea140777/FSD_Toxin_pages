$('.single-item.noArrows').slick({
  infinite: true,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}),

// $('.single-item.noArrows').parent('.card-room__photo-container').$('.card-room__photo-container:before').css("display", "none"),
// $('.single-item.noArrows').parent('.card-room__photo-container:after').css("display", "none"),

$('.single-item').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<i class="material-icons slick-next" aria-label="Next">expand_more</i>',
    prevArrow: '<i class="material-icons slick-prev" aria-label="Previous">expand_more</i>',
  })

  