var requestHistory = (typeof (requestHistory) == "undefined" || !requestHistory)
 ? function () {
	return {
		history: this.history
	};
} : requestHistory;
/**
 *
 */
requestHistory.options = (typeof (requestHistory.options) == "undefined" || !requestHistory.options)
 ? {} : requestHistory.options;
/**
 *
 */
requestHistory.history = (typeof (requestHistory.history) == "undefined" || !requestHistory.history)
 ? function (options) {
		// initialize the yearPicker component (was DateManager)
		options.dateElement.yearPicker({
			'selectedYear': options.state.year,
			'yearsToShow': options.yearsToShow,
			'onChange': requestHistory.history.onYearChange // event handler to call when year selection changes
		});
		requestHistory.options = options;

		// set initially selected values for filters, and the event handler for filter changes
		requestHistory.history.setFilterState(options.state);
		options.filtersElement.find("select").each(function (index, value) {
			$(value).change(function () {
				history.onFilterChange($(value));
			});
		});
} : requestHistory.history;
/**
 * Clicking a Year triggers this method
 */
requestHistory.history.onYearChange = (typeof (requestHistory.history.onYearChange) == "undefined" || !requestHistory.history.onYearChange)
 ? function (year) {
		$.bbq.pushState({ "year": year });
} : requestHistory.history.onYearChange;
/*
*/
requestHistory.history.onFilterChange = (typeof (requestHistory.history.onFilterChange) == "undefined" || !requestHistory.history.onFilterChange)
 ? function (filter) {
		var val = filter.children("option:selected").val();
		switch (filter.attr("id")) {
			case requestHistory.options.filterTypeElement.attr("id"):
				$.bbq.pushState({ "type": val });
				break;
			case requestHistory.options.filterStatusElement.attr("id"):
				$.bbq.pushState({ "status": val });
				break;
		}
} : requestHistory.history.onFilterChange;
/*
*/
requestHistory.history.setFilterState = (typeof (requestHistory.history.setFilterState) == "undefined" || !requestHistory.history.setFilterState)
 ? function (state) {
	requestHistory.options.filtersElement.children("select").each(function (index, value) {
		switch ($(value).attr("id")) {
			case requestHistory.options.filterTypeElement.attr("id"):
				$(value).val(state.type);
				break;
			case requestHistory.options.filterStatusElement.attr("id"):
				$(value).val(state.status);
				break;
		}
	})
} : requestHistory.history.setFilterState;
/*
*/
requestHistory.history.showHistory = (typeof (requestHistory.history.showHistory) == "undefined" || !requestHistory.history.showHistory)
 ? function (historyState) {
	console.log(historyState)
	// set selected elements on filters in case change is because of URL hash edit, rather than UI interaction (SET SELECTED YEAR OMITTED FOR THIS EXAMPLE)
	requestHistory.history.setFilterState(historyState);
	// here would be the ajax call for the history list view (html), just static html for this example
	var htmlViewFromAjaxCall = "<h2>Service Requests for Year: " + historyState.year + " Type: " + historyState.type + " Status: " + historyState.status + "</h2>";
	requestHistory.options.historyElement.html(htmlViewFromAjaxCall);
} : requestHistory.history.showHistory;