(function ($) {
    // This is the simplest possible plugin to select years
    // FUNCTIONALITY TO SET AND INDICATE THE CURRENTLY SELECTED YEAR OMITTED FOR THIS EXAMPLE
	$.fn.yearPicker = function(options) {
		var thisYear = new Date().getFullYear();

		var settings = $.extend({
			// set defaults and override with options
			'onChange' : null,
			'selectedYear' : thisYear,
			'yearsToShow' : [thisYear]
		}, options);
		console.log("datePicker settings: %o", settings);

		return this.each(function() {
			var $this = $(this);
			var years = $("<ul>");
			$.each(settings.yearsToShow, function(index, value) {
				var el = $("<li>" + value.toString() + "</li>");
				el.click(function() { settings.onChange(value); });
				years.append(el);
			});
			$this.append(years);
		});
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
// 		$('#year-selector ul li a').live('click', function(){
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
// 		var year = parseInt($('#year-selector ul li.active a').html());
// 		var month = ($('.month-manager').length == 0)?false:($('.month-manager ul li.active a').length == 0)?$('.month-manager ul li.active a').html():false;
// 		var location = $('select#location').val();
// 		var status = $('select#status').val();
// 		window.location.hash = status + "-" + location + "-" + year + (month == false ? '' : "-" + month);
// 	} : DateManager.selectDate;
// 	
// // move years back/forth
// DateManager.moveYears = (typeof (DateManager.moveYears) == "undefined" || !DateManager.moveYears)
//  ? function (older) {
// 		var right = parseInt($('#year-selector .slider').css('right').replace('px', ''));
// 		var move;
// 		$('#year-selector .slider').stop( false, true);
// 		if(older == false && right < 0)
// 		{
// 			move = "+=247";
// 		}
// 		else if(older == true)
// 		{
// 			// need an extra year. add it before we move slide
// 			if(($('#year-selector ul').width()+247) > (741-right))
// 			{
// 				var year = (parseInt($('#year-selector ul li:first a').html())-1);
// 				var color = $('#year-selector ul li:first a').hasClass('blue')?'green':$('#year-selector ul li:first a').hasClass('blue-green')?'blue':'blue-green';
// 				$('<li></li>')
// 					.addClass('year-' + year)
// 					.html('<a href="#" class="' + color + '">' + year + '</a></li>')
// 					.prependTo($('#year-selector ul'));
// 			}
// 			move = "-=247";
// 		}
// 		else
// 		{
// 			move = "0";
// 		}
// 		$('#year-selector .slider').animate({
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