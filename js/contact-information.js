// might already exist, if it does don't overwrite it
var accounts = (typeof (accounts) === "undefined" || !accounts) ? {} : accounts;

accounts.switchable = function(options)
{
	accounts.switchable.options = options;
	accounts.switchable.options.switchable.find('li input[value=""]').parents('li').hide();
	
	accounts.switchable.options.toggleButton.toggle(accounts.switchable.show, accounts.switchable.hide);
	
	accounts.switchable.options.form.submit(function(){
		accounts.switchable.hide();
	});
};
accounts.switchable.show = function()
{
	accounts.switchable.options.switchable.addClass('switchable-edit');
	accounts.switchable.options.switchable.find('li p').fadeOut();
	accounts.switchable.options.switchable.find('li:hidden').show('blinds');
	accounts.switchable.options.toggleButton.find('span:eq(0)').html('Save');
};
accounts.switchable.hide = function()
{
	$.getJSON('contact-information.json', accounts.switchable.options.form.serialize(), function(data, response){
		if(response === 'success')
		{
			accounts.switchable.options.toggleButton.find('span:eq(0)').html('Edit');
			accounts.switchable.options.switchable.removeClass('switchable-edit');
			accounts.switchable.options.switchable.find('li p').fadeIn();
			accounts.switchable.options.switchable.find('li:not(.address) input').each(function(i,e){
				var $p = $(this).siblings('p');
				if($(this).val() == ''){
					$p.remove();
					if($(this).is(':visible')){
						$(this).parents('li').hide('blinds');
					}else{
						$(this).parents('li').hide();
					}
				}else{
					if($p.length == 0)$p = $('<p></p>').insertAfter(this);
					$p.html($(this).val());
				}
			});
			accounts.switchable.options.switchable.find('li.address').each(function(i,e){
				var address;
				var $p = $(this).find('p');
				address = $(this).find('.street').val() + '<br>';
				address += $(this).find('.city').val() + ', ' + $(this).find('.state').val() + ' ' + $(this).find('.zip').val();
				
				if($p.length == 0)$p = $('<p></p>').appendTo(this);
				$p.html(address);
				
			});
		}else{
			// MVC3 validation
			accounts.switchable.show();
		}
	});
};