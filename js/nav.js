// Check for "module/category" definition, then add functionality with the "module/category"
// file: customers.search.dashboard.js
if (typeof (global) === "undefined" || !global) {
  throw "global must be previously defined to use nav.js";
}
// Declare the global.nav object.
global.nav = (typeof (global.nav) === "undefined" || !global.nav)
 ? function () { }
 : global.nav;

// timeout var; used for setTimeout/clearTimeout
global.nav.t = (typeof (global.nav.t) === "undefined" || !global.nav.t) ? 0 : global.nav.t;

// init method; Bind Events
global.nav.init = (typeof (global.nav.init) === "undefined" || !global.nav.init)
 ? function () {
	
		// Drop the dropdown nav on hover
		$('ul.dropdown-nav li').hover(function(){
			clearTimeout(global.nav.t);
			$(this).parents('.dropdown-nav').addClass('hover');
			$(this).addClass('hover').siblings().removeClass('siblings');
			var $ul = $(this).children('ul');
			global.nav.t = setTimeout(function(){
				$ul.stop().animate({
					'height': $ul.data('height')
				});
			}, 100);
		}, function(){
			var $ul = $(this).children('ul');
			global.nav.t = setTimeout(function(){
				$ul.stop().animate({'height': 0}, function(){
					$(this).parents('.dropdown-nav').removeClass('hover');
				});
			}, 100);
		});
		// Go through the dubmenus and save the height so we can drop it like its hot on hover
		$('ul.dropdown-nav ul').each(function(){
			$(this).data('height', $(this).height());
			$(this).height(0);
		})
		// if you hover overthe submenu that dropped down, keep it dropped
		.hover(function(){
			clearTimeout(global.nav.t);
			$(this).stop().animate({
				'height': $(this).data('height')
			});
		}, function(){
			global.nav.t = setTimeout(function(){
				$(this).stop().animate({'height': 0}, function(){
					$(this).parents('.dropdown-nav').removeClass('hover');
				});
			}, 100);
		});
	
} : global.nav.init;

$(function(){
	global.nav.init();
})