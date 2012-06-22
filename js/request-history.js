var requestHistory = (typeof (requestHistory) === "undefined" || !requestHistory)
 ? function () {
	return {
		history: this.history
	};
} : requestHistory;
/**
 *
 */
requestHistory.options = (typeof (requestHistory.options) === "undefined" || !requestHistory.options)
 ? {} : requestHistory.options;
/**
 *
 */
requestHistory.history = (typeof (requestHistory.history) === "undefined" || !requestHistory.history)
 ? function (options) {
		// initialize the dateManager component (was DateManager)
		options.dateElement.dateManager({
			'selectedYear': options.state.year,
			'yearsToShow': options.yearsToShow,
			'onChange': requestHistory.history.onYearChange // event handler to call when year selection changes
		});
		requestHistory.options = options;

		// set initially selected values for filters, and the event handler for filter changes
		requestHistory.history.setFilterState(options.state);
		
		options.filtersElement.find("select").each(function (index, value) {
			$(value).change(function () {
				requestHistory.history.onFilterChange($(value));
			});
		});
} : requestHistory.history;
/**
 * Clicking a Year triggers this method
 */
requestHistory.history.onYearChange = (typeof (requestHistory.history.onYearChange) === "undefined" || !requestHistory.history.onYearChange)
 ? function (year) {
		$.bbq.pushState({ "year": year });
} : requestHistory.history.onYearChange;
/*
*/
requestHistory.history.onFilterChange = (typeof (requestHistory.history.onFilterChange) === "undefined" || !requestHistory.history.onFilterChange)
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
requestHistory.history.setFilterState = (typeof (requestHistory.history.setFilterState) === "undefined" || !requestHistory.history.setFilterState)
 ? function (state) {
	requestHistory.options.filtersElement.find("select").each(function (index, value) {
		switch ($(value).attr("id")) {
			case requestHistory.options.filterTypeElement.attr("id"):
				$(value).val(state.type);
				break;
			case requestHistory.options.filterStatusElement.attr("id"):
				$(value).val(state.status);
				break;
		}
	});
} : requestHistory.history.setFilterState;
/**
 * this responds to hashChange events
 */
requestHistory.history.showHistory = (typeof (requestHistory.history.showHistory) === "undefined" || !requestHistory.history.showHistory)
 ? function (historyState) {
	// set selected elements on filters in case change is because of URL hash edit, rather than UI interaction (SET SELECTED YEAR OMITTED FOR THIS EXAMPLE)
	requestHistory.history.setFilterState(historyState);
	var id = historyState.status + '-' + historyState.type + '-' + historyState.year;

	var $accordion = $('.accordion#' + id);
	// requested accordion doesn't exist. lets get it!
	if($accordion.length === 0)
	{
		$.getJSON('request-history.json', historyState, function(data, response){
			// alarm: 0
			// date: 1331856000
			// description: "Disposal is not grinding properly. Makes a funny joke at my expense when I try to turn it on"
			// description_cut: "Disposal is not grinding properly. Makes a funny ..."
			// email: "bar@foo.com"
			// enter: 1
			// id: "000012"
			// instructions: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
			// name: "Garbage Disposal"
			// pets: 1
			// reporter: "Jon Smith"
			// status: "Repaired Temporarily"
			if(response === 'success')
			{
				var $accordion = $('<div></div>').addClass('accordion').addClass('discreet-accordion').attr('id', id);
				var $header, $body, date;
				$.each(data, function(i,e){
					date = new Date(e.date);
					$header = $('<h2></h2>').attr('rel', i);
					$header.append($('<span></span>').addClass('last-updated').html(global.monthNames[date.getUTCMonth()]));
					$header.append($('<span></span>').addClass('request').html(e.name));
					$header.append($('<span></span>').addClass('description').html(e.description_cut));
					$header.append($('<span></span>').addClass('status').html(e.status));
					$header.append($('<a href="dialog-email.html"> &nbsp; </a>').addClass('email').addClass('cta-dialog').attr('title', 'Contact Us').attr('rel', i));
					
					$content = $('<div></div>');
					$content.append($('<div></div>').addClass('description-summary').html('<h3>Reference ID</h3><p>' + i + '</p>'));
					$content.append($('<div></div>').addClass('description-summary').html('<h3>Description</h3><p>' + e.description + '</p>'));
					$content.append($('<div></div>').addClass('description-summary').html('<h3>Special Instructions</h3><p>' + e.instructions + '</p>'));
					$content.append($('<div></div>').addClass('description-summary').html('<h3>May we enter?</h3><p>' + (e.enter === 0?'no':'yes') + '</p>'));
					$content.append($('<div></div>').addClass('description-summary').html('<h3>Pets?</h3><p>' + (e.pets === 0?'no':'yes') + '</p>'));
					$content.append($('<div></div>').addClass('description-summary').html('<h3>Alarm?</h3><p>' + (e.alarm === 0?'no':'yes') + '</p>'));
					$content.append($('<div></div>').addClass('description-summary').html('<h3>Reported By</h3><p>' + e.reporter + '</p>'));
					
					$accordion.append($header);
					$accordion.append($content);
					
				});
				// var htmlViewFromAjaxCall = "<h2>Service Requests for Year: " + historyState.year + " Type: " + historyState.type + " Status: " + historyState.status + "</h2>";
				requestHistory.options.historyElement.find('.accordion:visible').hide('blind', function(){
					requestHistory.options.historyElement.append($accordion.accordion({
						autoHeight: false,
						collapsible: true,
						active: false
					}).hide());
					$accordion.show('blind')
				});
				// requestHistory.options.historyElement.html(htmlViewFromAjaxCall);
			}
		});
	}
	// requested accordion exists, lets just show that one!
	else
	{
		$accordion.siblings(':visible').hide('blind', function(){
			$accordion.show('blind');
		});
	}
	
} : requestHistory.history.showHistory;