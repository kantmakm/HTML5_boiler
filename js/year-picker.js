// This is the simplest possible plugin to select years
// FUNCTIONALITY TO SET AND INDICATE THE CURRENTLY SELECTED YEAR OMITTED FOR THIS EXAMPLE
$.fn.dateManager = function(options) {
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