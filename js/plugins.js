// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
 * Duplicatable sections 
 */
$.fn.duplicatable = function(method)
{
	var $this = $(this); 
	
	// methods to call
	var methods = {

		/* Make this element a Duplicatable widget */
		init: function(options){
			// set the widget settings
			$this.duplicatable.settings = $.extend({
				'addButton': 			$(this).find('.add'),
				'removeButton':		'.remove', // this will be used as $this.find($this.duplicatable.settings.removeButton)
				'controls': 			$(this).find('li.controls'),
				'cloneTemplateFilter': function($clone){
					$clone.find('input').val('').show();
					$clone.find('ul li span:not(button span)').remove();
					$clone.find('.remove').show();
					$clone.find('.input-validation-error').removeClass('input-validation-error');
				}
			}, options);
			// We'll be using a clone of the first row of the ul.duplicatable as the template.
			$this.duplicatable.settings.cloneTemplate = $this.children('li').not($this.duplicatable.settings.controls).eq(0).clone(true, true);
			// run the clone through a filter (which can be user-overidden on init)
			$this.duplicatable.settings.cloneTemplateFilter($this.duplicatable.settings.cloneTemplate);
			
			// add/remove button setup.
			$this.duplicatable.settings.addButton.click(function(){
				$this.duplicatable('add');
				return false;
			});
			// I'm not using $this.duplicatable.settings.removeButton.live().etc... because removeButtons can be removed and added.
			// setting a $this.duplicatable.settings to a $(jquery) element, will not account for others 
			$this.find($this.duplicatable.settings.removeButton)
				.live('click', function(){
					$this.duplicatable('remove', this);
					return this;
				})
				.eq(0)
				.hide();
		},
		
		/* Add method */
		add: function(){
			var $clone;
			// insert a deep clone of the cloneTemplate into the DOM.
			// this saves all the bindings and what-not
			$last = $this.children('li').not($this.duplicatable.settings.controls).last();
			$clone = $this.duplicatable.settings.cloneTemplate.clone(true, true);
			$clone.hide().insertAfter($last).show('blind');
			return false;
		},
		/* Remove method */
		remove: function(removeButton){
			
			if($this.children('li').not($this.duplicatable.settings.controls).length < 3)
			{
				$this.find('.remove').not(':hidden').hide('blind');
			}
			$(removeButton).parents('ul.duplicatable > li').not($this.duplicatable.settings.controls).last().hide('blind', function(){
				$(this).remove();
			});
		}
	};
	
	// Method calling logic 
  if ( methods[method] ) {
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
  }
};

/**
 * multiAccordion widget
 */
$.fn.multiAccordion = function(method)
{
	var $this = $(this);
	
	//* this method is reponsible for hiding/showing based on locked/active status
	function applyOptions()
	{
		if($this.multiAccordion.settings.active.length === 0){
			$this.children('h2').each(function(i,e){
				$this.multiAccordion.settings.active.push(i);
			});
		}
		
		$this.children('h2').each(function(i, e){
			var activeIndex = $this.multiAccordion.settings.active !== false ? $this.multiAccordion.settings.active.indexOf(i) : -1;
			var lockedIndex = $this.multiAccordion.settings.locked !== false ? $this.multiAccordion.settings.locked.indexOf(i) : -1;

			// inactive row; hide it
			if(activeIndex === -1 || lockedIndex !== -1)
			{
				$(this).removeClass('ui-state-active').next().not(':hidden').hide('blind');
			}
			// active, unlocked row; show it
			else if(activeIndex !== -1 && lockedIndex === -1)
			{
				$(this).addClass('ui-state-active').next().not(':visible').show('blind');
			}
		});
	};
	
	var methods = {
		/* initialize */
		init: function(options)
		{
			$this.multiAccordion.settings = $.extend({
				'locked': 	[],
				'active':		[]
			}, options);
			applyOptions();
			
			$this.children('h2').each(function(){
				var $head = $(this).addClass('ui-accordion-header').addClass('ui-state-active');
				$head.append('<span class="ui-icon"></span>').next().addClass('ui-accordion-content');
				$head.click(function(){
					var active = $this.multiAccordion.settings.active;
					var locked = $this.multiAccordion.settings.locked;
					if(active === false)active = [];
					if(locked === false)locked = [];
					var thisIndex = $this.children('h2').index($(this));

					
					// open
					if($this.multiAccordion.settings.active === false)$this.multiAccordion.settings.active = [];
					if($this.multiAccordion.settings.active.indexOf(thisIndex) === -1)
					{
						$this.multiAccordion.settings.active.push(thisIndex);
					// close
					}else{
						$this.multiAccordion.settings.active.splice($this.multiAccordion.settings.active.indexOf(thisIndex), 1);
						if($this.multiAccordion.settings.active.length == 0)$this.multiAccordion.settings.active = false;
					}
					applyOptions();
					
				});
			});
			
		},
		/* Set/Get options */
		options: function(options)
		{
			// the first argument is good
			if(typeof arguments[0] == 'string' && typeof $this.multiAccordion.settings[arguments[0]] !== 'undefined')
			{
				// second argument is good; treat as setter
				if(typeof arguments[1] !== 'undefined' && arguments[1] instanceof Array)
				{
					$this.multiAccordion.settings[arguments[0]] = arguments[1];
					applyOptions();
				}
				// second argument is not present/good; treat as getter
				else
				{
					return $this.multiAccordion.settings[arguments[0]];
				}
			}
		},
		lock: function(i)
		{
			var locked = $this.multiAccordion('options', 'locked');
			if(locked.indexOf(i) === -1)
			{
				locked.push(i);
				$this.multiAccordion('options', 'locked', locked);
			}
		},
		unlock: function(i)
		{
			var locked = $this.multiAccordion('options', 'locked');
			if(locked.indexOf(i) !== -1)locked.splice(locked.indexOf(i), 1)
			$this.multiAccordion('options', 'locked', locked);
		},
		activate: function(i)
		{
			var active = $this.multiAccordion('options', 'active');
			active = active === false ? [] : active;
			if(active.indexOf(i) === -1)
			{
				active.push(i);
				$this.multiAccordion('options', 'active', active);
			}
		},
		deactivate: function(i)
		{
			var active = $this.multiAccordion('options', 'active');
			active = active === false ? [] : active;
			if(active.indexOf(i) !== -1)active.splice(active.indexOf(i), 1)
			$this.multiAccordion('options', 'active', active);
		}
	};
	
	/* Method calling logic */
  if ( methods[method] ) {
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
  }
}


/********************************
 * adding bindEvents for widgets
 ********************************/
if($('ul.duplicatable').length > 0)
{
	archstone.bindEvents.duplicatable = function(){
		$('ul.duplicatable').duplicatable();
	};
}
// binding the custom multiAccordion widget
if($('.multi-accordion').length !== 0)archstone.bindEvents.multiAccordion = function() {
	$('.multi-accordion').multiAccordion();
};

// accordion binding (though it does not use a custom widget, I found it fitting that it be bound here)
if($('.accordion').length !== 0)
{
	archstone.bindEvents.accordion = function () {
		var is_open = $('.discreet-accordion').length === 0;
		if(is_open)is_open = 0;
		$('.accordion').accordion({
			autoHeight: false,
			collapsible: true,
			active: is_open
		});
		$('.ui-icon').removeClass('ui-icon-triangle-1-e');
	};
}

