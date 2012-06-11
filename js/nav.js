var Nav = {
	init: function()
	{
		$('ul.primary-nav li').hover(function(){
			$(this).parent.show('blind');
		})
	}
}
