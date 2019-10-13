$( '<button class="dropdown_expand_button", type="button", formaction="#"><i class="material-icons dropdown_arrow">expand_more</i></button>' ).insertAfter(".dropdown_input");

$(".dropdown_expand_button").click(function(){
    $(".dropdown_list").toggle();
    $(".dropdown_expand_button").toggleClass("close_icon");
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

$(document).ready(
$(function(){
var counter1 = $("#counter1 .number-input");
var counter2 = $("#counter2 .number-input");
var counter3 = $("#counter3 .number-input");
console.log(typeof counter3);
var InputText = counter1.val() + counter2.val() + counter3.val() + " гостей";
console.log(InputText);
$(".dropdown_input").val(InputText);
}),
)