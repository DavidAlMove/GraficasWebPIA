<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>

	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/ICON-31.png"/>

	 <link rel="stylesheet" href="<?php echo $link; ?>css/scores.css"/>
	<title>
		brawlGuys
	</title>
</head>
<!--<body>
<img class="bg" src="bg.gif" alt="Italian Trulli">
</body>-->

<body>
	<?php session_start(); ?>

	<div class="scores">
<img id="board" src="<?php echo $link; ?>media/images/scores/GAME UI-03.png" alt="Italian Trulli">

<img id="n1" src="<?php echo $link; ?>media/images/scores/GAME UI-43.png" alt="Italian Trulli">

<label id="n1l">Aqui va el usuario 1 xD</label>

<img id="n2" src="<?php echo $link; ?>media/images/scores/GAME UI-44.png" alt="Italian Trulli">

<label id="n2l">Aqui va el usuario 2 xD</label>


<img id="n3" src="<?php echo $link; ?>media/images/scores/GAME UI-45.png" alt="Italian Trulli">

<label id="n3l">Aqui va el usuario 3 xD</label>

<img id="n4" src="<?php echo $link; ?>media/images/scores/GAME UI-46.png" alt="Italian Trulli">

<label id="n4l">Aqui va el usuario 4 xD</label>

<img id="n5" src="<?php echo $link; ?>media/images/scores/GAME UI-47.png" alt="Italian Trulli">

<label id="n5l">Aqui va el usuario 5 xD</label>

<img id="n6" src="<?php echo $link; ?>media/images/scores/GAME UI-48.png" alt="Italian Trulli">

<label id="n6l">Aqui va el usuario 6 xD</label>


<a href="<?php echo $link; ?>pages/settings.php"><img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-09.png" alt="Italian Trulli"></a>

<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">
</div>

</body>

</html>