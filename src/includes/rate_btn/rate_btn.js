
$(".rate_icon__unchecked").click(function(){
$(this).toggle(function(){
    $(this).replaceWith("<i class='material-icons rate_icon rate_icon__checked'>star</i>")})
})


$(".rate_icon__checked").click(function(){
    $(this).toggle(function(){
        $(this).replaceWith("<i class='material-icons rate_icon rate_icon__unchecked'>star_border</i>")})
    })

         