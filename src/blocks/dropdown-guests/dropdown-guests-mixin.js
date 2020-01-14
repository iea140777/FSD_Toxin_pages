
$('.dropdown-guests__input').after( '<button class="dropdown-guests__expand-button", type="button", formaction="#"><i class="material-icons dropdown-guests_arrow">expand_more</i></button>' );

$(".dropdown-guests__expand-button, .dropdown-guests__input").click(function(){
    $(".dropdown-guests__list").toggle();
    $(".dropdown-guests__expand-button").toggleClass("dropdown-guests__close-icon");
});

$(".counter").htmlNumberSpinner();

$('.dropdown__counter1 .decrementer, .dropdown__counter2 .decrementer, .dropdown__counter3 .decrementer').addClass("decrementer___disabled");

$('.incrementer, .decrementer').click(function(){
    let counter4 = $(".dropdown__counter1 .number-input");
    let counter5 = $(".dropdown__counter2 .number-input");
    let counter6 = $(".dropdown__counter3 .number-input");
    let GuestsNumber = Number(counter4.val()) + Number(counter5.val()) + Number(counter6.val());
    let Guest = '';
    let InputText = '';

        if (GuestsNumber==1) {Guest=' гость';}
            else if (GuestsNumber>=2 && GuestsNumber<=4){Guest=' гостя';}
            else if (GuestsNumber>=5){Guest=' гостей';}
            else if (GuestsNumber==0){Guest='Выберите кол-во гостей'; GuestsNumber=''}
        
        InputText = GuestsNumber + Guest;
    
        $(".dropdown-guests__input").val(InputText);
        
        if (Number(counter4.val())>=1){$('.dropdown__counter1 .decrementer').removeClass("decrementer___disabled");}
            else {$('.dropdown__counter1 .decrementer').addClass("decrementer___disabled");}
        if (Number(counter5.val())>=1){$('.dropdown__counter2 .decrementer').removeClass("decrementer___disabled");}
            else {$('.dropdown__counter2 .decrementer').addClass("decrementer___disabled");}
        if (Number(counter6.val())>=1){$('.dropdown__counter3 .decrementer').removeClass("decrementer___disabled");}    
            else {$('.dropdown__counter3 .decrementer').addClass("decrementer___disabled");}

        if(GuestsNumber>0) {
            $('.dropdown__button_clear').removeClass("invisible");
        }
        else if (GuestsNumber<1) {
            $('.dropdown__button_clear').addClass("invisible");
        }


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
        $('.dropdown__counter1 .decrementer, .dropdown__counter2 .decrementer, .dropdown__counter3 .decrementer').addClass("decrementer___disabled");
    });    




