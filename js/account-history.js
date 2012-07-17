var accounts = function () {};
accounts.options = {};

/**
 * init method for request-history page
 */
accounts.history = function (options) {
		// initialize the dateManager component (was DateManager)
		options.dateElement.dateManager({
			'selectedYear': 	options.state.year,
			'selectedMonth':	options.state.month,
			'yearsToShow': 		options.yearsToShow,
			'onChange': 			accounts.history.onYearChange, // event handler to call when year selection changes
			'hasMonths': 			options.hasMonths
		});
		accounts.options = options;
};

/**
 * Clicking a Year/changing a filter triggers these methods
 */
accounts.history.onYearChange = function (year, month) {
	var state = { "year": year };
	var thisYear = new Date().getUTCFullYear()
	var thisMonth = new Date().getUTCMonth();
	if(!isNaN(month))
	{
		state.month = year >= thisYear && parseInt(month) > thisMonth
			? thisMonth
			: parseInt(month || thisMonth);
	}
	$.bbq.pushState(state);
};

/**
 * this responds to hash Change events
 */
accounts.history.showHistory = function (historyState) {
	// animate the dateManager
	accounts.options.dateElement.dateManager('setDate', historyState);
};