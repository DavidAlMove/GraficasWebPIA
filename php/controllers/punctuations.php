<?php
	header('Access-Control-Allow-Origin: *');
	require_once('/GraficasWebPIA/db/db.php');
	require_once('/GraficasWebPIA/models/punctuations.php');

    $resp = null;
    $action = $_POST['vAction'];

    if($action == 'I'){
        $userId = $_POST['userId'];
        
        $resp = Punctuations::insertPunctuation($userId);
    }

    echo json_encode($resp);
?>