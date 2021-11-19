<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        $link = "http://localhost:8080/GW/GraficasWebPIA/";
    ?>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login</title>

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
                <h3>Hello again</h3>
                <p>Welcome to the battleground, pick one of your best!</p>
                <input type="submit" name="" value="Register"/><br/>
            </div>
            <div class="col-md-9 register-right">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Get into battle!</h3>
                        <div class="row register-form">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <input type="text" class="form-control txtEmail" placeholder="Email *" value="" />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control txtPassword" placeholder="Password *" value="" />
                                </div>
                                <input type="submit" class="btnRegister"  value="Login"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="../js/pages/login.js"></script>
</body>
</html>