/*
 * Author: MadJon
 */

/**
 * hashchange listeners for certain parts of
 * (must be outside of jquery stuff)
 */
/*
*///

// // Declare the Global object.
// Global = (typeof (Global) == "undefined" || !Global)
//  ? function () { }
//  : Global;

var Global = {
	
	vars: {
		dialog: {
			serviceRequestSubject: 'This is a test subject for %i',
			serviceRequestBody: 'Dear Archstone Representative, \n I am writing to you regarding issue %i'
		}
	},
	
	/* Bind all the jQuery events */
	bindEvents: function() {
		// dialog functionality
		Global.bindDialogs();

		// autoclear for textareas and text-boxes
		Global.autoclear();
		
		if($('textarea').length > 0)Textarea.bindEvents();
	},
	/**
	 * Display the Email Dialog
	 * I can refactor this into its own object if need be.
	 */
	bindDialogs: function()
	{
		// Email Dialog
		// $('.cta-email').click(function(){
		// 	var $h2 = $(this).parents('.discreet-accordion h2');
		// 	var title = $(this).attr('title');
		// 	$.get('dialog-email.html', {request_id: $h2.attr('rel')}, function(data, response){
		// 		if(response == 'success')
		// 		{
		// 			$('<div></div>').html(data).dialog({
		// 				resizable: false,
		// 				height: "auto",
		// 	      width: "auto",
		// 				modal:true,
		// 				title: title
		// 			});
		// 		}
		// 	});
		// 	return false;
		// });
		// $('.cta-lease').click(function(){
		// 	console.log('HEY!')
		// 	$('#dialog-lease').dialog({
		// 		resizable: false,
		// 		height: "auto",
		// 	      width: "auto",
		// 		modal:true,
		// 		title: $(this).attr('title')
		// 	});
		
		// One Dialog to rule them all
		$('.cta-dialog').click(function(){
			var title = $(this).attr('title');
			$.get($(this).attr('href'), 
				{
				'rel': $(this).attr('rel'),
				'page': window.location.pathname
				},
				function(data, response){
					if(response == 'success')
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
	},
	init: function()
	{
		Global.bindEvents();
		if($.cookie('archstone_bookmarked') == window.location.pathname)
		{
			$('header a.bookmark').html('Bookmarked');
		}
	},
	/* Autoclear */
	autoclear: function(){
		// Auto Clear Form Fields When Active
		$('input[type=text].autoclear, input[type=password].autoclear, textarea.autoclear')
		  .click(function(){
		    if($(this).val() == $(this).data('autoclear'))
			  {
			    $(this).removeClass('autoclear');
				$(this).val('');
			  }
			})
			.focus(function(){
			  if($(this).val() == $(this).data('autoclear'))
			    {
				  $(this).removeClass('autoclear');
				  $(this).val('');
				}
			})
			.blur(function(){
			  if($(this).val() == ''){
			    $(this).addClass('autoclear');
			    $(this).val($(this).data('autoclear'));
			  }
			})
			.each(function(){
			  $(this).data('autoclear', $(this).val());
			});
	}
}

var Textarea = {
	
	bindEvents: function()
	{
		Textarea.bindCharLimit();
		Textarea.bindResize();
	},
	/**
	 * character limit for textareas
	 */
	bindCharLimit: function()
	{
		$('textarea.with-limit').each(function(){
			var $limit = $(this).parents('.form-element').find('.char-limit');
			$(this).data('limit', parseInt($limit.html()));
			$(this).keyup(Textarea.updateCharLimit);
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
			if($('.error .char-limit').length == 0)$('button.submit').prop('disabled', false);
		}
	},
	/**
	 * Textarea resize with typing
	 */
	bindResize: function()
	{
		$('textarea.auto-resize').keyup(Textarea.resizeIt);
	},
	resizeIt: function()
	{
	  var str = $(this).val();
	  var cols = $(this).attr('cols');
		var minRows = $(this).data('minRows');
		if(typeof minRows == 'undefined' || minRows == ''){
			minRows = $(this).attr('rows');
			$(this).data('minRows', minRows);
		}
	  var linecount = 0;
	  $.each(str.split( "\n" ), function( i, e ) {
	    linecount += 1 + Math.floor( e.length / cols ); // take into account long lines
	  });
	  if(minRows <= linecount)$(this).attr('rows', linecount);
	}
}
/*
*///
var Accordion = {
	init: function()
	{
		var is_open = $('.discreet-accordion').length == 0;
		if(is_open)is_open = 0;
		$('.accordion').accordion({
			autoHeight: false,
			collapsible: true,
			active: is_open
		});
		$('.ui-icon').removeClass('ui-icon-triangle-1-e');
	}
};


$(function(){
	
	Global.init();
	if($('.accordion').length == 1)Accordion.init();
});
