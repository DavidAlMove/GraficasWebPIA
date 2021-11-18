<?php
	header('Access-Control-Allow-Origin: *');
	require_once('../db/db.php');
	require_once('../models/register.php');

	$resp = null;
	$action = $_POST['vAction'];

	if($action == "I"){
		$username = $_POST['username'];
		$user_name = $_POST['user_name'];
		$email = $_POST['user_email'];
		$password = $_POST['user_password'];

		$resp = Register::registerUser($username, $user_name, $email, $password);
	}
	else if($action == 'SA'){
		
	}

	echo json_encode($resp);
?>