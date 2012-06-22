/*
 * Author: MadJon
 */

/**
 * hashchange listeners for certain parts of
 * (must be outside of jquery stuff)
 */
/*
*///

// Declare the global object.
global = (typeof (global) === "undefined" || !global)
 ? function () {
		global.bindEvents();
} : global;

global.monthNames = (typeof (global.monthNames) === "undefined" || !global.monthNames)
 ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : global.monthNames;

global.bindEvents = (typeof (global.bindEvents) === "undefined" || !global.bindEvents)
	? function () {
		// dialog functionality
		global.bindEvents.dialog();

		// autoclear for textareas and text-boxes
		global.bindEvents.autoclear();
		
		// accordion bindEvents
		global.bindEvents.accordion();

		if($('textarea').length > 0)global.textarea.bindEvents();
	} : global.bindEvents;

global.bindEvents.dialog = (typeof (global.bindEvents.dialog) === "undefined" || !global.bindEvents.dialog)
	? function () {
		// One Dialog to rule them all
		$('.cta-dialog').live('click', function(){
			var title = $(this).attr('title');
			$.get($(this).attr('href'), 
				{
				'rel': $(this).attr('rel'),
				'page': window.location.pathname
				},
				function(data, response){
					if(response === 'success')
					{
						$('<div></div>').html(data).dialog({
							resizable: false,
							height: "auto",
				      width: "auto",
							modal:true,
							title: title
						});
					}
				});
			return false;
		});

		$('.ui-dialog-titlebar').removeClass('ui-corner-all').addClass('ui-corner-top');
	
		return false;
	}
	: global.bindEvents.dialog;

global.bindEvents.autoclear = (typeof (global.bindEvents.autoclear) === "undefined" || !global.bindEvents.autoclear)
	? function () {
		// Auto Clear Form Fields When Active
		$('input[type=text].autoclear, input[type=password].autoclear, textarea.autoclear')
		  .click(function(){
		    if($(this).val() === $(this).data('autoclear'))
			  {
			    $(this).removeClass('autoclear');
				$(this).val('');
			  }
			})
			.focus(function(){
			  if($(this).val() === $(this).data('autoclear'))
			    {
				  $(this).removeClass('autoclear');
				  $(this).val('');
				}
			})
			.blur(function(){
			  if($(this).val() === ''){
			    $(this).addClass('autoclear');
			    $(this).val($(this).data('autoclear'));
			  }
			})
			.each(function(){
			  $(this).data('autoclear', $(this).val());
			});
	}
	: global.bindEvents.autoclear;

global.bindEvents.accordion = (typeof (global.bindEvents.accordion) === "undefined" || !global.bindEvents.accordion)
	? function () {
		if($('.accordion').length == 0)return false;
		var is_open = $('.discreet-accordion').length === 0;
		if(is_open)is_open = 0;
		$('.accordion').accordion({
			autoHeight: false,
			collapsible: true,
			active: is_open
		});
		$('.ui-icon').removeClass('ui-icon-triangle-1-e');

	}
	: global.bindEvents.accordion;


global.textarea = {
	
	bindEvents: function()
	{
		global.textarea.bindCharLimit();
		global.textarea.bindResize();
	},
	/**
	 * character limit for textareas
	 */
	bindCharLimit: function()
	{
		$('textarea.with-limit').each(function(){
			var $limit = $(this).parents('.form-element').find('.char-limit');
			$(this).data('limit', parseInt($limit.html()));
			$(this).keyup(global.textarea.updateCharLimit);
		});
	},
	updateCharLimit: function()
	{
		var count = $(this).val().length;
		var left = $(this).data('limit')-count;
		var $charLimit = $(this).parents('.form-element').find('.char-limit');
		$charLimit.html(left);
		if(left < 0)
		{
			$charLimit.parent().addClass('error');
			$('button.submit').prop('disabled', true);
		}else{
			$charLimit.parent().removeClass('error');
			if($('.error .char-limit').length === 0)$('button.submit').prop('disabled', false);
		}
	},
	/**
	 * global.textarea resize with typing
	 */
	bindResize: function()
	{
		$('textarea.auto-resize').keyup(global.textarea.resizeIt);
	},
	resizeIt: function()
	{
	  var str = $(this).val();
	  var cols = $(this).attr('cols');
		var minRows = $(this).data('minRows');
		if(typeof minRows === 'undefined' || minRows === ''){
			minRows = $(this).attr('rows');
			$(this).data('minRows', minRows);
		}
	  var linecount = 0;
	  $.each(str.split( "\n" ), function( i, e ) {
	    linecount += 1 + Math.floor( e.length / cols ); // take into account long lines
	  });
	  if(minRows <= linecount)$(this).attr('rows', linecount);
	}
};

$(function(){
	// magic!
	global();
});
