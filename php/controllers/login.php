<?php
	header('Access-Control-Allow-Origin: *');
	require_once('../db/db.php');
	require_once('../models/login.php');

	$resp = null;
	$action = $_POST['vAction'];

	if($action == "SU"){
		$email = $_POST['user_email'];
		$password = $_POST['user_password'];

		$resp = Login::selectUserByEmail($email, $password);

		if($resp){
			session_start();
			$_SESSION['id'] = $resp['USER_ID'];
			$_SESSION['username'] = $resp['USERNAME'];
			$_SESSION['user_name'] = $resp['USER_NAME'];
			$_SESSION['email'] = $resp['USER_EMAIL'];

			$resp = true;
		}
	}
	else if($action == 'SA'){
		
	}

	echo json_encode($resp);
?>