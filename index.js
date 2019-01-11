import "./scss/style.scss";
import $ from "jquery";
import ScrollMagic from 'scrollmagic'
//import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
//import Foundation from "foundation-sites";
//import moment from 'moment';

// init controller
var controller = new ScrollMagic.Controller({
//	loglevel: 3
});

// create a scene
$(document).ready(function() {
	$("[data-anim]").each(function(index, el) {
		$(el).addClass($(el).data('anim')+' mui-enter')
		new ScrollMagic.Scene({
				triggerHook: 0.85,
				triggerElement: el
			})
			.setClassToggle(el, "mui-enter-active")
			//.addIndicators({name: $(el).data('anim')})
			.addTo(controller)
	});

	$("[data-count]").each(function(index, el) {
		$(this).html('0');
		new ScrollMagic.Scene({
				triggerHook: 0.85,
				triggerElement: el
			})
			.on('enter',function(el2){
				if(!$(el).data('complete')) counter($(el));
			})
			//.addIndicators({name: $(el).data('anim')})
			.addTo(controller)
	});
	$("[data-countdec]").each(function(index, el) {
		$(this).html('0');
		new ScrollMagic.Scene({
				triggerHook: 0.85,
				triggerElement: el
			})
			.on('enter',function(el2){
				if(!$(el).data('complete')) counterDec($(el));
			})
			//.addIndicators({name: $(el).data('anim')})
			.addTo(controller)
	});

	$('hr').not('.key_stats_hr').each(function(index, el) {
		$(el).css('transform','scaleX(0.5)')	
		new ScrollMagic.Scene({
				triggerHook: 0.85,
				triggerElement: el,
				duration: '25%'
			})
			.on('progress leave;',function(event){
				$(el).css('transform','scaleX('+( event.progress / 2 + 0.5 )+')')	
			})
			//.addIndicators({name: $(el).data('anim')})
			.addTo(controller)	
	});

	function counter($el){
	    $el.prop('Counter',$el.data('start')).animate({
	        Counter: $el.data('end')
	    }, {
	        duration: 1000,
	        easing: 'swing',
	        step: function (now) {
	            $el.text(Math.ceil(now).toLocaleString('en'));
	        },
	        complete: function(){
	        	$el.attr('data-complete',true);
	        }
	    });		
	}


	function counterDec($el){
	    $el.prop('Counter',$el.data('start')*10).animate({
	        Counter: $el.data('end')*10
	    }, {
	        duration: 1000,
	        easing: 'swing',
	        step: function (now) {
	        	let int = Math.ceil(now)/10
	            $el.text(int.toLocaleString('en'));
	        },
	        complete: function(){
	        	$el.attr('data-complete',true);
	        }
	    });		
	}
	function getBlockHeight($el){
		$el.each(function(index, el) {
			$(this).attr('data-height',$(this).find('.toggle_height').outerHeight())
			if($(this).hasClass('open')){
				$(this).find('.toggle_text').css('height', $(this).data('height')+"px")
			}else{
				$(this).find('.toggle_text').css('height', '')
			}
		});
	}

	getBlockHeight($('.toggle_panel'))

	$(".toggle_all").click(function(event) {
		event.preventDefault();
		//console.log($(this).parent().find('.toggle_height').innerHeight())
		$(this).parent().toggleClass('open');
		getBlockHeight($(this).parent())
	});


	$(".bargraph .bar").hover(function() {
		$(".bargraph .stats").css('opacity','0')
		$(this).prev().css('opacity','1')
		$(".bargraph .bar").css('opacity','0.5')
		$(this).css('opacity','1')
	},function(){
		$(".bargraph .bar").css('opacity','1')
	});


	/*
	
	SVG stroke anim:
	dash-array: 473px 
	946 total

	20% solid - 94 + 473	= 567
	80%  opac - 379 + 473	= 852
	
	12% opac - 56 + 473		= 586
	88% solid - 360 + 473	= 833

	31% solid - 165 + 473	= 620
	69% opac - 308 + 473	= 799	






	24% opac - 113 + 473	= 586
	76% solid - 360 + 473	= 833

	35% solid - 165 + 473	= 638
	65% opac - 308 + 473	= 781

	lt color: A46D82

	*/







	/*
	const slides = $("section.priority");
	slides.each(function(index, el) {
		//console.log(slides)
		//$(el).append("<div class='trigger_"+index+"'></div>")
		
		new ScrollMagic.Scene({
				triggerElement: "#trigger_"+index,
				triggerHook: 1,
				//duration: '100',
				//pushFollowers: false
			})
			.setPin(slides[index])
			.addIndicators({name: slides[index].className}) // add indicators (requires plugin)
			.addTo(controller);
	})

		// // init
		// var controller = new ScrollMagic.Controller({
		// 	globalSceneOptions: {
		// 		triggerHook: 'onLeave'
		// 	}
		// });

	// // get all slides
	// var slides = document.querySelectorAll("section.priority");

	// // create scene for every slide
	// for (var i=1; i<slides.length-1; i++) {
	// 	console.log(slides[i],slides[i-1]);
	// 	new ScrollMagic.Scene({
	// 			triggerElement: slides[i],
	// 			triggerHook: 1,
	// 			// duration: '100',
	// 			// pushFollowers: false
	// 		})
	// 		.setPin(slides[i-1])
	// 		.addIndicators({name: slides[i-1].className}) // add indicators (requires plugin)
	// 		.addTo(controller);
	// }

	*/

});

