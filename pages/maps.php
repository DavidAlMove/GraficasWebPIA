<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>

	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>

	<link rel="stylesheet" href="<?php echo $link; ?>css/design.css"/>
	<link rel="stylesheet" href="<?php echo $link; ?>css/mapscss.css"/>

	<title>Maps</title>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>

<script type="text/javascript">

var counter = 1;

$(document).ready(function() {

	$("#btnAdelante").click(function(){
		counter++;
		if(counter>4){
			counter=1;
		}
		$("#map").attr("src","http://localhost:8080/GW/GraficasWebPIA/media/images/mapas/"+counter+".jpg");

		
	});

	$("#btnAtras").click(function(){
		counter--;
		if(counter<1){
			counter=4;
		}
		$("#map").attr("src","http://localhost:8080/GW/GraficasWebPIA/media/images/mapas/"+counter+".jpg");
		
		
	});


	$("#btnAceptar2").click(function(){
		console.log(counter);
		counter=counter;

	});


});
</script> 

</head>


<body>
	<?php session_start(); ?>


			<div class="containerS">

					<img src="<?php echo $link; ?>media/images/select_map/GAME UI-05.png" alt="Italian Trulli">

				<img src="<?php  echo $link; ?>media/images/select_map/GAME UI-51.png" alt="Italian Trulli" id="btnAtras">


				<img src="http://localhost/GraficasWebPIA-bryan/media/images/mapas/1.jpg" alt="Italian Trulli" id="map">
				


				<button id="btnAceptar2"><a href="<?php echo $link; ?>pages/personaje.php"><img src="<?php  echo $link; ?>media/images/select_map/GAME UI-53.png" alt="Italian Trulli" id="btnAceptar"></a></button>

				<img src="<?php  echo $link; ?>media/images/select_map/GAME UI-52.png" alt="Italian Trulli" id="btnAdelante">

			
			</div>

	
	<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">
</body>
</html>