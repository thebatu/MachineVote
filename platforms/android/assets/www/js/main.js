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
		$('#sujets').append("<table><tr></tr><tr></tr></table>");
		var cases1tab = $('#sujets tr:eq(0)');
		cases1tab.css("height", "100px");
		var cases2tab = $('#sujets tr:eq(1)');

		for(var i=0; i<nbr; i++){
			if (i <= 2){
				if (nbr == 4 && i == 2){ //le troisieme choix parmi 4 choix est mis sur la ligne suivante
					cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[i]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' /></td>");
				}
				else{
					cases1tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[i]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' /></td>");
				}
			}
			else{ // les 4eme 5eme et 6eme choix sur la seconde ligne
				cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[i]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' /></td>");
			}
			
		}
		creation = true;
	}

	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});
});