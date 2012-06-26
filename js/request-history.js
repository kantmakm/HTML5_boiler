var serviceRequest = function () {};
serviceRequest.options = {};

/**
 * init method for request-history page
 */
serviceRequest.history = function (options) {
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
};

/**
 * Clicking a Year/changing a filter triggers these methods
 */
serviceRequest.history.onYearChange = function (year) {
		$.bbq.pushState({ "year": year });
};
serviceRequest.history.onFilterChange = function (filter) {
		var val = filter.children("option:selected").val();
		switch (filter.attr("id")) {
			case serviceRequest.options.filterTypeElement.attr("id"):
				$.bbq.pushState({ "type": val });
				break;
			case serviceRequest.options.filterStatusElement.attr("id"):
				$.bbq.pushState({ "status": val });
				break;
		}
};

/**
 * this sets the correct filters
 */
serviceRequest.history.setFilterState = function (state) {
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
};
/**
 * this responds to hash Change events
 */
serviceRequest.history.showHistory = function (historyState) {
	var id = historyState.status + '-' + historyState.type + '-' + historyState.year;
	var $accordion = $('.accordion#' + id);
	
	// animate the dateManager
	serviceRequest.options.dateElement.dateManager('setDate', historyState);
	// set the correct filter
	serviceRequest.history.setFilterState(historyState);
	
	// requested accordion doesn't exist. lets get it!
	if($accordion.length === 0)
	{
		// make the JSON call to pull the accordion's data
		$.getJSON('request-history.json', historyState, function(data, response){
			if(response === 'success')
			{
				var $accordion = $('<div></div>').addClass('accordion').addClass('discreet-accordion').attr('id', id);
				var $header, $body, date;
				// build each row and append it to the $accordion (which will be our future accordion)
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
				// animate the old accordions out and initialize/animate the new one in 
				serviceRequest.options.historyElement.find('.accordion:visible').hide('blind', function(){
					serviceRequest.options.historyElement.append($accordion.accordion({
						autoHeight: false,
						collapsible: true,
						active: false
					}).hide());
					$accordion.show('blind')
				});
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
	
};