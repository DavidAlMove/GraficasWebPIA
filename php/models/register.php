<?php
header('Access-Control-Allow-Origin: *');
	require_once('../db/db.php');

	class Register{
		private $db;

		public static function registerUser($username, $user_name, $email, $password){
			$db = Connection::connect();
			$result = $db->query("CALL proc_user('I', '".$username."', '".$user_name."', '".$email."', '".$password."');");
			return $result;
			Connection::disconnect($db);
		}
	}
?>