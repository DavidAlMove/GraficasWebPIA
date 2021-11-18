<?php
	require_once('../db/db.php');

	class Login{
		private $db;

		public static function selectUserByEmail($email, $password){
			$db = Connection::connect();
			$result = $db->query("CALL proc_user('SU', null, null, '".$email."', '".$password."');");
			if($result){
                while ($user = $result->fetch_assoc()) { 
                    return $user;
                }
			} else {
	             echo json_encode("No existe este usuario en la DB.");
	             return null;
			}

			Connection::disconnect($db);
		}
	}
?>