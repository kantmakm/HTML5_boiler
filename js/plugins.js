// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

// $.fn.multiAccordion = function();

/**
 * Duplicatable sections 
 */
$.fn.duplicatable = function(method)
{
	// methods to call
	var methods = {
		/* Init */
		init: function(options){
			console.log('hey!');
			var $this = $(this);
			$this.duplicatable.settings = $.extend({
				'addButton': 			$(this).find('.add'),
				'removeButton':		$(this).find('.remove'),
				'controls': 			$(this).find('li.controls'),
				'templateCloneFilter': function(clone){
					clone.find('input').val('');
					clone.find('ul li span').remove();
					clone.find('.input-validation-error').removeClass('input-validation-error');
					clone.find('select');
				}
			}, options);
			$this.duplicatable.settings.templateClone = $this.children('li').not($this.duplicatable.settings.controls).eq(0);
			$this.duplicatable.settings.templateCloneFilter($this.duplicatable.settings.templateClone);
			
			$this.duplicatable.settings.addButton.click(function(){
				$this.duplicatable('add');
				return false;
			});
			$this.duplicatable.settings.removeButton.click(function(){
				$this.duplicatable('remove');
				return false;
			});
		},
		add: function(){
			var $this = $(this);
			console.log($(this));
			$last = $this.children('li').not($this.duplicatable.settings.controls).last();
			console.log($last);
			$this.duplicatable.settings.templateClone.clone(true, true).hide().insertAfter($last).show('blind');
			console.log('?yeah');
			if($this.children('li').not($this.duplicatable.settings.controls).length > 0)
			{
				$this.duplicatable.settings.removeButton.show('blind');
			}
			return false;
		},
		remove: function(){
			var $this = $(this);
			if($this.children('li').not($this.duplicatable.settings.controls).length < 3)
			{
				$this.duplicatable.settings.removeButton.hide('blind');
			}
			$this.children('li').not($this.duplicatable.settings.controls).last().hide('blind', function(){
				$(this).remove();
			});
		}
	};
	
	/**
	 * Method calling logic
	 */
  if ( methods[method] ) {
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
  }
};
$(function(){
	console.log($('ul.duplicatable').length);
	if($('ul.duplicatable').length > 0)$('ul.duplicatable').duplicatable();
});