<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>

		<?php
		//Esta dirección es de mi local, pueden cambiarla a su conveniencia.
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
		?>
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
					name: 'MapTwo',
					type: 'model',
					path: '<?php echo $link; ?>models/maps/mapaMine2.fbx'
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
					name: 'Particle',
					type: 'texture',
					path: '<?php echo $link; ?>media/images/particle.png'
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
				}
			];

			Resources.loadResources(resources).then(() => {
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
		<?php //session_start(); ?>
		<div id="scene-section"></div>
	</body>
</html>