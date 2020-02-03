
$(".exp-checkbox__title__container").click(function(){
    $(this).parent().find(".exp-checkbox__list").toggle();
    $(this).find(".exp-checkbox__open-icon").toggleClass("exp-checkbox__close-icon");
});

