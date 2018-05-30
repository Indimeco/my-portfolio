(function() { //IIFE to prevent global conflicts
	'use strict'; // Strict mode
	
	$(document).ready(function($) {
		// Text rotation
		rotateText('rotator',['simplicity', 'communication', 'expandability', 'utility', 'sustainability'], 0);
		// Smooth scrolling with jQuery
		$('a.js-scroll-trigger[href*="#"]').click(smoothScroll);
		// Scroll spy
		window.onscroll = scrollSpy;
	});

	function rotateText(target,textArr,index){ // power the changing text in the about section
		$('#'+target).html(textArr[index]).fadeIn(1600, function() {
			index==textArr.length-1 ? index=0 : index++; // loop index infinitely 
			$('#'+target).fadeOut(1600, function() {					
				rotateText(target,textArr,index); // recursively continue animating			
			}); 
		});
	}

	function smoothScroll(event) { // animate scrolling transition to clicked section
		event.preventDefault();
		var location = $(this.hash); // location id e.g., '#portfolio'
		if (location.length) {
			$('nav div a:not([href*="#'+location[0].id+'"])').removeClass('animated-underline-ribbon'); // prevent other nav items from animating
			$('nav div a[href*="#'+location[0].id+'"]').addClass('force-underlined'); // ensure the clicked nav item remains animated during scroll
			$('html, body').animate({
				scrollTop: (location.offset().top - 20) // additional space above location
			}, 800);
			setTimeout(function(loc) { // restore nav links to default after scrolling is complete
				$('nav div a:not([href*="#'+loc+'"])').addClass('animated-underline-ribbon');
				$('nav div a[href*="#'+loc+'"]').removeClass('force-underlined');
			},800,location[0].id);
		}
	}
	
	function scrollSpy() { // update navbar to match current scrolled content
		var sections = $('section'); // array of all sections
		var locations = {};
		for (var i=0; i<sections.length; i++) {
			locations[sections[i].id] = sections[i].offsetTop - 100; // object containing scroll locations keyed by section id
		}
		
		var scrollPosition = $(document).scrollTop(); // current scroll location 
		var target = 'about'; // default behavior if scrolling in non section areas
		for (var i in locations) {
			if (locations[i] <= scrollPosition) {
				target = i || 'about';
			}
		}
		
		$('.active').removeClass('active'); // remove underline from old navbar section representation
		$('#nav-'+target).addClass('active'); // add it to the current navbar section representation
	}
	
}());