
$(function(){
  var height=0;
  var top=0;
  $(window).scroll(function(){
    height=$(this).scrollTop();
    top<height
      ?$('.header').css('background','rgba(255,255,255,.95)')
      : $('.header').css('background','unset');
  setTimeout(function(){ top = height ; },0)
  })
})


