<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost/GraficasWebPIA-bryan/";
	?>
	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>

	 <link rel="stylesheet" href="css/design.css"/>
	<title>
		Brawl Guys
	</title>
</head>
<!--<body>
<img class="bg" src="bg.gif" alt="Italian Trulli">
</body>-->


	<body>
		<?php session_start(); ?>
		<h1><?php echo $_SESSION['username'] ?></h1>
		<audio autoplay>
			<source src="<?php echo $link; ?>media/sounds/menum.mp3" type="audio/mp3">
		</audio>

			<div class="container">

				<img src="<?php echo $link; ?>media/images/menu_index/back_menu.png" alt="Italian Trulli">

				<a href="<?php echo $link; ?>pages/maps.php"><img src="<?php  echo $link; ?>media/images/menu_index/btn_play.png" alt="Italian Trulli" id="btn"></a>

				<!--<a href="scoreboards.html"><button id="btn2">Button2</button></a>-->

				<a href="<?php echo $link; ?>pages/register.php"><img src="<?php  echo $link; ?>media/images/menu_index/btn_game_mode.png" alt="Italian Trulli" id="btn2"></a>

				<a href="<?php echo $link; ?>pages/scoreboards.php"><img src="<?php  echo $link; ?>media/images/menu_index/btn_score.png" alt="Italian Trulli" id="btn3"></a>


				<a href="<?php echo $link; ?>pages/scoreboards.php"><img src="<?php  echo $link; ?>media/images/menu_index/btn_tutorial.png" alt="Italian Trulli" id="btn4"></a>

				<a href="<?php echo $link; ?>pages/creditos.php"><img src="<?php  echo $link; ?>media/images/menu_index/btn_credits.png" alt="Italian Trulli" id="btn5"></a>
			</div>

		<a href="<?php echo $link; ?>pages/settings.php"><img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-09.png" alt="Italian Trulli"></a>

		<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">

	</body>

</html>