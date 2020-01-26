$( '<i class="material-icons date-dropdown__arrow">expand_more</i>' ).insertAfter(".date-dropdown__input");

//- for Datepicker plugin script should be added on the page: script(src="../../src/blocks/datepicker/air-datepicker/dist/js/datepicker.min.js")
$('.date-dropdown__input').datepicker({ 
    onSelect: function (fd, d, picker) { 
      $("#start_one").val(fd.split("-")[0]);
      $("#end_one").val(fd.split("-")[1]);
    },
    clearButton: true,
    autoClose: false,
    showEvent: '',
    position: "right bottom",
    offset: 5,
    inline: false,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
    position: 'bottom left',
    navTitles: {
      days: 'MM <i>yyyy</i>',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2',
    },
    
});

$('.datepicker--buttons').append('<span class="datepicker--button -apply">Применить</span>');

$('.date-dropdown__input').click(function(){
  $('.date-dropdown__input').data('datepicker').show();
});


$('.datepicker--button.-apply').click(function(){
  $('.date-dropdown__input').data('datepicker').hide();
});

