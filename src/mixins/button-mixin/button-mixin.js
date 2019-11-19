$('<i class="material-icons button__arrow-forward">arrow_forward</i>' ).insertAfter( ".button_arrow" );

$('.button_bordered').hover(
    function(){
      $(this).parent().css("opacity", "0.5");
    },
    function(){
        $(this).parent().css("opacity", "1");
      }
)


