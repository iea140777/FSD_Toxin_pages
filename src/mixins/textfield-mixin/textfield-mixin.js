$(function() {
    $(".input_date").mask("99.99.9999")
  });

$( '<button class="input__button", type="button", formaction="#"><i class="material-icons input__arrow-forward">arrow_forward</i></button>' ).insertAfter(".input_arrow");

$( '<button class="input__button", type="button", formaction="#"><i class="material-icons input__open-icon">expand_more</i></button>' ).insertAfter(".input_open-icon");


$('.input__open-icon').click(function(){
    $.this.toggleClass("input__close-icon");
});