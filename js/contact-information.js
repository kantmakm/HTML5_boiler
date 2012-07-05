// might already exist, if it does don't overwrite it
var accounts = (typeof (accounts) === "undefined" || !accounts) ? {} : accounts;

accounts.switchable = function()
{
	console.log('switchable');
	$('.squared-box h1 .submit').toggle(function(){
		$('.switchable').addClass('switchable-edit');
		$('.switchable li p').fadeOut();
		$('.switchable li:hidden').show('blinds');
	}, function(){
		$('.switchable').removeClass('switchable-edit');
		$('.switchable li p').fadeIn();
		$('.switchable li input[value=""]').parents('li').hide('blinds');
	});
};

$(function(){
	accounts.switchable();
});