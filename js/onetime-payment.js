// might already exist, if it does don't overwrite it
var payments = (typeof (payments) === "undefined" || !payments) ? {} : payments;

// payments-onetime
payments.options = {};
payments.onetime = function(options){
	
	payments.options = options;

	// slider
	payments.options.$payment.$percentageSlider.slider({
		value:10,
		min: 0,
		max: 100,
		range: 'min',
		slide: function( event, ui ) {
			var $radio = $(this).parent().find('input[type=radio]');
			
			if($radio.length === 1 && !$radio.prop('checked'))$radio.prop('checked', true);
			value = (ui.value/100)*payments.options.$balance.total;
			$( this ).next().val( "$" + value.formatMoney(2, '.', ',') );
			payments.options.$payment.$label.html("$" + value.formatMoney(2, '.', ','));
		},
		stop: function(event, ui) {
			var $radio = $(this).parent().find('input[type=radio]');
			var $textbox = $(this).next();
			var stateObj = { payment_amount: parseFloat($textbox.val().replace(/[^0-9\.]+/g, ''))};

			eval('stateObj.' + $radio.attr('name') + ' = "' + $radio.val() + '"');
			$.bbq.pushState(stateObj);
		}
	});
	payments.options.$payment.$percentageSlider.find('.ui-slider-range').addClass('ui-corner-left');// jquery styling
	
	/**
	 * bindEvents
	 */
	payments.options.$payment.$type.change(function(e){
		var evaluate = 'var stateObj = {' + $(e.srcElement).attr('name') + ' : "' + $(e.srcElement).val() + '"};';
		eval(evaluate);
		if(typeof stateObj !== 'undefined')$.bbq.pushState(stateObj);
	});
	payments.options.$payment.$balances.blur(function(e){
		var $radio = $(this).parent().find('input[type=radio]');
		var numberVal = parseFloat($(this).val().replace(/[^0-9\.]+/g, ''));
		var evaluate = 'var stateObj = {' + $radio.attr('name') + ' : "' + $radio.val() + '"};';
		$(this).val("$" + numberVal.formatMoney(2, '.', ','));
		eval(evaluate);
		stateObj.payment_amount = numberVal;
		$.bbq.pushState(stateObj);
	}).focus(function(){
		var numberVal = parseFloat($(this).val().replace(/[^0-9\.]+/g, ''));
		if(isNaN(numberVal))numberVal = payments.options.state.payment_amount;
		$(this).val(numberVal);
	});
	payments.options.$account.$addButton.live('click', function(){
		payments.options.$accordion.multiAccordion('unlock', 2);
		payments.options.$accordion.multiAccordion('activate', 2);
		return false;
	});
	payments.options.$account.$removeButton.click(function(){
		// lock the payment confirmation pane
		payments.options.$accordion.multiAccordion('lock', 3);
		payments.options.$accordion.multiAccordion('lock', 2);
		payments.options.$account.$label.html($('<a href="#"></a>').addClass('add-button').html('add account'));
		return false;
	});
	
};
payments.onetime.hashChange = function(state) {
	state.payment_amount = parseFloat(state.payment_amount);
	var value, $selectedRadio;
	
	// paymentType radio button
	payments.options.$payment.$type.each(function(i,e){
		if($(e).val() === state.payment_type)$selectedRadio = $(e);
	});
	$selectedRadio.prop('checked', true)
	
	// get the value
	switch(state.payment_type)
	{
		case "full":
			value = (payments.options.$balance.total);
			break;
		case "percentage":
			var percent = parseInt((parseFloat(state.payment_amount)/parseFloat(payments.options.$balance.total))*100);
			value = state.payment_amount;

			// percentage Slider
			payments.options.$payment.$percentageSlider
				.slider('value', percent)
				.next().val("$" + state.payment_amount.formatMoney(2, '.', ','));
			break;
		case "other":
			var numberVal = parseFloat($selectedRadio.parent().next().val().replace(/[^0-9\.]+/g, ''));
			// empty "other" field, lets populate it
			if(isNaN(numberVal))
			{
				$selectedRadio.parent().next().val("$" + state.payment_amount.formatMoney(2, '.', ','));
				value = state.payment_amount;
			}
			else
			{
				value = numberVal;
				$selectedRadio.parent().next().val("$" + value.formatMoney(2, '.', ','));
			}
			break;
	}

	// payment amount
	payments.options.$payment.$label.html("$" + value.formatMoney(2, '.', ','));
	
};