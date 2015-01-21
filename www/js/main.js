$(function(){
	var couleursVote = new Array("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF");
	$("#nombreSujets").hide();
	$("#couleursSujets").hide();
	$("#demarre_vote").hide();
	$("#vote").hide();
	var creation = false;
	var nbrVotant = 5;
	var nbtVote = 0;

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
		var nbrSujet = $('.selected').attr('value');
		if(key == "couleursSujets" && creation == false){	
			initNombreSujet(nbrSujet);
		} else if(key == "vote") {
			for(var i = 0; i < nbrSujet ; i++){
				$('#bulletins').append("<button class='bulletin' style='background-color:"+couleursVote[i]+"'>"+$('#sujet').attr(name)+"</button>");
			}
		}
	}

	function getAction(key) {
		return $("#" + key + " action").attr("name");
	}

	function gererAction(actionName) {
		switch (actionName) {
			case "vider_couleursSujets" :
				$("#sujets").empty();
				creation = false;
				break;
		}
	}

	function initNombreSujet(nbr){
		for(var i=0; i<nbr; i++){
			$('#sujets').append("<canvas class='couleurSujet' style='background-color:"+couleursVote[i]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' />");
		}
		creation = true;
	}

	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});
});