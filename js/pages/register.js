$(document).ready(function(){
	
	$(".btnRegister").click(function(){
		var username = $(".txtUsername").val();
		var user_name = $(".txtUser_Name").val();
		var password = $(".txtPassword").val();
		var email = $(".txtEmail").val();

		blankRegister();
		console.log("Username: " + username, "User name: " + user_name, "email: " + email, "Password: " + password)
		registerUser(username, user_name, email, password);
	});

	$("#btnLog").click(function(){
		window.location = "login.php";
	});

	function registerUser(username, user_name, user_email, user_password){
		var userData = {
			vAction: 'I',
			username: username,
			user_name: user_name,
			user_email: user_email,
			user_password: user_password
		};

		console.log(userData);

		$.ajax({
			url: '../php/controllers/register.php',
			type: 'POST',
			data: userData,
			dataType: 'json',
			success: function(data){
				alert("Usuario registrado!").then(function (result) {
                        window.location = "login.php";
                })
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.warn(XMLHttpRequest.responseText);
	                alert("Status de papu: " + textStatus);
	                alert("Error papu: " + errorThrown);
	            	}
		});
	}

	function blankRegister(){
		var name= $(".txtUsername").val();
		var email= $(".txtEmail").val();
		var user=  $(".txtUser_Name").val();
		var password= $(".txtPassword").val();
		
		if(name == ""){
			alert("Favor de introducir sus datos personales");
		} 
		else if (user == ""){
			alert("Favor de introducir un nombre de usuario valido");
		} 

		if (password == "") {
			alert("Introduzca una contraseña")
		}
		
	    if (email==""){
			alert("Favor de introducir su correo electronico");
		}
		else {
			var respuesta = validateEmail(email);
			if (!respuesta){
			alert("Introducir bien el correo electronico");
			}
		}  
	 }
	
	$(".form-group").submit(function (e) { 
			
			blankRegister();
			var password = document.getElementById("txtContraseña").value;
			var ps = validar_clave(password);
			if (ps == false || password =="") {
				
			   alert("La contraseña debe tener por lo minimo 8 caracteres, con por lo menos 1 Mayuscula, 1 minuscula, 1 numero y un signo")
	
			   }
		});
	
	  function validateEmail(email) {
		var input = document.createElement('input');

		input.type = 'email';
		input.required = true;
		input.value = email;

		return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(email);
	}

});