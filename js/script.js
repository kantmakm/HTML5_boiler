/*
 * Author:
 */

(function($){
	/*
	*///
	var Global = {
		/* Bind all the jQuery events */
		bindEvents: function() {
			// email functionality
			$('.email').click(Global.emailDialog);
			
			// bookmark functionality
			$('.bookmark').click(Global.bookmark);
			Global.autoclear();
			
			if($('textarea').length > 0)Textarea.bindEvents();
			if($('.date-manager').length > 0)DateManager.init();
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
			}else{
				$charLimit.parent().removeClass('error');
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
			$('.accordion').accordion({
						collapsible: true,
						active: false
					});
		}
	};
	/*
	*///
	var DateManager = {
		init: function()
		{
			$('.left-selector, .right-selector').click(function(){
				DateManager.moveYears($(this).hasClass('left-selector')?true:false);
				return false;
			});
			$('.year-selector ul li a').live('click', function(){
				DateManager.selectDate($(this).html());
				return false;
			})
		},
		moveYears: function(older)
		{
			var right = parseInt($('.year-selector .slider').css('right').replace('px', ''));
			var move;
			$('.year-selector .slider').stop( false, true);
			if(older == false && right < 0)
			{
				move = "+=247";
			}
			else if(older == true)
			{
				// need an extra year. add it before we move slide
				if(($('.year-selector ul').width()+247) > (741-right))
				{
					var year = (parseInt($('.year-selector ul li:first a').html())-1);
					$('<li></li>')
						.addClass('year-' + year)
						.html('<a href="#" class="blue">' + year + '</a></li>')
						.prependTo($('.year-selector ul'));
				}
				move = "-=247";
			}
			else
			{
				move = "0";
			}
			$('.year-selector .slider').animate({
				right: move
			});
			return false;
		},
		selectDate: function(year, month)
		{
			if(typeof month == 'undefined')
			{
				$('.year-selector .year-' + year)
					.addClass('active')
					.siblings()
					.removeClass('active');
			}
		}
	}
	$(function(){
		Global.init();
		if($('.accordion').length == 1)Accordion.init();
	})
})(jQuery);