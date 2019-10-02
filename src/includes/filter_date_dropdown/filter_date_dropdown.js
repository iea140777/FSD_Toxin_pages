$('#date_range').datepicker({
    clearButton: true,
    autoClose: false,
    inline: false,
    range: true,
    multipleDatesSeparator: " - ",
    multipleDates: 2,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
});

$( '<i class="material-icons filter_date_dropdown_arrow">expand_more</i>' ).insertAfter( ".filter_date_dropdow_input" );