<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        $link = "http://localhost:8080/GraficasWebPIA-bryan/";
    ?>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Register</title>

    <link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/ICON-31.png"/>
	<link rel="stylesheet" href="../css/register.css"/>
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
</head>
<body>
    <?php session_start(); ?>
  <div class="container register">
        <div class="row">
            <div class="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                <h3>Welcome</h3>
                <p>You are 30 seconds away from beating everyone in your way!</p>
                <input type="submit" name="" value="Login"/><br/>
            </div>
            <div class="col-md-9 register-right">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Get into battle!</h3>
                        <div class="row register-form">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control txtUsername" id="txtNameUsuario" placeholder="Username *" value="" />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control txtUser_Name" id="txtName" placeholder="Your name*" value="" />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control txtPassword" id="txtContraseña" placeholder="Password *" value="" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="email" class="form-control txtEmail" id="txtCorreo" placeholder="Your Email *" value="" />
                                </div>
                                <input type="submit" class="btnRegister"  id="validar" value="Register"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="../js/pages/register.js"></script>
    <script src="../js/pages/validarRegistro.js"></script>

</body>
</html>