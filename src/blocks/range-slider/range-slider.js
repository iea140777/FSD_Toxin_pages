// function numberWithSpaces(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// };

$( function() {
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

// var num = 1234567890;
// var result = num.toLocaleString();