
$('.dropdown-guests__input').after( '<button class="dropdown-guests__expand-button", type="button", formaction="#"><i class="material-icons dropdown-guests_arrow">expand_more</i></button>' );

$(".dropdown-guests__expand-button, .dropdown-guests__input").click(function(){
    $(".dropdown-guests__list").toggleClass('dropdown-guests__list_hidden');
    $(".dropdown-guests__expand-button").toggleClass("dropdown-guests__close-icon");
});

$(".dropdown-guests__list .counter").htmlNumberSpinner();

$('.dropdown__counter1 .decrementer, .dropdown__counter2 .decrementer, .dropdown__counter3 .decrementer').addClass("decrementer_disabled");

$('.incrementer, .decrementer').click(function(){
    let counter1 = $(".dropdown__counter1 .number-input");
    let counter2 = $(".dropdown__counter2 .number-input");
    let counter3 = $(".dropdown__counter3 .number-input");
    let GuestsNumber = Number(counter1.val()) + Number(counter2.val()) + Number(counter3.val());
    let Guest = '';
    let InputText = '';

        if (GuestsNumber==1) {Guest=' гость';}
            else if (GuestsNumber>=2 && GuestsNumber<=4){Guest=' гостя';}
            else if (GuestsNumber>=5){Guest=' гостей';}
            else if (GuestsNumber==0){Guest='Выберите кол-во гостей'; GuestsNumber=''}
        
        InputText = GuestsNumber + Guest;
    
        $(".dropdown-guests__input").val(InputText);
        
        if (Number(counter1.val())>=1){$('.dropdown__counter1 .decrementer').removeClass("decrementer_disabled");}
            else {$('.dropdown__counter1 .decrementer').addClass("decrementer_disabled");}
        if (Number(counter2.val())>=1){$('.dropdown__counter2 .decrementer').removeClass("decrementer_disabled");}
            else {$('.dropdown__counter2 .decrementer').addClass("decrementer_disabled");}
        if (Number(counter3.val())>=1){$('.dropdown__counter3 .decrementer').removeClass("decrementer_disabled");}    
            else {$('.dropdown__counter3 .decrementer').addClass("decrementer_disabled");}

        if(GuestsNumber>0) {
            $('.dropdown__button_clear').removeClass("invisible");
        }
        else if (GuestsNumber<1) {
            $('.dropdown__button_clear').addClass("invisible");
        }
});

$('.dropdown__button_apply').click(function(){
    $(".dropdown-guests__list").toggleClass('dropdown-guests__list_hidden');
    $(".dropdown-guests__expand-button").toggleClass("dropdown-guests__close-icon"); 
});

$('.dropdown__button_clear').click(function(){
    $(".dropdown-guests__input").val("Сколько гостей");
    $(".dropdown__counter1 .number-input").val(0);
    $(".dropdown__counter2 .number-input").val(0);
    $(".dropdown__counter3 .number-input").val(0);
    $('.dropdown__button_clear').addClass("invisible");
    $('.dropdown__counter1 .decrementer, .dropdown__counter2 .decrementer, .dropdown__counter3 .decrementer').addClass("decrementer_disabled");
});    




