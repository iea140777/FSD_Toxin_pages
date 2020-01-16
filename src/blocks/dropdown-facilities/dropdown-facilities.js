$( '<button class="dropdown-facilities__expand-button", type="button", formaction="#"><i class="material-icons dropdown_arrow">expand_more</i></button>' ).insertAfter(".dropdown-facilities__input");

$(".dropdown-facilities__expand-button, .dropdown-facilities__input").click(function(){
    $(".dropdown-facilities__list").toggleClass('dropdown-facilities__list_hidden');
    $(".dropdown-facilities__expand-button").toggleClass("dropdown-facilities__close-icon");
});

$(".dropdown-facilities__list .counter").htmlNumberSpinner();

$('.dropdown__counter4 .decrementer, .dropdown__counter5 .decrementer, .dropdown__counter6 .decrementer').addClass("decrementer_disabled");

$(function(){
    $('.incrementer, .decrementer').click(function(){
        let counter4 = $(".dropdown__counter4 .number-input");
        let counter5 = $(".dropdown__counter5 .number-input");
        let counter6 = $(".dropdown__counter6 .number-input");
        let Bedroom = '';
        let Bed = '';
        let Bathroom = '';
        let InputTextFacilities = '';
                    
        if (Number(counter4.val())==1) {Bedroom =' спальня, ';}
            else if (Number(counter4.val())>=2 && Number(counter4.val())<=4){Bedroom =' спальни, ';}
            else if (Number(counter4.val())==0 || Number(counter4.val())>=5){Bedroom =' спален, ';}
        if  (Number(counter5.val())==1) {Bed =' кровать, ';}
            else if (Number(counter5.val())>=2 && Number(counter5.val())<=4){Bed =' кровати, ';}
            else if (Number(counter5.val())==0 || Number(counter5.val())>=5){Bed =' кроватей, ';}
        if  (Number(counter6.val())==1) {Bathroom =' ванная комната, ';}
            else if (Number(counter6.val())>=2 && Number(counter6.val())<=4){Bathroom =' ванные комнаты, ';}
            else if (Number(counter6.val())==0 || Number(counter6.val())>=5){Bathroom =' ванных комнат';}
        
        if (Number(counter4.val())===0 && Number(counter5.val())===0 && Number(counter6.val())===0) 
            {InputTextFacilities = 'Выберите удобства';}
            else {InputTextFacilities = Number(counter4.val()) + Bedroom + Number(counter5.val()) + Bed + Number(counter6.val()) + Bathroom;}
        
        $(".dropdown-facilities__input").val(InputTextFacilities);

        if (Number(counter4.val())>=1){$('.dropdown__counter4 .decrementer').removeClass("decrementer_disabled");}
            else {$('.dropdown__counter4 .decrementer').addClass("decrementer_disabled");}
        if (Number(counter5.val())>=1){$('.dropdown__counter5 .decrementer').removeClass("decrementer_disabled");}
            else {$('.dropdown__counter5 .decrementer').addClass("decrementer_disabled");}
        if (Number(counter6.val())>=1){$('.dropdown__counter6 .decrementer').removeClass("decrementer_disabled");}    
            else {$('.dropdown__counter6 .decrementer').addClass("decrementer_disabled");}
    });
});


