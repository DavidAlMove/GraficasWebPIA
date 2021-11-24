$(document).ready(function() {
    var counter = 1;
	$("#btnAdelante").click(function(){
		counter++;
		if(counter>4){
			counter=1;
		}
		$("#map").attr("src","/media/images/mapas/"+counter+".jpg");
	});

	$("#btnAtras").click(function(){
		counter--;
		if(counter<1){
			counter=4;
		}
		$("#map").attr("src","/media/images/mapas/"+counter+".jpg");		
	});

	$("#btnAceptar2").click(function(){
		console.log(counter);
		counter=counter;
		switch (counter) {
			case 1:
				localStorage.setItem('map', 'MapOne');
				break;
			case 2:
				localStorage.setItem('map', 'MapTwo');
				break;
			case 3:
				localStorage.setItem('map', 'MapThree');
				break;
			case 4:
				localStorage.setItem('map', 'MapOne');
				break;
		}
	});
});