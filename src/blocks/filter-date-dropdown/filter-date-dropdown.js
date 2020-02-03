//- for Datepicker plugin script should be added on the page: script(src="../../src/blocks/datepicker/air-datepicker/dist/js/datepicker.min.js")
$('<i class="material-icons filter-date-dropdown__arrow">expand_more</i>').insertAfter(".filter-date-dropdown__input");

$('.filter-date-dropdown__input').datepicker({
    clearButton: true,
    autoClose: false,
    inline: false,
    range: true,
    showEvent: '',
    multipleDatesSeparator: " - ",
    multipleDates: 2,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
    position: 'bottom right',
    navTitles: {
      days: 'MM <i>yyyy</i>',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    }
});

// $('.datepicker--buttons').append('<span class="datepicker--button -apply">Применить</span>');

$('.filter-date-dropdown__input').click(function(){
  $(this).data('datepicker').show();
});


$('.datepicker--button.-apply').click(function(){
  $('.filter-date-dropdown__input').data('datepicker').hide();
});