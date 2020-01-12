// - For Slider script should be included on the page: (src="../../src/blocks/range-slider/jquery-ui-1.12.1/jquery-ui.min.js")

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      animate: true,
      min: 0,
      max: 16000,
      values: [ 5000, 10000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( (ui.values[ 0 ]).toLocaleString() + "₽" + " - " + (ui.values[ 1 ]).toLocaleString() + "₽");
       }
    });
    $( "#amount" ).val(  ($( "#slider-range" ).slider( "values", 0 )).toLocaleString() + "₽" +
    " - " + ($( "#slider-range" ).slider( "values", 1 )).toLocaleString() + "₽" );
});

