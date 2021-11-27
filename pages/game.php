<!DOCTYPE html>
<html>
<?php session_start(); ?>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>

		<link rel="stylesheet" href="../css/game.css">
		<?php
		//Esta dirección es de mi local, pueden cambiarla a su conveniencia.
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
		?>


<script type="text/javascript" src="../js/pages/facebook.js"></script>
	 <script type="text/javascript">
		 
		 function shareFB(){
			 var score= 0;
			 shareScore(score);
		 }
	 </script>
	</head>

	<script src="<?php echo $link; ?>js/lib/jquery-3.6.0.min.js"></script>
	<script src="<?php echo $link; ?>js/lib/three.js"></script>
	<script src="<?php echo $link; ?>js/lib/FBXLoader.js"></script>
	<script src="<?php echo $link; ?>js/lib/SkeletonUtils.js"></script>
	<script src="<?php echo $link; ?>js/lib/GLTFLoader.js"></script>
	<script src="<?php echo $link; ?>js/lib/MTLLoader.js"></script>
	<script src="<?php echo $link; ?>js/lib/OBJLoader.js"></script>
	<script src="<?php echo $link; ?>js/lib/fflate.min.js"></script>
	<script src="<?php echo $link; ?>js/lib/OBB.js"></script>
	<!-- <script src="<?php echo $link; ?>js/animation/AnimationMixer.js"></script>-->

	<!--<script src="https://unpkg.com/three"></script>
	<script scr="https://unpkg.com/three/examples/jsm/libs/fflate.min.js"></script>
	<script scr="https://unpkg.com/fflate"></script>
	<script src="https://cdn.jsdelivr.net/npm/fflate/umd/index.js"></script>
    <script src="https://unpkg.com/three/examples/js/loaders/FBXLoader.js"></script>-->

	<script type="module">
		import Application from "../js/engine/Application.js";
		import FightScene from "../js/game/scenes/FightScene.js";
		import Resources from "../js/engine/Resources.js";
		
		$(document).ready(() => {
			// Ahora se pueden registrar las direcciones de los recursos en un almacén
			// de recursos y obtenerlos después a través de la llave (primer parámetro)
			const resources = [
				{
					name: 'MapOne',
					type: 'model',
					path: '<?php echo $link; ?>models/maps/piratas-map.fbx'
				},
				{
					name: 'MapTwo',
					type: 'model',
					path: '<?php echo $link; ?>models/maps/navidad-map.fbx'
				},
				{
					name: 'MapThree',
					type: 'model',
					path: '<?php echo $link; ?>models/maps/minecraft-map.fbx'
				},
				{
					name: 'MapFour',
					type: 'model',
					path: '<?php echo $link; ?>models/maps/espacio-map.fbx'
				},
				{
					name: 'PlayerBase',
					type: 'model',
					path: '<?php echo $link; ?>models/characters/characterMedium.fbx'
				},
				{
					name: 'AstroGun',
					type: 'model',
					path: '<?php echo $link; ?>models/items/astroGun.fbx'
				},
				{
					name: 'Sword',
					type: 'model',
					path: '<?php echo $link; ?>models/items/sword.fbx'
				},
				{
					name: 'Shield',
					type: 'model',
					path: '<?php echo $link; ?>models/items/shield.fbx'
				},
				{
					name: 'ZombieA',
					type: 'texture',
					path: '<?php echo $link; ?>models/characters/skins/zombieA.png'
				},
				{
					name: 'RobotA',
					type: 'texture',
					path: '<?php echo $link; ?>models/characters/skins/robot.png'
				},
				{
					name: 'AlienA',
					type: 'texture',
					path: '<?php echo $link; ?>models/characters/skins/alienA.png'
				},
				{
					name: 'CharacterIdle',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/idle.fbx'
				},
				{
					name: 'CharacterWalk',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/walk.fbx'
				},
				{
					name: 'CharacterPunch',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/punch.fbx'
				},
				{
					name: 'CharacterKick',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/kick.fbx'
				},
				{
					name: 'CharacterJump',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/jump.fbx'
				},
				{
					name: 'CharacterDeath',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/death.fbx'
				},
				{
					name: 'CharacterBlock',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/block.fbx'
				},
				{
					name: 'CharacterShoot',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/shoot.fbx'
				},
				{
					name: 'CharacterAttack',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/attack.fbx'
				},
				{
					name: 'CharacterShield',
					type: 'animation',
					path: '<?php echo $link; ?>models/animations/shield.fbx'
				},
				{
                    name: 'CharacterSpecialPunch',
                    type: 'animation',
                    path: '<?php echo $link; ?>models/animations/special-punch.fbx'
                },
                {
                    name: 'CharacterSpecialKick',
                    type: 'animation',
                    path: '<?php echo $link; ?>models/animations/special-kick.fbx'
                },
                {
                    name: 'Laser',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/laser.wav'
                },
                {
                    name: 'PunchA',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/punch-a.wav'
                },
                {
                    name: 'PunchB',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/punch-b.wav'
                },
                {
                    name: 'SwordA',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/sword-a.wav'
                },
                {
                    name: 'SwordB',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/sword-b.wav'
                },
                {
                    name: 'PickUp',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/pickup.wav'
                },
                {
                    name: 'Spark',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/spark.wav'
				},
				{
                    name: 'SnowMusic',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/music/snow.mp3'
				},
				{
                    name: 'MinecraftMusic',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/music/minecraft.mp3'
				},
				{
                    name: 'PiratesMusic',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/music/pirates.mp3'
				},
				{
                    name: 'SpaceMusic',
                    type: 'audio',
                    path: '<?php echo $link; ?>media/sounds/music/space.mp3'
				},
				{
                    name: 'Particle',
                    type: 'texture',
                    path: '<?php echo $link; ?>media/images/particle.png'
                },
				{
                    name: 'DaySkybox',
                    type: 'cubemap',
                    path: '<?php echo $link; ?>models/maps/skyboxes/day/',
					images: [
						'px.png',
						'nx.png',
						'py.png',
						'ny.png',
						'pz.png',
						'nz.png'
					]
                },
				{
                    name: 'EveningSkybox',
                    type: 'cubemap',
                    path: '<?php echo $link; ?>models/maps/skyboxes/evening/',
					images: [
						'px.png',
						'nx.png',
						'py.png',
						'ny.png',
						'pz.png',
						'nz.png'
					]
                },
				{
                    name: 'SunsetSkybox',
                    type: 'cubemap',
                    path: '<?php echo $link; ?>models/maps/skyboxes/sunset/',
					images: [
						'px.png',
						'nx.png',
						'py.png',
						'ny.png',
						'pz.png',
						'nz.png'
					]
                }
			];

			Resources.loadResources(resources).then(() => {
				$('#loader').hide();
				// La clase Application controla todo el flujo de la aplicación
				const app = new Application();

				// Se pueden crear escenas independientes. Todo el código relacionado a una escena
				// se ubica únicamente en su propio archivo. Ver el archivo js/game/scenes/FightScene.js
				const fightScene = new FightScene({
					id: "scene-section",
					width: window.innerWidth,
					height: window.innerHeight
				});

				// Se prepara la aplicación
				app.prepare();

				// Se especifica la escena principal de la aplicación (la que se va a renderizar y actualizar)
				app.setScene(fightScene);

				// Se inicia la aplicación. Esto inicia la escena y comienza el game loop.
				app.run();
			});
		});
	</script>

	<body>
		<p style="display: none;" class="userIdClassP" value="500"></p>
		<div class="center">
			<img id="loader" class="loader" alt="loading" src="<?php echo $link; ?>media/images/icon.png">
		</div>
		<div id="scene-section"></div>

		<div id="winMenu" class="win">
			<img src="<?php echo $link; ?>media/images/victory/GAME UI-04.png" alt="Italian Trulli">
			<img src="<?php  echo $link; ?>media/images/victory/GAME UI-49.png" alt="Italian Trulli" id="btnShare"  onclick="shareFB();">
		</div>
		
		<div id="gameOverMenu" class="gO">
			<img src="<?php echo $link; ?>media/images/game_over/GAME UI-07.png" alt="Italian Trulli">
			<img src="<?php  echo $link; ?>media/images/game_over/GAME UI-54.png" alt="Italian Trulli" id="btnPA">
			<a href="<?php echo $link; ?>index.php"><img src="<?php  echo $link; ?>media/images/game_over/GAME UI-55.png" alt="Italian Trulli" id="btnExit"></a>
		</div>

		<div id="pauseMenu" class="pausa">
			<img src="<?php echo $link; ?>media/images/pausa/GAME UI-02.png" alt="Italian Trulli">
			<img src="<?php  echo $link; ?>media/images/pausa/GAME UI-38.png" alt="Italian Trulli" id="btnResume">
			<!--<a href="scoreboards.html"><button id="btn2">Button2</button></a>-->
			<img src="<?php  echo $link; ?>media/images/pausa/GAME UI-39.png" alt="Italian Trulli" id="btnRestart">
			<img src="<?php  echo $link; ?>media/images/pausa/GAME UI-40.png" alt="Italian Trulli" id="btnOptions">
			<img src="<?php  echo $link; ?>media/images/pausa/GAME UI-41.png" alt="Italian Trulli" id="btnHelp">
			<a href="<?php echo $link; ?>index.php"><img src="<?php  echo $link; ?>media/images/pausa/GAME UI-42.png" alt="Italian Trulli" id="btnExit"></a>
		</div>
	</body>
</html>