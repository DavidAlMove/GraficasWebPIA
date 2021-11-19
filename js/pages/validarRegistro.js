$(document).ready(function () {



function blankRegister(){
    var name= document.getElementById("txtName").value;
    var email= document.getElementById("txtCorreo").value;
    var user= document.getElementById("txtNameUsuario").value;
    var psswrd= document.getElementById("txtContraseña").value;
    
    
   
 
    if(name==""){
        alert("Favor de introducir sus datos personales");
        
    } 
    else if (user=="" || psswrd==""){
        alert("Favor de introducir un nombre de usuario y contraseñas validos");
    } 
    
    
   if (email=="")
    {
        alert("Favor de introducir su correo electronico");
    }
    else 
    {
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
    })


  function validateEmail(email) {
                 var input = document.createElement('input');

                    input.type = 'email';
                    input.required = true;
                    input.value = email;

                     return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(email);
             }



    
    function validar_clave(password) {
        
        if (password.length >= 8) {
    
            var mayuscula = false;
            var minuscula = false;
            var numero = false;
            var caracter_raro = false;

            for (var i = 0; i < password.length; i++) {
                if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                    
                    mayuscula = true;
                } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                    
                    minuscula = true;
                } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                    
                    numero = true;
                      }
                else{
                   caracter_raro = true;
                }
            }
            if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
               return true;
            }
        }
       return false;
    }
  
  })