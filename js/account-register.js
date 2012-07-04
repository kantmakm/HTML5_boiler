// might already exist, if it does don't overwrite it
var accounts = (typeof (accounts) === "undefined" || !accounts) ? {} : accounts;

// accounts-register
accounts.register = function(){
	accounts.register.autocomplete();
};
accounts.register.autocomplete = function()
{
	$( "#autocomplete-community" ).autocomplete({
		source: "communities.json",
		minLength: 2,
		select: function( event, ui ) {
			$(this).removeClass('autoclear');
			if(typeof ui.item.address !== 'undefined')$('#autocomplete-address').val(ui.item.address).removeClass('autoclear');
		},
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
};

$(function(){
	accounts.register();
});