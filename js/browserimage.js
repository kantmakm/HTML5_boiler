var archstone = (typeof (archstone) === "undefined" || !archstone) ? {} : archstone;

// This is adapted from:
// http://growmedia.ca/blog/2009/10/14/resizable-full-browser-background-image-with-jquery-preserving-aspect-ratio/
// http://css-tricks.com/766-how-to-resizeable-background-image/
// (function($){

	archstone.background = {
		ratio: false,
		
		
		getImageRatio: function(src)
		{
			var img = new Image();
			img.onload = function() {
				archstone.background.ratio = this.height/this.width;
				archstone.background.resizeNow('#background-image');
			};
			img.src = src;
		},
		
		
		resizeNow: function(target)
		{
			return $(target).each(function(){
				//Gather browser dimensions
				var browserwidth = $(window).width()+30;
				var browserheight = $(window).height();
				//Resize image to proper ratio
				if ((browserheight/browserwidth) > archstone.background.ratio) {
				    $(this).height(browserheight);
				    $(this).width(browserheight / archstone.background.ratio);
				    $(this).children().height(browserheight);
				    $(this).children().width(browserheight / archstone.background.ratio);
				} else {
				    $(this).width(browserwidth);
				    $(this).height(browserwidth * archstone.background.ratio);
				    $(this).children().width(browserwidth);
				    $(this).children().height(browserwidth * archstone.background.ratio);
				}
				//Make sure the image stays center in the window
				$(this).children().css('left', ((browserwidth - $(this).width())/2)-15);
				$(this).children().css('top', (browserheight - $(this).height())/2);
			});
		},
		
		init: function()
		{
			if($('#background-image').length === 1)
			{
				$(window).resize(function() {
		  		archstone.background.resizeNow('#background-image');
				});
				archstone.background.getImageRatio($('#background-image img').attr('src'));
			}
		}
	};
	
	archstone.background.init();
	
// })(jQuery);
// The following is the corresponding HTML
// <!-- The Stretchy Background Image -->
// <div id="background-image">
// 	<img class="source-image" src="/images/bkgd_graphite_burst.png" />
// </div>
// <script type="text/javascript">archstone.background.init(); </script><!-- This needs to be here to resize this before the page finishes loading instead of after -->