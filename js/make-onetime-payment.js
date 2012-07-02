// might already exist, if it does don't overwrite it
var payments = (typeof (payments) === "undefined" || !payments) ? {} : payments;

// payments-register
payments.register = function(){
	payments.register.slider();
};
payments.register.slider = function(){
	$( ".slider" ).slider({
		value:10,
		min: 0,
		max: 100,
		range: 'min',
		slide: function( event, ui ) {
			var value = $(this).parents('.ui-accordion-content').prev().find('.right').html().replace(/[^0-9\.]+/g, '');
			var $radio = $(this).parent().find('input[type=radio]');
			
			if($radio.prop('selected'))
			value = (ui.value/100)*parseInt(value);
			$( this ).next().val( "$" + value.formatMoney(2, '.', ',') );
		}
	});
	$('.slider .ui-slider-range').addClass('ui-corner-left');
	$( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
};
payments.register.slider();