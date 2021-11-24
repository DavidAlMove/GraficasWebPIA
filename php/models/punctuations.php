<?php
	require_once('../php/db/db.php');

    class Punctuations{
        private $db;

        public static function insertPunctuation($userId){
            $db = Connection::connect();
            $result = $db->query("CALL proc_punctuations('I', ".$userId.", null);");

            if($result){
                return true;
            }else{
                return false;
            }
            Connection::disconnect($db);
        }

        public static function getScoreboard(){
            $db = Connection::connect();
            $result = $db->query("CALL proc_punctuations('SAS', null, null);");

            if($result) {
                $scores = array();
                while($score = $result->fetch_assoc()) {
                  $scores[] = $score;
                }
                return $scores;
              } else {
                echo("Error, no trae nada de la db.");
                return null;
              }
              Connection::disconnect($db);
        }
    }
?>