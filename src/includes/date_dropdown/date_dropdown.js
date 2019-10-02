    
$('#start_one').datepicker({ 
    onSelect: function (fd, d, picker) { 
      $("#start_one").val(fd.split("-")[0]);
      $("#end_one").val(fd.split("-")[1]);
      
    },
    clearButton: true,
    autoClose: false,
    inline: false,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
       
  });
 
  $("#start_one").click(function(){
        $(".open_icon").toggleClass("close_icon");
});

$( '<i class="material-icons date_dropdown_arrow">expand_more</i>' ).insertAfter( ".text-field__form_narrow" );
 