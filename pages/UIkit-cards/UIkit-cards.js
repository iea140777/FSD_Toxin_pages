$('.UIkit-cards__datepicker').datepicker({ 
    clearButton: true,
    autoClose: false,
    position: "right bottom",
    offset: 0,
    inline: true,
    prevHtml: '<i class="material-icons arrow_back">arrow_back</i>',
    nextHtml: '<i class="material-icons arrow_forward">arrow_forward</i>',
    position: 'bottom left',
    multipleDates: true, // Boolean or Number
    range: true,
    navTitles: {
      days: 'MM <i>yyyy</i>',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2',
    }
    
});