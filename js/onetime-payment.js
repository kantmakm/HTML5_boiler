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
			console.log(payments.options.$payment.$label);
			payments.options.$payment.$label.each(function(){
				$(this).html("$" + value.formatMoney(2, '.', ','));
			});
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
	payments.options.$payment.$balances.keydown(function(e){
		console.log(e.keyCode);
		if(e.keyCode == 13)
		{
			console.log('blur!');
			$(this).blur();
		}
	}).blur(function(e){
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
	// add Account button
	payments.options.$account.$addButton.live('click', function(){
		payments.options.$account.$label.fadeOut(function(){
			$(this).html('').show();
		});
		payments.options.$account.$replacement.show();
		payments.options.$account.$information.hide();
		payments.options.$accordion.multiAccordion('options', 'locked', [0,1,3]);
		payments.options.$accordion.multiAccordion('activate', 2);
		return false;
	});
	// remove account button
	payments.options.$account.$removeButton.click(function(){
		payments.options.$account.$label.fadeOut(function(){
			$(this).html($('<a href="#"></a>').addClass('add-button').html('add account')).fadeIn();
		});
		payments.options.$accordion.multiAccordion('lock', 3);
		payments.options.$accordion.multiAccordion('lock', 2);
		payments.options.$account.$information.hide('blind');
		return false;
	});
	// replace account button
	payments.options.$account.$replaceButton.click(function(){
		payments.options.$account.$label.fadeOut(function(){
			$(this).html('').show();
		});
		payments.options.$accordion.multiAccordion('options', 'locked', [0,1,3]);
		payments.options.$account.$replacement.show('blind');
		payments.options.$account.$information.hide('blind');
		return false;
	});
	// "add new account" form submission
	payments.options.$account.$replacement.children('form').submit(function(){
		$.getJSON($(this).attr('action'), $(this).serialize(), function(data, reponse){
			// we're going to have to do some logic here to handle if they enter bad (not invalid) data.
			// for now, this assumes that the JSON is communicating that everything worked out.
			
			payments.options.$account.$replacement.hide('blind');
			payments.options.$account.$information.show('blind');
			payments.options.$accordion.multiAccordion('options', 'locked', []);
			payments.options.$accordion.multiAccordion('options', 'active', []);
		});
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
	payments.options.$payment.$label.each(function(){
		$(this).html("$" + value.formatMoney(2, '.', ','));
	});
};