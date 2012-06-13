/*
 * Author:
 */

(function($){
	/*
	*///
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
			if($('.date-manager').length > 0)DateManager.init();
		},
		/**
		 * Display the Email Dialog
		 * I can refactor this into its own object if need be.
		 */
		bindDialogs: function()
		{
			$('.cta-email').click(function(){
				$h2 = $(this).parents('.discreet-accordion h2');
				$('#dialog-email').dialog({
					resizable: false,
					height: "auto",
		      width: "auto",
					modal:true,
					title: $(this).attr('title')
				});
				if($h2.length > 0)
				{
					$('#dialog-email #mail-subject').val(Global.vars.dialog.serviceRequestSubject.replace('%i', $h2.attr('rel')));
					$('#dialog-email #mail-body').html(Global.vars.dialog.serviceRequestBody.replace('%i', $h2.attr('rel')));
				}
				return false;
			});
			$('.cta-lease').click(function(){
				console.log('HEY!')
				$('#dialog-lease').dialog({
					resizable: false,
					height: "auto",
		      width: "auto",
					modal:true,
					title: $(this).attr('title')
				});
			});
			$('.ui-dialog-titlebar').removeClass('ui-corner-all').addClass('ui-corner-top');
			
			return false;
		},
		init: function()
		{
			Global.bindEvents();
			Nav.init();
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
				collapsible: true,
				active: is_open
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
					var color = $('.year-selector ul li:first a').hasClass('blue')?'green':$('.year-selector ul li:first a').hasClass('blue-green')?'blue':'blue-green';
					$('<li></li>')
						.addClass('year-' + year)
						.html('<a href="#" class="' + color + '">' + year + '</a></li>')
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
	
	var Nav = {
		t: 0, //setTimeout()
		init: function()
		{
			$('ul.primary-nav li.half-pint').hover(function(){
				clearTimeout(Nav.t);
				$(this).addClass('hover').siblings().removeClass('siblings');
				// Nav.drop();
				console.log(' li hover');
				var $ul = $(this).children('ul');
				Nav.t = setTimeout(function(){
					$ul.stop().animate({
						'height': $ul.data('height')
					});
				}, 100)
			}, function(){
				console.log(' li off');
				var $ul = $(this).children('ul');
				Nav.t = setTimeout(function(){
					$ul.stop().animate({
						'height': 0
					});
				}, 100)
			});
			
			$('ul.primary-nav ul').each(function(){
				$(this).data('height', $(this).height());
				$(this).height(0);
			}).hover(function(){
				console.log('hover ul(clear) ' + Nav.t);
				clearTimeout(Nav.t);
				$(this).stop().animate({
					'height': $(this).data('height')
				});
			}, function(){
				console.log(' off ul')
				Nav.t = setTimeout(function(){
					$(this).stop().animate({'height': 0});
				}, 100);
			});
		},
		// drop: function()
		// {
		// 	var $ul = $('ul.primary-nav li.hover').find('ul');
		// 	$ul.height($ul.data('height')).addClass('open');
		// },
		// pull: function()
		// {
		// 	var $ul = $('ul.primary-nav li.hover ul.open').removeClass('open').height(0);
		// }
	}
	
	$(function(){
		Global.init();
		if($('.accordion').length == 1)Accordion.init();
	})
})(jQuery);