(function ($) {
  // This is the simplest possible plugin to select years
  // FUNCTIONALITY TO SET AND INDICATE THE CURRENTLY SELECTED YEAR OMITTED FOR THIS EXAMPLE
	var settings; // must be set out here!!!
	$.fn.dateManager = function(method) {
		
		// shared method for determining which are selected
		var generateSize = function(index, settings) {
			var total = settings.yearsToShow.length;
			var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
			var size = (index == selectedIndex)?'large':(index == selectedIndex-1 || index == selectedIndex+1)?'small':'gone';
			if(size == 'large' && total < 3)size = (total == 1?'xx-':'x-') + size;
			// selected year is against a wall, which means it will have 2 smalls on 1 side instead of 1 small on both sides
			if(size == 'gone' && total > 2 && ((total-1 == selectedIndex && index == selectedIndex-2) || (selectedIndex == 0 && index == selectedIndex+2)))size = 'small';
			return size;
		}
		
		var methods = {
			/*
			 * INIT!
			 */
			init: function(options)
			{
				var colors = ['blue', 'blue-green', 'green'];
				var thisYear = new Date().getFullYear();

				// set defaults and override with options
				settings = $.extend({
					'onChange' : null,
					'selectedYear' : thisYear,
					'yearsToShow' : [thisYear]
				}, options);
				
				return this.each(function() {
					var $this = $(this);
					var $yearSelector = $(this).find('.year-selector .slider');
					var years = $("<ul>").addClass('clearfix');
					var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
					// bind click events on years
					$.each(settings.yearsToShow, function(index, value) {
						size = generateSize(index, settings);
						var $a = $('<a href="#"></a>').html(value.toString());
						var $el = $("<li></li>").addClass(colors[parseInt(value)%3]).addClass(size).html($a);
						$a.click(function() { settings.onChange(value); return false; });
						years.append($el);
					});
					// bind Events on left/right arrows
					$('.left-selector, .right-selector').click(function(){
						var eq = $(this).hasClass('left-selector')?0:2;
						var year = $this.find('.year-selector ul li:not(.gone):eq(' + eq + ') a').html();
						$.bbq.pushState({ "year": year });
						return false;
					})
					$yearSelector.append(years);
				});
				
			},
			/**
			 * This function selects a year (makes it largest, and makes appropriate siblings visible)
			 */
			selectYear: function(year)
			{
				settings.selectedYear = parseInt(year);
				return $(this).each(function(){
					var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
					var $ul = $(this).find('.year-selector ul li');
					$ul.each(function(i,e){
						$(e).removeClass('gone').removeClass('large').removeClass('x-large').removeClass('xx-large').removeClass('small').addClass(generateSize(i, settings));
					});
				});
			},
			/**
			 * Respond to hashChange
			 */
			hashChange: function()
			{
				settings.selectedYear = parseInt($.deparam.fragment().year || new Date().getFullYear());
				var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
				var $dateManager = $(this);
				// Are we against a wall?
				var arrowPosition = 1;
				if(selectedIndex == 0 || selectedIndex == settings.yearsToShow.length-1)
				{
					if(selectedIndex == 0){
						arrowPosition = 0;
					}else if(settings.yearsToShow.length > 2){
						arrowPosition = 2;
					}
				}
				// middle is selected, fadIn both selectors
				if(arrowPosition === 1 && settings.yearsToShow.length > 2)
				{
					$dateManager.find('.left-selector, .right-selector').fadeIn();
				}
				// edge is selected, fade in 1 or more selectors
				else
				{
					if(selectedIndex == 0) {
						$dateManager.find('.left-selector').fadeOut();
					} else {
						$dateManager.find('.left-selector').fadeIn();
					}
					
					if(selectedIndex == settings.yearsToShow.length-1) {
						$dateManager.find('.right-selector').fadeOut();
					} else {
						$dateManager.find('.right-selector').fadeIn();
					}
				}
				
				// hide/show appropriate arrow
				// switch(arrowPosition)
				// {
				// 	case 0:
				// 		$dateManager.find('.left-selector').fadeOut();
				// 		break;
				// 	case 1:
				// 		$dateManager.find('.left-selector, .right-selector').fadeIn();
				// 		break;
				// 	case 2:
				// 		$dateManager.find('.right-selector').fadeOut();
				// 		break;
				// }
				
				
				$dateManager.dateManager('selectYear', settings.selectedYear);
				// month-selctor exists; move the arrow to december
				if($dateManager.find('.month-selector').length > 0)
				{
					
				}
				// month-selector does not exist; move the arrow to the year
				else
				{
					$dateManager.find('.arrow').css('background-position', (arrowPosition*75)-770);
				}
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