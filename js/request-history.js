var serviceRequest = (typeof (serviceRequest) === "undefined" || !serviceRequest)
 ? function () {
	// return {
	// 	history: this.history
	// };
} : serviceRequest;
/**
 *
 */
serviceRequest.options = (typeof (serviceRequest.options) === "undefined" || !serviceRequest.options)
 ? {} : serviceRequest.options;
/**
 *
 */
serviceRequest.history = (typeof (serviceRequest.history) === "undefined" || !serviceRequest.history)
 ? function (options) {
		// initialize the dateManager component (was DateManager)
		options.dateElement.dateManager({
			'selectedYear': options.state.year,
			'yearsToShow': 	options.yearsToShow,
			'onChange': 		serviceRequest.history.onYearChange, // event handler to call when year selection changes
			'hasMonths': 		options.hasMonths
		});
		serviceRequest.options = options;

		// set initially selected values for filters, and the event handler for filter changes
		serviceRequest.history.setFilterState(options.state);
		
		options.filtersElement.find("select").each(function (index, value) {
			$(value).change(function () {
				serviceRequest.history.onFilterChange($(value));
			});
		});
} : serviceRequest.history;
/**
 * Clicking a Year triggers this method
 */
serviceRequest.history.onYearChange = (typeof (serviceRequest.history.onYearChange) === "undefined" || !serviceRequest.history.onYearChange)
 ? function (year) {
		$.bbq.pushState({ "year": year });
} : serviceRequest.history.onYearChange;
/*
*/
serviceRequest.history.onFilterChange = (typeof (serviceRequest.history.onFilterChange) === "undefined" || !serviceRequest.history.onFilterChange)
 ? function (filter) {
		var val = filter.children("option:selected").val();
		switch (filter.attr("id")) {
			case serviceRequest.options.filterTypeElement.attr("id"):
				$.bbq.pushState({ "type": val });
				break;
			case serviceRequest.options.filterStatusElement.attr("id"):
				$.bbq.pushState({ "status": val });
				break;
		}
} : serviceRequest.history.onFilterChange;
/*
*/
serviceRequest.history.setFilterState = (typeof (serviceRequest.history.setFilterState) === "undefined" || !serviceRequest.history.setFilterState)
 ? function (state) {
	serviceRequest.options.filtersElement.find("select").each(function (index, value) {
		switch ($(value).attr("id")) {
			case serviceRequest.options.filterTypeElement.attr("id"):
				$(value).val(state.type);
				break;
			case serviceRequest.options.filterStatusElement.attr("id"):
				$(value).val(state.status);
				break;
		}
	});
} : serviceRequest.history.setFilterState;
/**
 * this responds to setDate events
 */
serviceRequest.history.showHistory = (typeof (serviceRequest.history.showHistory) === "undefined" || !serviceRequest.history.showHistory)
 ? function (historyState) {
	serviceRequest.options.dateElement.dateManager('setDate', historyState);

	// set selected elements on filters in case change is because of URL hash edit, rather than UI interaction (SET SELECTED YEAR OMITTED FOR THIS EXAMPLE)
	serviceRequest.history.setFilterState(historyState);
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
					date = new Date(e.date*1000);
					$header = $('<h2></h2>').attr('rel', i);
					$header.append($('<span></span>').addClass('last-updated').html((date.getUTCMonth()+1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear().toString().slice(2)));
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
				serviceRequest.options.historyElement.find('.accordion:visible').hide('blind', function(){
					serviceRequest.options.historyElement.append($accordion.accordion({
						autoHeight: false,
						collapsible: true,
						active: false
					}).hide());
					$accordion.show('blind')
				});
				// serviceRequest.options.historyElement.html(htmlViewFromAjaxCall);
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
	
} : serviceRequest.history.showHistory;