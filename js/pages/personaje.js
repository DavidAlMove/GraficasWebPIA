$(document).ready(function(){

    var counter = 1;

	$("#btnAdelante").click(function(){
		counter++;
		if(counter>4){
			counter=1;
		}
		$(".personajeSkinSelect").attr("src","http://localhost:8080/GW/GraficasWebPIA/media/images/characters/"+counter+".png");
		$(".personajeSkinSelect").attr("id", counter);
	});

	$("#btnAtras").click(function(){
		counter--;
		if(counter<1){
			counter=4;
		}
		$(".personajeSkinSelect").attr("src","http://localhost:8080/GW/GraficasWebPIA/media/images/characters/"+counter+".png");
		$(".personajeSkinSelect").attr("id", counter);
	});

	$("#btnAceptar").click(function(){
		console.log(counter);
		counter=counter; // ???????????????????????????????????????????????
	});

    $(".btnAceptar").click(function(){
        var i = parseInt($(".skinTurnPlayer").attr('id'), 10);
        var n = parseInt($(".skinTurnIA").attr('id'), 10);

        if(localStorage.getItem("Player"+i) != null){
            var player = localStorage.getItem("Player"+i);
            player = JSON.parse(player);
            var eskin = $(".personajeSkinSelect").attr('id');
            player['skin'] = selectSkin(eskin);
            localStorage.setItem("Player"+i, JSON.stringify(player));
            i = i+1;
            $(".skinTurnPlayer").attr('id', i);
        }else if(localStorage.getItem("IA"+n) != null){
            var ia = localStorage.getItem("IA"+n);
            ia = JSON.parse(ia);
            ia['skin'] = selectSkin($(".personajeSkinSelect").attr('id'));
            localStorage.setItem("IA"+n, JSON.stringify(ia));
            n = n+1;
            $(".skinTurnIA").attr('id', n);
        }else{
            $(".btnAceptar").attr('href', "http://localhost:8080/GW/GraficasWebPIA/pages/game.php");
        }
    });

    function selectSkin(skinId){
        var skin = "";
        switch(skinId){
            case "1":
                skin = "ZombieA";
                break;
            case "2":
                skin = "RobotA";
                break;
            case "3":
                skin = "AlienA";
                break;
            case "4":
                skin = "FreddieA";
                break;
        }
        return skin;
    }
    
});