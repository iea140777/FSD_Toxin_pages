$( '<i class="material-icons dropdown_arrow">expand_more</i>' ).insertAfter(".dropdown_input");

$(".dropdown_input").click(function(){
    $(".dropdown_list").toggle();
});

$(function(){
    $("#counter1").htmlNumberSpinner(); 
});

$(function(){
    $("#counter2").htmlNumberSpinner(); 
});

$(function(){
    $("#counter3").htmlNumberSpinner(); 
});   
  


// $( '<button class="subscription_textfield_button", type="button", formaction="#"><i class="material-icons subscription_textfield_arrow_forward">arrow_forward</i></button>' ).insertAfter( ".subscription_textfield" );
// $( '<i class="material-icons filter_date_dropdown_arrow">expand_more</i>' ).insertAfter( ".filter_date_dropdown_input" );