<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>

	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>

	<link rel="stylesheet" href="<?php echo $link; ?>css/design2.css"/>
	<link rel="stylesheet" href="<?php echo $link; ?>css/mapscss2.css"/>

	<title>Personaje</title>
	<script src="<?php echo $link; ?>js/lib/jquery-3.6.0.min.js"></script>

</head>
<body>
	<?php session_start(); ?>

	<p class="cantidadPlayers"></p>
	<p class="cantidadIA"></p>
	<input type="hidden" name="skinTurnPlayer" class="skinTurnPlayer" id="1">
	<input type="hidden" name="skinTurnIA" class="skinTurnIA" id="1">
			<div class="containerS">
				<img src="<?php echo $link; ?>media/images/select_char/GAME UI-06.png" alt="Italian Trulli">
				<img src="<?php  echo $link; ?>media/images/select_char/GAME UI-51.png" alt="Italian Trulli" id="btnAtras">
				<img src="<?php echo $link; ?>media/images/characters/1.png" alt="Italian Trulli" class="personajeSkinSelect" id="1">
				<a class="btnAceptar"><img src="<?php  echo $link; ?>media/images/select_char/GAME UI-53.png" alt="Italian Trulli" id="btnAceptar"></a>
				<img src="<?php  echo $link; ?>media/images/select_char/GAME UI-52.png" alt="Italian Trulli" id="btnAdelante">
			</div>
	
	<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">
	<script src="<?php echo $link; ?>js/pages/personaje.js"></script>
</body>
</html>