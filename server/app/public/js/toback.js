/**返回顶部*/
showScroll();
	function showScroll(){
		$(window).scroll( function() { 
			var scrollValue=$(window).scrollTop();
			scrollValue > 100 ? $('div[class=scroll]').fadeIn():$('div[class=scroll]').fadeOut();
		} );	
		$('#scroll').click(function(){
			$("html,body").animate({scrollTop:0},500);	
		});	
	}
	window.onldio