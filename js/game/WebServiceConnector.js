export default class WebServiceConnector {
    static onWin(winnerId) {
        // Aquí puedes hacer lo necesario para registrar la victoria
        // winnerId es el id del ganador, si no gana un usuario con id, es nulo
        if (winnerId) {
            console.log(winnerId); // Ejemplo
            if(localStorage.getItem('isLoged') == 'true'){
                var playerUno = JSON.parse(localStorage.getItem('Player1'));
                if(localStorage.getItem('sessionId') == playerUno['idUser']){
                    var userData = {
                    userId: localStorage.getItem('sessionId'),
                    vAction: 'I'
                };
                    $.ajax({
                        url: '../php/controllers/punctuations.php',
                        type: 'POST',
                        data: userData,
                        dataType: 'json',
                        success: function(data){
                            Swal.fire(
                              'Se ha registrado la victoria.',
                              '',
                              'success'
                            )
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.warn(XMLHttpRequest.responseText);
                                alert("Status de papu: " + textStatus);
                                alert("Error papu: " + errorThrown);
                                }
                    });
                }
            }
        }
    }
}