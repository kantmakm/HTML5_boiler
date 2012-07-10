// might already exist, if it does don't overwrite it
var payments = (typeof (payments) === "undefined" || !payments) ? {} : payments;

// payments-onetime
payments.options = {};
payments.onetime = function(options){
	
	payments.options = options;

	// slider
	payments.options.percentageSlider.slider({
		value:10,
		min: 0,
		max: 100,
		range: 'min',
		slide: function( event, ui ) {
			var $radio = $(this).parent().find('input[type=radio]');
			
			if($radio.length === 1 && !$radio.prop('checked'))$radio.prop('checked', true);
			value = (ui.value/100)*payments.options.totalBalance;
			$( this ).next().val( "$" + value.formatMoney(2, '.', ',') );
			payments.options.paymentAmount.html("$" + value.formatMoney(2, '.', ','));
		},
		stop: function(event, ui) {
			var $radio = $(this).parent().find('input[type=radio]');
			var $textbox = $(this).next();
			var stateObj = { payment_amount: parseFloat($textbox.val().replace(/[^0-9\.]+/g, ''))};

			eval('stateObj.' + $radio.attr('name') + ' = "' + $radio.val() + '"');
			// eval('stateObj.' + $textbox.attr('name') + ' = ' + ui.value);
			$.bbq.pushState(stateObj);
		}
	});
	payments.options.percentageSlider.find('.ui-slider-range').addClass('ui-corner-left');// jquery styling
	
	/**
	 * bindEvents
	 */
	payments.options.paymentType.change(function(e){
		var evaluate = 'var stateObj = {' + $(e.srcElement).attr('name') + ' : "' + $(e.srcElement).val() + '"};';
		eval(evaluate);
		if(typeof stateObj !== 'undefined')$.bbq.pushState(stateObj);
	});
	
	payments.options.textBalances.change(function(e){
		var $radio = $(this).parent().find('input[type=radio]');
		var numberVal = parseFloat($(this).val().replace(/[^0-9\.]+/g, ''));
		var evaluate = 'var stateObj = {' + $radio.attr('name') + ' : "' + $radio.val() + '"};';
		eval(evaluate);
		stateObj.payment_amount = numberVal;
		$.bbq.pushState(stateObj);
		// $(this).val(numberVal.formatMoney(2, '.', ','));
	}).focus(function(){
		var numberVal = parseFloat($(this).val().replace(/[^0-9\.]+/g, ''));
		$(this).val(numberVal);
	});
	
};
// payments.onetime.hideSection = function(section)
// {
// 	payments.options.(' h2.' + section).hide('blinds').next().hide('blinds');
// };
payments.onetime.hashChange = function(state) {
	console.log(state);
	state.payment_amount = parseFloat(state.payment_amount);
	var value, $selectedRadio;
	
	// paymentType radio button
	payments.options.paymentType.each(function(i,e){
		if($(e).val() === state.payment_type)$selectedRadio = $(e);
	});
	$selectedRadio.prop('checked', true)
	
	// get the value
	switch(state.payment_type)
	{
		case "full":
			value = (payments.options.totalBalance);
			break;
		case "percentage":
			var percent = parseInt((parseFloat(state.payment_amount)/parseFloat(payments.options.totalBalance))*100);
			value = state.payment_amount;

			// percentage Slider
			payments.options.percentageSlider
				.slider('value', percent)
				.next().val("$" + state.payment_amount.formatMoney(2, '.', ','));
			break;
		case "other":
			var numberVal = parseFloat($selectedRadio.parent().next().val().replace(/[^0-9\.]+/g, ''));
			console.log(isNaN(numberVal));
			// empty "other" field, lets populate it
			if(isNaN(numberVal))
			{
				console.log('what?');
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
	payments.options.paymentAmount.html("$" + value.formatMoney(2, '.', ','));
	
	// payments.options.paymentType.val(state.payment_type);
};