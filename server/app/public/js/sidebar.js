$(function(){

	var sidebar=$('.sidebar'),

		mask=$('.mask2'),

		close_btn=$('.close-btn'),

		click_sidebar=$('.click-sidebar');

	function showSideBar(){
		mask.fadeIn();
		sidebar.animate({'left':0},200);
	};
	function hideSideBar(){
		mask.fadeOut();
		sidebar.animate({'left':-sidebar.width()},200);
	};

	click_sidebar.on('click',showSideBar);
	mask.on('click',hideSideBar);
	close_btn.on('click',hideSideBar);
});


$(function(){
  $("button").click(function(){
  $("p").toggle();
  });
});


$(function(){

	var nav_hover=$('.nav-hover'),

		nav_bar=$('.nav-bar');

	function navShow(){
		$(".nav-bar").fadeIn(100);

	};
	function navHide(){
		setTimeout(function(){
			$(".nav-bar").fadeOut(100);
		},1000);
	};

	nav_hover.mouseover(navShow);
	nav_bar.mouseout(navHide);
})