var requestHistory = requestHistory || (function ($) {

	// other requestHistory stuff omitted for this example...

	// service request history stuff
	this.history = function (options) {

		// ok for this servicerequest.js to know about the hash mechanism, yearpicker.js can remain blissfully ignorant
		// $.bbq.pushState triggers the hashchange, which ultimately updates the service request history items view
		this.history.onYearChange = function (year) {
			$.bbq.pushState({ "year": year });
		};

		// filters *could* be generalized into a jQuery plugin, but remain in this servicerequest.js just to illustrate they can
		this.history.onFilterChange = function (filter) {
			var val = filter.children("option:selected").val();
			switch (filter.attr("id")) {
				case options.filterTypeElement.attr("id"):
					$.bbq.pushState({ "type": val });
					break;
				case options.filterStatusElement.attr("id"):
					$.bbq.pushState({ "status": val });
					break;
			}
		};

		// set selected filter items from state
		this.history.setFilterState = function (state) {
			options.filtersElement.children("select").each(function (index, value) {
				switch ($(value).attr("id")) {
					case options.filterTypeElement.attr("id"):
						$(value).val(state.type);
						break;
					case options.filterStatusElement.attr("id"):
						$(value).val(state.status);
						break;
				}
			});
		};

		// reload the service request items view for the current state
		this.history.showHistory = function (historyState) {
	console.log(historyState)
			// set selected elements on filters in case change is because of URL hash edit, rather than UI interaction (SET SELECTED YEAR OMITTED FOR THIS EXAMPLE)
			history.setFilterState(historyState);
			// here would be the ajax call for the history list view (html), just static html for this example
			var htmlViewFromAjaxCall = "<h2>Service Requests for Year: " + historyState.year + " Type: " + historyState.type + " Status: " + historyState.status + "</h2>";
			options.historyElement.html(htmlViewFromAjaxCall);
		};

		// initialize the yearPicker component (was DateManager)
		options.dateElement.yearPicker({
			'selectedYear': options.state.year,
			'yearsToShow': options.yearsToShow,
			'onChange': history.onYearChange // event handler to call when year selection changes
		});
		console.log(options.filtersElement);
		console.log(options);

		// set initially selected values for filters, and the event handler for filter changes
		options.filtersElement.find("select").each(function (index, value) {
	console.log(value)
			history.setFilterState(options.state);
			$(value).change(function () {
				history.onFilterChange($(value));
			});
		});

	};

	// return public history interface
	return {
		history: this.history
	};
})(jQuery);