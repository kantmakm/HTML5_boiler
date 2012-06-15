// Check for "module/category" definition, then add functionality with the "module/category"
// file: customers.search.dashboard.js
if (typeof (Global) == "undefined" || !Global) {
  throw "Global must be previously defined to use nav.js";
}
// Declare the Global.nav object.
Global.nav = (typeof (Global.nav) == "undefined" || !Global.nav)
 ? function () { }
 : Global.nav;

// timeout var; used for setTimeout/clearTimeout
Global.nav.t = (typeof (Global.nav.t) == "undefined" || !Global.nav.t) ? 0 : Global.nav.t;

// init method; Bind Events
Global.nav.init = (typeof (Global.nav.init) == "undefined" || !Global.nav.init)
 ? function () {
	
		// Drop the dropdown nav on hover
		$('ul.dropdown-nav li').hover(function(){
			clearTimeout(Global.nav.t);
			$(this).parents('.dropdown-nav').addClass('hover');
			$(this).addClass('hover').siblings().removeClass('siblings');
			var $ul = $(this).children('ul');
			Global.nav.t = setTimeout(function(){
				$ul.stop().animate({
					'height': $ul.data('height')
				});
			}, 100)
		}, function(){
			var $ul = $(this).children('ul');
			Global.nav.t = setTimeout(function(){
				$ul.stop().animate({'height': 0}, function(){
					$(this).parents('.dropdown-nav').removeClass('hover');
				});
			}, 100)
		});
		// Go through the dubmenus and save the height so we can drop it like its hot on hover
		$('ul.dropdown-nav ul').each(function(){
			$(this).data('height', $(this).height());
			$(this).height(0);
		})
		// if you hover overthe submenu that dropped down, keep it dropped
		.hover(function(){
			clearTimeout(Global.nav.t);
			$(this).stop().animate({
				'height': $(this).data('height')
			});
		}, function(){
			Global.nav.t = setTimeout(function(){
				$(this).stop().animate({'height': 0}, function(){
					$(this).parents('.dropdown-nav').removeClass('hover');
				});
			}, 100);
		});
	
} : Global.nav.init;

$(function(){
	Global.nav.init();
})