$(document).ready(function(){
	
	$(".btnRegister").click(function(){
		var password = $(".txtPassword").val();
		var email = $(".txtEmail").val();

		console.log("email: " + email, "Password: " + password)
		loginUser(email, password);
	});

	function loginUser(user_email, user_password){
		var userData = {
			vAction: 'SU',
			user_email: user_email,
			user_password: user_password
		};

		console.log(userData);

		$.ajax({
			url: '../php/controllers/login.php',
			type: 'POST',
			data: userData,
			dataType: 'json',
			success: function(data){
				if(data) {
                    window.location = "../index.php";
                } else {
                    Swal.fire(
                      'Incorrect data or the user does not exist',
                      '',
                      'error'
                    )
                }
           },
			error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.warn(XMLHttpRequest.responseText);
	                alert("Status de papu: " + textStatus);
	                alert("Error papu: " + errorThrown);
	            	}
		})
	}
});