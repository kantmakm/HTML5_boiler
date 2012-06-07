/*
 * Author:
 */

(function($){
	var Global = {
		/* Bind all the jQuery events */
		bindEvents: function() {
			// email functionality
			$('.email').click(Global.emailDialog);
			
			// bookmark functionality
			$('.bookmark').click(Global.bookmark);
		},
		/**
		 * Display the Email Dialog
		 * I can refactor this into its own object if need be.
		 */
		emailDialog: function()
		{
			$('#mail').dialog({
				height: "auto",
	      width: "auto",
				modal:true,
				title: $(this).attr('title')
			});
			return false;
		},
		/**
		 * Bookmark the current page
		 * I can refactor this into its own object if need be.
		 */
		bookmark: function(){
			$.cookie('archstone_bookmarked', window.location.pathname);
			$(this).html('Bookmarked');
			return false;
		},
		init: function()
		{
			Global.bindEvents();
			if($.cookie('archstone_bookmarked') == window.location.pathname)
			{
				$('header a.bookmark').html('Bookmarked');
			}
		}
	}
	var Accordion = {
		init: function()
		{
			$('.accordion').accordion({ removeClass: "ui-corner-all ui-corner-top"});
		}
	};
	$(function(){
		Global.init();
		if($('.accordion').length == 1)Accordion.init();
	})
})(jQuery);