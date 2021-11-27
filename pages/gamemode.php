<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/design2.css"/>
    <link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>
    <title>Document</title>
    <?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>
    <script src="<?php echo $link; ?>js/lib/jquery-3.6.0.min.js"></script>
</head>
<body>
    <?php
    session_start();
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
        if(isset($_SESSION['id'])){
            echo'<input type="hidden" class="inputUserId" name="userIdSession" value="'.$_SESSION['id'].'">';
        }else{
            echo '<input type="hidden" class="inputUserId" name="userIdSession" value="-1">';
        }
	?>
    
    <div class="container">
        <div class="row">
            <p class="col-lg-6" id="jug">Elige la cantidad de jugadores:</p>
            <input class="col-lg-6" type="number" name="txtPlayers" id="txtPlayers" max="3" min="1">
        </div>
        <div class="row">
            <p class="col-lg-6" id="iat">Elige la cantidad de IA:</p>
            <input class="col-lg-6" type="number" name="txtIA" id="txtIA" max="3" min="1">
        </div>
        <div class="row">
            <p class="col-lg-6" id="iatD">Elige la dificultad de IA:</p>
           
            <select name="txtIADif" id="txtIADif">
                <option disabled selected value> -- select an option -- </option>
                <option value="facil">Fácil</option>
                <option value="media">Media</option>
                <option value="dificil">Difícil</option>
            </select>
        </div>
        <div class="row">
        <p class="col-lg-6" id="iatP">Elige Si deseas items:</p>

        <select name="txtItems" id="txtItems">
                <option disabled selected value> -- select an option -- </option>
                <option value="items">Con Items</option>
                <option value="noItems">Sin Items</option>
            </select>
        </div>

        <input type="button" value="Aceptar" id="btnGamemode">
    </div>

    <script src="<?php echo $link; ?>js/pages/gamemode.js"></script>
</body>
</html>