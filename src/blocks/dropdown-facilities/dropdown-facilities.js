$('.dropdown-facilities__container').each(function(){
$(this).find(".dropdown-facilities__input").after( '<button class="dropdown-facilities__expand-button", type="button", formaction="#"><i class="material-icons dropdown_arrow">expand_more</i></button>');

$(this).find(".dropdown-facilities__expand-button, .dropdown-facilities__input").click(function(){
    $(this).parent().find(".dropdown-facilities__list").toggleClass('dropdown-facilities__list_hidden');
    $(this).parent().find(".dropdown-facilities__expand-button").toggleClass("dropdown-facilities__close-icon");
});

$(this).find(".dropdown-facilities__list .counter").htmlNumberSpinner();

$(this).find('.dropdown__counter4 .decrementer, .dropdown__counter5 .decrementer, .dropdown__counter6 .decrementer').addClass("decrementer_disabled");

$(this).find('.incrementer, .decrementer').click(function(){
        let counter4 = $(this).parent().parent().parent().find(".dropdown__counter4 .number-input");
        let counter5 = $(this).parent().parent().parent().find(".dropdown__counter5 .number-input");
        let counter6 = $(this).parent().parent().parent().find(".dropdown__counter6 .number-input");
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
        
            $(this).parent().parent().parent().parent().find(".dropdown-facilities__input").val(InputTextFacilities);

        if (Number(counter4.val())>=1){$(this).parent().parent().parent().find('.dropdown__counter4 .decrementer').removeClass("decrementer_disabled");}
            else {$(this).parent().parent().parent().find('.dropdown__counter4 .decrementer').addClass("decrementer_disabled");}
        if (Number(counter5.val())>=1){$(this).parent().parent().parent().find('.dropdown__counter5 .decrementer').removeClass("decrementer_disabled");}
            else {$(this).parent().parent().parent().find('.dropdown__counter5 .decrementer').addClass("decrementer_disabled");}
        if (Number(counter6.val())>=1){$(this).parent().parent().parent().find('.dropdown__counter6 .decrementer').removeClass("decrementer_disabled");}    
            else {$(this).parent().parent().parent().find('.dropdown__counter6 .decrementer').addClass("decrementer_disabled");}
    });
});

$(function(){
    $(document).click(function(event) {
      if ($(event.target).closest(".dropdown-facilities__expand-button, .dropdown-facilities__input, .dropdown-facilities__list").length) return;
      $(".dropdown-facilities__list").addClass('dropdown-facilities__list_hidden');
        $(".dropdown-facilities__expand-button").removeClass("dropdown-facilities__close-icon");
      event.stopPropagation();
    });
  });

