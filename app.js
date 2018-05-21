$(document).ready(function($) {
  "use strict"; // strict mode
	
	// Text rotation
	rotateText("rotator",["simplicity", "communication", "expandability", "utility", "sustainability"], 0);
	
	// Smooth Scrolling with jQuery
  $("a.js-scroll-trigger[href*='#']").click(function(event) { // nav-item
		event.preventDefault();
		var location = $(this.hash); // location id e.g., "#portfolio"
		if (location.length) {
			$("a.nav-link:not([href*='#"+location[0].id+"'])").removeClass("animated-underline-ribbon"); // prevent other nav items from animating
			$("a.nav-link[href*='#"+location[0].id+"']").addClass("force-underlined"); // ensure the clicked nav item remains animated during scroll
			$("html, body").animate({
				scrollTop: (location.offset().top - 20) // additional space above location
			}, 800);
			setTimeout(function(loc) { // restore nav links to default after scrolling is complete
				$("a.nav-link:not([href*='#"+loc+"'])").addClass("animated-underline-ribbon");
				$("a.nav-link[href*='#"+loc+"']").removeClass("force-underlined");
			},800,location[0].id);
		}
  });
}); // End of strict mode

function rotateText(target,textArr,index){
	$("#"+target).html(textArr[index]).fadeIn(1600, function() {
		index==textArr.length-1 ? index=0 : index++; // loop index	
		console.log(textArr.length-1);
		$("#"+target).fadeOut(1600, function() {					
			rotateText(target,textArr,index); // recursively continue animating					
		}); 
	});
}