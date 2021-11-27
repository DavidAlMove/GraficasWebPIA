<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>

	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>

	 <link rel="stylesheet" href="<?php echo $link; ?>css/scores.css"/>
	<title>
		brawlGuys
	</title>
</head>
<!--<body>
<img class="bg" src="bg.gif" alt="Italian Trulli">
</body>-->

<body>
	<?php session_start();
	require_once("../php/models/punctuations.php"); ?>

	<div class="scores">
		<img id="board" src="<?php echo $link; ?>media/images/scores/GAME UI-03.png" alt="Italian Trulli">

		
		<?php
			$i = 1;
			$scoreboard = Punctuations::getScoreboard();
			foreach ($scoreboard as $user => $value) {
				$x = $i + 42;
				echo '<img id="n'.$i.'" src="'.$link.'media/images/scores/GAME UI-'.$x.'.png" alt="Italian Trulli">
				<label id="n'.$i.'l">'.$value["USERNAME"].' ha obtenido: '.$value["VICTORIES"].' victorias!</label>';
				$i++;
			}
		?>

		<a href="<?php echo $link; ?>pages/settings.php"><img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-09.png" alt="Italian Trulli"></a>

		<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">
	</div>

</body>

</html>