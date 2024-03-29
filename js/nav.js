// Check for "module/category" definition, then add functionality with the "module/category"
// file: customers.search.dashboard.js
if (typeof (archstone) === "undefined" || !archstone) {
  throw "archstone must be previously defined to use nav.js";
}
/**
 * Declare the archstone.nav object.
 */
archstone.nav = function () {
	// Drop the dropdown nav on hover
	$('ul.dropdown-nav li').hover(function(){
		clearTimeout(archstone.nav.t);
		$(this).parents('.dropdown-nav').addClass('hover');
		$(this).addClass('hover').siblings().removeClass('siblings');
		var $ul = $(this).children('ul');
		archstone.nav.t = setTimeout(function(){
			$ul.stop().animate({
				'height': $ul.data('height')
			});
		}, 100);
	}, function(){
		var $ul = $(this).children('ul');
		archstone.nav.t = setTimeout(function(){
			$ul.stop().animate({'height': 0}, function(){
			});
			$ul.parents('.dropdown-nav').removeClass('hover');
		}, 100);
	});
	// Go through the dubmenus and save the height so we can drop it like its hot on hover
	$('ul.dropdown-nav ul').each(function(){
		$(this).data('height', $(this).height());
		$(this).height(0);
	})
	// if you hover overthe submenu that dropped down, keep it dropped
	.hover(function(){
		clearTimeout(archstone.nav.t);
		$(this).stop().animate({
			'height': $(this).data('height')
		});
	}, function(){
		var $this = $(this);
		archstone.nav.t = setTimeout(function(){			
			$this.stop().animate({'height': 1});
			$this.parents('.dropdown-nav').removeClass('hover');
		}, 100);
	});
};

// timeout var; used for setTimeout/clearTimeout
archstone.nav.t = 0;

$(function(){
	archstone.nav();
});