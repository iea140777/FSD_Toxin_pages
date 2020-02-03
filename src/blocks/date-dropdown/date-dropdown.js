$('.date-dropdown__container').each(function(){
    $(".date-dropdown__input").after( '<i class="material-icons date-dropdown__arrow">expand_more</i>');
  let startDate = $(this).find(".date-dropdown__input-start-date");
  let endDate = $(this).find(".date-dropdown__input-end-date");
  let inputDatepicker = $(this).find('.date-dropdown__input-start-date'); 

  $(inputDatepicker).each(function(){
    $(this).datepicker({ 
      onSelect: function (fd, d, picker) { 
        startDate.val(fd.split("-")[0]);
        endDate.val(fd.split("-")[1]);
      },
      clearButton: true,
      multipleDates: 2, // Boolean or Number
      range: true,
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
  });

  let myDatepicker = $(this).find(inputDatepicker).data('datepicker');

  $(this).find('.date-dropdown__input').click(function(){
      myDatepicker.show();
    });   
});


//- for Datepicker plugin script should be added on the page: script(src="src/blocks/datepicker/air-datepicker/dist/js/datepicker.min.js")