$('.form-elements__container2 .form-elements__element-container:nth-of-type(2)').find(".dropdown-guests__list").removeClass('dropdown-guests__list_hidden');
 
$('.form-elements__container2 .form-elements__element-container:nth-of-type(3)').find(".dropdown-guests__list").removeClass('dropdown-guests__list_hidden');

$('.form-elements__container2 .form-elements__element-container:nth-of-type(3)').each(function(){
    $(this).find(".dropdown__counter1 .number-input").val(2);
    $(this).find(".dropdown__counter2 .number-input").val(1);
    $(this).find(".dropdown-guests__input").val('3 гостя');
    $(this).find('.dropdown__counter1 .decrementer').removeClass("decrementer_disabled");
    $(this).find('.dropdown__counter2 .decrementer').removeClass("decrementer_disabled");
    $(this).find('.dropdown__button_clear').removeClass("invisible");
});

$('.form-elements__container2 .form-elements__element-container:nth-of-type(1) .dropdown-facilities__container:nth-of-type(2)').find(".dropdown-facilities__list").removeClass('dropdown-facilities__list_hidden');
$('.form-elements__container2 .form-elements__element-container:nth-of-type(1) .dropdown-facilities__container').each(function(){
    $(this).find('.dropdown__counter4 .number-input').val(2);
    $(this).find('.dropdown__counter5 .number-input').val(2);
    $(this).find('.dropdown__counter4 .decrementer').removeClass("decrementer_disabled");
    $(this).find('.dropdown__counter5 .decrementer').removeClass("decrementer_disabled");
    $(this).find(".dropdown-facilities__input").val('2 спальни, 2 кровати...');
});

