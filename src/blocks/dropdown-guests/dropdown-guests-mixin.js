
$('.dropdown-guests__input').after( '<button class="dropdown-guests__expand-button", type="button", formaction="#"><i class="material-icons dropdown-guests_arrow">expand_more</i></button>' );

$(".dropdown-guests__expand-button").click(function(){
    $(".dropdown-guests__list").toggle();
    $(".dropdown-guests__expand-button").toggleClass("dropdown-guests__close-icon");
});

$(".counter").htmlNumberSpinner();

$('.incrementer, .decrementer').click(function(){
        var counter4 = $(".dropdown__counter1 .number-input");
        var counter5 = $(".dropdown__counter2 .number-input");
        var counter6 = $(".dropdown__counter3 .number-input");
        var GuestsNumber = Number(counter4.val()) + Number(counter5.val()) + Number(counter6.val());
        console.log(GuestsNumber);
        if (GuestsNumber==1) {var Guest=' гость';}
            else if (GuestsNumber>=2 && GuestsNumber<=4){var Guest=' гостя';}
            else if (GuestsNumber==0 || GuestsNumber>=5){var Guest=' гостей';}
        var InputText = GuestsNumber + Guest;
        console.log(InputText);
        $(".dropdown-guests__input").val(InputText);
        if(GuestsNumber>0) {$('.dropdown__button_clear').removeClass("invisible");}
        else if (GuestsNumber<1) {$('.dropdown__button_clear').addClass("invisible");}
});
$('.dropdown__button_apply').click(function(){
    $(".dropdown-guests__list").toggle();
    $(".dropdown-guests__expand-button").toggleClass("dropdown-guests__close-icon"); 
});

    $('.dropdown__button_clear').click(function(){
        $(".dropdown-guests__input").val("Сколько гостей");
        $(".dropdown__counter1 .number-input").val(0);
        $(".dropdown__counter2 .number-input").val(0);
        $(".dropdown__counter3 .number-input").val(0);
        $('.dropdown__button_clear').addClass("invisible");
    });    




