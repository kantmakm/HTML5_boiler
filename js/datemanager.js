(function ($) {
  // This is the simplest possible plugin to select years
  // FUNCTIONALITY TO SET AND INDICATE THE CURRENTLY SELECTED YEAR OMITTED FOR THIS EXAMPLE
	var settings; // must be set out here!!!
	$.fn.yearPicker = function(method) {
		
		// shared method for determining which are selected
		var generateSize = function(index, settings) {
			var total = settings.yearsToShow.length;
			var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
			var size = (index == selectedIndex)?'large':(index == selectedIndex-1 || index == selectedIndex+1)?'small':'gone';
			// selected year is against a wall, which means it will have 2 smalls on 1 side instead of 1 small on both sides
			console.log(size, total, index, selectedIndex);
			if(size == 'gone' && total > 2 && ((total-1 == selectedIndex && index == selectedIndex-2) || (selectedIndex == 0 && index == selectedIndex+2)))
			{
				size = 'small';
			}
			return size;
		}
		
		var methods = {
			init: function(options)
			{
				console.log('init');
				var colors = ['blue', 'blue-green', 'green'];
				var thisYear = new Date().getFullYear();

				// set defaults and override with options
				settings = $.extend({
					'onChange' : null,
					'selectedYear' : thisYear,
					'yearsToShow' : [thisYear]
				}, options);
				console.log("datePicker settings: %o", settings);				
				
				return this.each(function() {
					var $this = $(this);
					var $yearSelector = $(this).find('.year-selector .slider');
					var years = $("<ul>").addClass('clearfix');
					var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
					// bind click events on years
					$.each(settings.yearsToShow, function(index, value) {
						console.log(settings);
						size = generateSize(index, settings);
						console.log(size);
						var $a = $('<a href="#"></a>').html(value.toString());
						var $el = $("<li></li>").addClass(colors[parseInt(value)%3]).addClass(size).html($a);
						$a.click(function() { settings.onChange(value); return false; });
						years.append($el);
					});
					$yearSelector.append(years);
				});
				
			},
			selectYear: function(year)
			{
				settings.selectedYear = year;
				console.log(year);
				return $(this).each(function(){
					console.log('HEY!')
					var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
					var $ul = $(this).find('.year-selector ul li');
					$ul.each(function(i,e){
						$(e).removeClass('gone').removeClass('large').removeClass('small').addClass(generateSize(i, settings));
						console.log(e);
						console.log(generateSize(i, settings));
					});
				});
			}
		};
		
		// Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }
	};
})(jQuery);
// // Declare the DateManager object.
// var DateManager = (typeof (DateManager) == "undefined" || !DateManager)
//  ? function () { }
//  : DateManager;
// 
// // init(); bind the appropriate events
// DateManager.init = (typeof (DateManager.init) == "undefined" || !DateManager.init)
// 	? function () {
// 		// Bind Click Events
// 		$('.left-selector, .right-selector').click(function(){
// 			DateManager.moveYears($(this).hasClass('left-selector')?true:false);
// 			return false;
// 		});
// 		console.log('Initing');
// 		$('.year-selector ul li a').live('click', function(){
// 			$(this).parent().addClass('active').siblings().removeClass('active');
// 			DateManager.selectDate();
// 			return false;
// 		});
// 		
// 		// Bind select Events
// 		$('select#location, select#status').change(DateManager.selectDate);
// 		
// 		// Respond to hash on page load
// 		if(window.location.hash)
// 		{
// 			// code...
// 		}
// 	} : DateManager.init;
// 
// // hashChange Event
// DateManager.hashChange = (typeof (DateManager.hashChange) == "undefined" || !DateManager.hashChange)
// 	? function () {
// 		var $accordion = $('.accordion[rel=' + window.location.hash + ']');
// 		if($accordion.length == 0)
// 		{
// 			$.getJSON('request-history.json', DateManager.replaceAccordion);
// 		}
// 		else
// 		{
// 			$accordion.siblings().fadeOut(function(){
// 				$accordion.fadeIn();
// 			});
// 		}
// 	} : DateManager.hashChange;
// 
// // This Finds the date and changes the hash of the url.
// DateManager.selectDate = (typeof (DateManager.selectDate) == "undefined" || !DateManager.selectDate)
//  ? function () {
// 		var year = parseInt($('.year-selector ul li.active a').html());
// 		var month = ($('.month-manager').length == 0)?false:($('.month-manager ul li.active a').length == 0)?$('.month-manager ul li.active a').html():false;
// 		var location = $('select#location').val();
// 		var status = $('select#status').val();
// 		window.location.hash = status + "-" + location + "-" + year + (month == false ? '' : "-" + month);
// 	} : DateManager.selectDate;
// 	
// // move years back/forth
// DateManager.moveYears = (typeof (DateManager.moveYears) == "undefined" || !DateManager.moveYears)
//  ? function (older) {
// 		var right = parseInt($('.year-selector .slider').css('right').replace('px', ''));
// 		var move;
// 		$('.year-selector .slider').stop( false, true);
// 		if(older == false && right < 0)
// 		{
// 			move = "+=247";
// 		}
// 		else if(older == true)
// 		{
// 			// need an extra year. add it before we move slide
// 			if(($('.year-selector ul').width()+247) > (741-right))
// 			{
// 				var year = (parseInt($('.year-selector ul li:first a').html())-1);
// 				var color = $('.year-selector ul li:first a').hasClass('blue')?'green':$('.year-selector ul li:first a').hasClass('blue-green')?'blue':'blue-green';
// 				$('<li></li>')
// 					.addClass('year-' + year)
// 					.html('<a href="#" class="' + color + '">' + year + '</a></li>')
// 					.prependTo($('.year-selector ul'));
// 			}
// 			move = "-=247";
// 		}
// 		else
// 		{
// 			move = "0";
// 		}
// 		$('.year-selector .slider').animate({
// 			right: move
// 		});
// 		return false;
// } : DateManager.moveYears;
// 
// // bind hashChange (doesn't need to be onload)
// $(window).bind('hashchange', DateManager.hashChange);
// $(function(){
// 	console.log('INIT!');
// 	DateManager.init();
// });