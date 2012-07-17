(function ($) {
  // This is the simplest possible plugin to select years
  // FUNCTIONALITY TO SET AND INDICATE THE CURRENTLY SELECTED YEAR OMITTED FOR THIS EXAMPLE
	$.fn.dateManager = function(method) {
		var settings;
		var $this = $(this);
		var thisYear = new Date().getFullYear();
		var thisMonth = new Date().getMonth();
		
		/**
		 * shared method for determining size layout (ie "small small large" vs "small x-large", etc...)
		 */
		function generateSize(index, settings) {
			var total = settings.yearsToShow.length;
			var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
			var size = (index === selectedIndex) ? 'large' : (index === selectedIndex-1 || index === selectedIndex+1) ? 'small' : 'gone';
			if(size === 'large' && total < 3)size = (total === 1 ? 'xx-' : 'x-') + size;
			if(size === 'gone' && total > 2 && ((total-1 === selectedIndex && index === selectedIndex-2) || (selectedIndex === 0 && index === selectedIndex+2)))size = 'small';
			return size;
		};
		
		var methods = {
			/*
			 * INITialize!
			 */
			init: function(options)
			{
				var colors = ['blue', 'blue-green', 'green'];

				// set defaults and override with options
				this.dateManager.settings = $.extend({
					'onChange' :			null,
					'selectedYear' :	thisYear,
					'selectedMonth' :	thisMonth,
					'yearsToShow' :		[thisYear],
					'hasMonths' :			false
				}, options);
				
				return this.each(function() {
					var $monthSelector = $(this).find('.month-selector');
					var $years = $("<ul>").addClass('clearfix');
					var selectedIndex = $(this).dateManager.settings.yearsToShow.indexOf($(this).dateManager.settings.selectedYear);
					
					// Add the months dynamically and bind their click events
					$.each(archstone.monthNames, function(i,e){
						$('<li><a href="#">' + e + '</a></li>')
							.click(function(){
								$this.dateManager.settings.onChange($this.dateManager.settings.selectedYear, i);
								return false;
							}).appendTo($monthSelector);
					});
					
					// Add the years dynamically and bind their click events
					$.each($(this).dateManager.settings.yearsToShow, function(index, value) {
						var size = generateSize(index, $(this).dateManager.settings);
						var $a = $('<a href="#"></a>').html(value.toString());
						var $el = $("<li></li>").addClass(colors[parseInt(value)%3]).addClass(size).html($a);
						$a.click(function() { $(this).dateManager.settings.onChange(value); return false; });
						$years.append($el);
					});
					// bind Events on left/right arrows
					$('.left-selector, .right-selector').click(function(){
						var year = parseInt($('.large a, .x-large a, .xx-large a').html())
						year = year+($(this).hasClass('left-selector')?-1:1);
						$this.dateManager.settings.onChange($this.dateManager.settings.state.year, e)
						$.bbq.pushState({ "year": year });
						return false;
					});
					$(this).find('.year-selector .slider').append($years);
				});
			},
			/**
			 * serviceRequest executes this on hashChange().
			 */
			setDate: function(historyState)
			{
				$(this).dateManager.settings.selectedYear = parseInt(historyState.year || thisYear);
				$(this).dateManager.settings.selectedMonth = 
				($(this).dateManager.settings.selectedYear >= thisYear && parseInt(historyState.month) > thisMonth)
					? thisMonth
					: parseInt(historyState.month || thisMonth);
				var selectedIndex = $(this).dateManager.settings.yearsToShow.indexOf($(this).dateManager.settings.selectedYear);
				var $dateManager = $(this);
				var $monthSelector = $this.find('.month-selector');
				// the position of the year we're selecting; 0=left, 1=middle, 2=right
				var selectedYearPosition = selectedIndex === 0 
					? 0
					: selectedIndex === $(this).dateManager.settings.yearsToShow.length-1 && $(this).dateManager.settings.yearsToShow.length > 2
					 	? 2
						: 1;
				
				// fade in/out the correct left/right-arrows
				if(selectedIndex === 0) {
					$dateManager.find('.left-selector').fadeOut();
				} else {
					$dateManager.find('.left-selector').fadeIn();
				}
				if(selectedIndex === $(this).dateManager.settings.yearsToShow.length-1) {
					$dateManager.find('.right-selector').fadeOut();
				} else {
					$dateManager.find('.right-selector').fadeIn();
				}
				
				// animate the years
				var $ul = $this.find('.year-selector ul li');
				$ul.each(function(i,e){
					$(e).removeClass('gone')
						.removeClass('large')
						.removeClass('x-large')
						.removeClass('xx-large')
						.removeClass('small')
						.addClass(generateSize(i, $this.dateManager.settings));
				});
				
				// month-selctor exists; move the arrow to the month
				if(typeof $(this).dateManager.settings.selectedMonth !== 'undefined')
				{
					$monthSelector.css('margin-left', 15+(selectedYearPosition*75));
					console.log(($(this).dateManager.settings.selectedMonth*45)-770);
					console.log(15+(selectedYearPosition*75));
					$dateManager.find('.arrow').css('background-position-x', (15+(selectedYearPosition*75)+$(this).dateManager.settings.selectedMonth*45)-770);
					
				}
				// month-selector does not exist; move the arrow to the year
				else
				{
					$dateManager.find('.arrow').css('background-position-x', (selectedYearPosition*75)-770);
				}
			}
		};
		
		/**
		 * Method calling logic
		 */
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }
	};
})(jQuery);