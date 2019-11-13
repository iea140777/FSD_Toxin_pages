$( '<button class="dropdown2__expand-button", type="button", formaction="#"><i class="material-icons dropdown_arrow">expand_more</i></button>' ).insertAfter(".dropdown2__input");

$(".dropdown2__expand-button").click(function(){
    $(".dropdown2__list").toggle();
    $(".dropdown2__expand-button").toggleClass("dropdown2__close-icon");
});

$(function(){
    $("#counter1").htmlNumberSpinner();
    $("#counter2").htmlNumberSpinner(); 
    $("#counter3").htmlNumberSpinner(); 
    
    $('.incrementer, .decrementer').click(function(){
          var counter1 = $("#counter1 .number-input");
          var counter2 = $("#counter2 .number-input");
          var counter3 = $("#counter3 .number-input");
          var Bedroom = '';
          var Bed = '';
          var Bathroom = '';
                    
          if (Number(counter1.val())==1) {var Bedroom =' спальня, ';}
              else if (Number(counter1.val())>=2 && Number(counter1.val())<=4){var Bedroom =' спальни, ';}
              else if (Number(counter1.val())==0 || Number(counter1.val())>=5){var Bedroom =' спален, ';}
          if  (Number(counter2.val())==1) {var Bed =' кровать, ';}
              else if (Number(counter2.val())>=2 && Number(counter2.val())<=4){var Bed =' кровати, ';}
              else if (Number(counter2.val())==0 || Number(counter2.val())>=5){var Bed =' кроватей, ';}
          if  (Number(counter3.val())==1) {var Bathroom =' ванная комната, ';}
              else if (Number(counter3.val())>=2 && Number(counter3.val())<=4){var Bathroom =' ванные комнаты, ';}
              else if (Number(counter3.val())==0 || Number(counter3.val())>=5){var Bathroom =' ванных комнат';}
                  
          var InputTextFacilities = Number(counter1.val()) + Bedroom + Number(counter2.val()) + Bed + Number(counter3.val()) + Bathroom;
         
          $(".dropdown2__input").val(InputTextFacilities);
    });
});


