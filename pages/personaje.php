<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>

	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>

	<link rel="stylesheet" href="<?php echo $link; ?>css/design.css"/>
	<link rel="stylesheet" href="<?php echo $link; ?>css/mapscss.css"/>

	<title>Personaje</title>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	
<script type="text/javascript">

var counter = 1;

$(document).ready(function() {

	$("#btnAdelante").click(function(){
		counter++;
		if(counter>4){
			counter=1;
		}
		$("#personaje").attr("src","http://localhost/GraficasWebPIA-bryan/media/images/characters/"+counter+".png");

		
	});

	$("#btnAtras").click(function(){
		counter--;
		if(counter<1){
			counter=4;
		}
		$("#personaje").attr("src","http://localhost/GraficasWebPIA-bryan/media/images/characters/"+counter+".png");
		
		
	});


	$("#btnAceptar").click(function(){
		console.log(counter);
		counter=counter;

	});


});
</script> 
</head>
<body>
	<?php session_start(); ?>


			<div class="containerS">

					<img src="<?php echo $link; ?>media/images/select_char/GAME UI-06.png" alt="Italian Trulli">

				<img src="<?php  echo $link; ?>media/images/select_char/GAME UI-51.png" alt="Italian Trulli" id="btnAtras">


				<img src="http://localhost/GraficasWebPIA-bryan/media/images/characters/1.png" alt="Italian Trulli" id="personaje">
				


				<a href="<?php echo $link; ?>pages/game.php"><img src="<?php  echo $link; ?>media/images/select_char/GAME UI-53.png" alt="Italian Trulli" id="btnAceptar"></a>

				<img src="<?php  echo $link; ?>media/images/select_char/GAME UI-52.png" alt="Italian Trulli" id="btnAdelante">
			</div>

	
	<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">
</body>
</html>