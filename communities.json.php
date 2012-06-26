<?php
$return = array(
	array(
		'id' => 1,
		'label' => "community one",
		"value" => "Community One",
		'address' => "123 fake st"
	),
	array(
		'id' => 2,
		'label' => "community two",
		"value" => "Community Two",
		'address' => "321 fake st"
	),
	array(
		'id' => 3,
		'label' => "community three",
		"value" => "Community Three",
		'address' => "123 fake ave"
	),
);
echo json_encode($return);
?>