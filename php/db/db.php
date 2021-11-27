<?php
class Connection{

public static function connect() {
		$databasehost = "localhost:3307";
		$databasename = "brawl_guys_db";
		$databaseuser = "root";
		$databasepass = "";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_errno) {
				echo "Error con la conexion a la base de datos";
		}

		return $mysqli;
	}

public static function disconnect($mysqli) {
		mysqli_close($mysqli);
	}
}

?>
