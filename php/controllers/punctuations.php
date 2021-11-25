<?php
	header('Access-Control-Allow-Origin: *');
	require_once('/GraficasWebPIA/php/db/db.php');
	require_once('/GraficasWebPIA/php/models/punctuations.php');

    $resp = null;
    $action = $_POST['vAction'];

    if($action == 'I'){
        $userId = $_POST['userId'];
        
        $resp = Punctuations::insertPunctuation($userId);
    }

    echo json_encode($resp);
?>