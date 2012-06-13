<?php
$return = array(
	// Request ID as key
	'014440' => array(
		'id'							=> '014440', //id
		'date' 						=> 1333324800, // unix timestamp for GMT/UTC (if you have an option, use UTC to avoid mySQL/timezone problems)
		'name' 						=> 'Garbage Disposal',
		'description'			=> 'Its clogged again. Stuck with the most disgusting sludge?',
		'description_cut'	=> 'Its clogged again. Stuck with the most ...',
		'status'					=> 'In Process',
		'email'						=> 'foo@bar.com',
		'instructions' 		=> 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
		'enter'						=> 1, // 1 for yes, 0 for no
		'pets'						=> 1,
		'alarm'						=> 0,
		'reporter'				=> 'Jane Smith'
	),                	
	'000012' => array(  	
		'id'							=> '000012', //id
		'date' 						=> 1331856000, // unix timestamp for GMT/UTC (if you have an option, use UTC to avoid mySQL/timezone problems)
		'name' 						=> 'Garbage Disposal',
		'description'			=> 'Disposal is not grinding properly. Makes a funny joke at my expense when I try to turn it on',
		'description_cut'	=> 'Disposal is not grinding properly. Makes a funny ...',
		'status'					=> 'Repaired Temporarily',
		'email'						=> 'bar@foo.com',
		'instructions' 		=> 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
		'enter'						=> 1, // 1 for yes, 0 for no
		'pets'						=> 1,
		'alarm'						=> 0,
		'reporter'				=> 'Jon Smith'
	),                	
	'048809' => array(  	
		'id'							=> '048809', //id
		'date' 						=> 1326499200, // unix timestamp for GMT/UTC (if you have an option, use UTC to avoid mySQL/timezone problems)
		'name' 						=> 'Air Conditioner',
		'description'			=> 'Air smells moldy when turned on. Hasn\'t rained in a while. ',
		'description_cut'	=> 'Air smells moldy when turned on. Hasn\'t rained in ...',
		'status'					=> 'Parts on Order',
		'email'						=> 'handy@man.com',
		'instructions' 		=> 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
		'enter'						=> 1, // 1 for yes, 0 for no
		'pets'						=> 1,
		'alarm'						=> 0,
		'reporter'				=> 'Jon Voight'
	)
);

echo json_encode($return);
?>