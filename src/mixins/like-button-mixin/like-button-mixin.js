$(".like-button").click(function(){
    var likeIncrementer = $('.like-button__favorite-icon_unchecked + .like-button__counter');
    var likeCount = Number(likeIncrementer.val());
    var newLikeCount = likeCount + 1;
    console.log(likeCount);
    $('.like-button__favorite-icon_unchecked + .like-button__counter').val(newLikeCount);

    $(".like-button__favorite-icon_unchecked").replaceWith('<i class="material-icons like-button__favorite-icon like-button__favorite-icon_checked">favorite</i>');;
    $('.like-button_unchecked').removeClass('like-button_unchecked').addClass('like-button_checked')
    $(".like-button__counter_unchecked").removeClass('like-button__counter_unchecked').addClass('like-button__counter_checked');
});



