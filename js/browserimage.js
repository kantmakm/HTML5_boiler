var Background;
// This is adapted from:
// http://growmedia.ca/blog/2009/10/14/resizable-full-browser-background-image-with-jquery-preserving-aspect-ratio/
// http://css-tricks.com/766-how-to-resizeable-background-image/
(function($){

	Background = {
		ration: false,
		
		
		getImageRatio: function(src)
		{
			var img = new Image();
			img.onload = function() {
				ratio = this.height/this.width;
				Background.resizeNow('#background-image');
			}
			img.src = src;
		},
		
		
		resizeNow: function(target)
		{
			return $(target).each(function(){
				//Gather browser dimensions
				var browserwidth = $(window).width();
				var browserheight = $(window).height();
				//Resize image to proper ratio
				if ((browserheight/browserwidth) > ratio) {
				    $(this).height(browserheight);
				    $(this).width(browserheight / ratio);
				    $(this).children().height(browserheight);
				    $(this).children().width(browserheight / ratio);
				} else {
				    $(this).width(browserwidth);
				    $(this).height(browserwidth * ratio);
				    $(this).children().width(browserwidth);
				    $(this).children().height(browserwidth * ratio);
				}
				//Make sure the image stays center in the window
				$(this).children().css('left', (browserwidth - $(this).width())/2);
				$(this).children().css('top', (browserheight - $(this).height())/2);
			});
		},
		
		init: function()
		{
			console.log('INIT!!');
			if($('#background-image').length == 1)
			{
				$(window).resize(function() {
					console.log('resize!')
		  		Background.resizeNow('#background-image');
				});
				Background.getImageRatio($('#background-image img').attr('src'));
			}
		}
	}
})(jQuery);
// The following is the corresponding HTML
// <!-- The Stretchy Background Image -->
// <div id="background-image">
// 	<img class="source-image" src="/images/bkgd_1.jpg" />
// </div>
// <script type="text/javascript">Background.init(); </script>