
$('#date-range').datepicker(
{
    clearButton: true,
    autoClose: false,
    inline: false,
    range: true,
    multipleDatesSeparator: " - ",
    multipleDates: 2,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
    position: 'bottom left',
    navTitles: {
      days: 'MM <i>yyyy</i>',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    }
});

$('<i class="material-icons filter-date-dropdown__arrow">expand_more</i>').insertAfter(".filter-date-dropdown__input");

// $('.datepicker--buttons').append('<span class="datepicker--button -apply">Применить</span>');