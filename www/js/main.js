$(function(){
	$("#nombreSujets").hide();
	$("#couleursSujets").hide();

	$("#ecranLogo").on( "click", function(event){
		$("#ecranLogo").hide();
		gotoSection("nombreSujets");
	});

	/* Liste des boutons récurrents */
	var button = $(".content .navigation"); 

	// Gestion du clic sur les boutons de choix de chemin //
	button.click( function() {
		$(this).closest("div").hide();
		gotoSection($(this).attr("go"));
	});

	function gotoSection(key) {
		gererAction(getAction(key));
		$("#"+key).show();

		if(key == "couleursSujets"){
			var nbrSujet = $('.selected').attr('value');
			initNombreSujet(nbrSujet);
		}
			
	}

	function getAction(key) {
		return $("#" + key + " action").attr("name");
	}

	function gererAction(actionName) {
		switch (actionName) {
			case "vider_couleursSujets" :
				$("#sujets").empty();
				break;
		}
	}

	function initNombreSujet(nbr){
		for(var i=1; i<=nbr; i++){
			$('#sujets').append("<canvas class='couleurSujet' ></canvas><input type='text' />");
		}
	}

	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});
});