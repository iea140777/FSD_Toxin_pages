    
$('#start_one').datepicker({ 
    onSelect: function (fd, d, picker) { 
      $("#start_one").val(fd.split("-")[0]);
      $("#end_one").val(fd.split("-")[1]);
    },
    clearButton: true,
    autoClose: false,
    position: "right bottom",
    offset: 0,
    inline: false,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
    position: 'bottom left',
    navTitles: {
      days: 'MM <i>yyyy</i>',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
  }, 
});
  

$( '<i class="material-icons date_dropdown_arrow">expand_more</i>' ).insertAfter( ".text-field__form_narrow" );

$('.datepicker--buttons').append('<span class="datepicker--button -apply">Применить</span>');
 


    // var template = '' +
    //     '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' +
    //     '<div class="datepicker--nav-title">#{title}</div>' +
    //     '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
    //     buttonsContainerTemplate = '<div class="datepicker--buttons"></div>',
    //     button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>' +
    //     button = '<span class="datepicker--button -apply">Применить</span>',
    //     datepicker = $.fn.datepicker,
    //     dp = datepicker.Constructor,

 
  //   $("#start_one").click(function(){
  //         $(".date_dropdown_arrow").toggleClass("close_icon");
  // });