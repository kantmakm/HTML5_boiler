// might already exist, if it does don't overwrite it
var accounts = (typeof (accounts) === "undefined" || !accounts) ? {} : accounts;

accounts.switchable = function()
{
	$('.squared-box h1 .submit').toggle(function(){
		$('.switchable').addClass('switchable-edit');
	}, function(){
		$('.switchable').removeClass('switchable-edit');
	});
};

$(function(){
	accounts.switchable();
});