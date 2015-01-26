$(function(){
	var resultatVote = {bulletin0:0, bulletin1:0, bulletin2:0, bulletin3:0, bulletin4:0, bulletin5:0};
	var couleursVote = new Array("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF","#F778A1","#347C17","#7E3817","#8E35EF");
	var color = new Array();
	$("#nombreSujets").hide();
	$("#couleursSujets").hide();
	$("#demarre_vote").hide();
	$("#vote").hide();
	$("#validation_vote").hide();
	$("#fin_vote").hide();
	var creation = false;
	var nbrVotant = 4;
	var nbrVote = 0;
	/* Liste des boutons récurrents */
	var button = $(".content .navigation"); 

	$('.validation_vote').on("click", function(event){
		nbrVote++;
		var key = $('.bulletin').filter('.selected').attr('id');
		resultatVote[key] = resultatVote[key]+1;
	});


	/*
	 * Affiche les résultats une fois le vote finit
	*/
	function affichageResultats(nbr){
		var tmp;
		for(var i=0; i<nbr ; i++){			

			$('#resultats').append("<br>");
			
			for(var j=0 ; j<resultatVote['bulletin'+i]; j++){

				$('#resultats').append("<canvas class='vote' style='background-color:"+couleursVote[color[i]]+"'></canvas>");	

			}
		}
	}


	// Gestion du clic sur les boutons de choix de chemin //
	button.click( function() {
		$(this).closest("div").hide();
		gotoSection($(this).attr("go"));
	});

	/*
	 * Function main
	 * Redirection sur la div 
	*/ 
	function gotoSection(key) {
		gererAction(getAction(key));
		$("#"+key).show();
		var nbrSujet = $('.selected').attr('value');
		if(key == "couleursSujets" && creation == false){	
			initNombreSujet(nbrSujet);
		} else if(key == "vote") {
			initBulletins(nbrSujet);
		} else if(key == "resultats"){
			affichageResultats(nbrSujet);
		}
	}

	/*
	 * Récupère une action dans une div
	*/
	function getAction(key) {
		return $("#" + key + " action").attr("name");
	}

	/*
	 * Gère les actions qui ont été récupérés
	*/
	function gererAction(actionName) {
		switch (actionName) {
			case "vider_couleursSujets" :
				$("#sujets").empty();
				creation = false;
				break;
		}
	}

/*
*	change colors of the interface Couleurs des sujets
*/
	function randomColorGenerator(nbr){
		while(color.length < nbr){
			var presence = false;
			var tmpRandomColor = Math.floor((Math.random() * 10 ) );
			if(color.length == 0)
				color.push(tmpRandomColor);
			else{
				for(var key in color){
					if(color[key] == tmpRandomColor)
						presence = true;
				}
				if(presence == false)
					color.push(tmpRandomColor);
			}
		}
	}

	/*
	 * Initialise le nombre de sujet après que l'utilisateur ai choisi le nombre de sujets
	*/
	function initNombreSujet(nbr){
	//reset the colors
		color.length = 0;
		$('#sujets').append("<table><tr></tr><tr></tr></table>");
		var cases1tab = $('#sujets tr:eq(0)');
		var cases2tab = $('#sujets tr:eq(1)');
		randomColorGenerator(nbr);
		for(var i=0; i<nbr; i++){
			if (i <= 2){
				if (nbr == 4 && i == 2){ //le troisieme choix parmi 4 choix est mis sur la ligne suivante
					cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[color[i]]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' maxlength='10' /></td>");
				}
				else{
					cases1tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[color[i]]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' maxlength='10' /></td>");
				}
			}
			else{ // les 4eme 5eme et 6eme choix sur la seconde ligne
				cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[color[i]]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' maxlength='10' /></td>");
			}
			
		}
		creation = true;
	}

	/*
	 * Initialise les bulletins de vote, en fonction des couleurs et du nombre de sujes proposés
	*/
	function initBulletins(nbr){
		$("#bulletins").empty();
		for(var i = 0; i < nbr ; i++){
			$('#bulletins').append("<button onclick='addBulletinSelect();' id='bulletin"+[i]+"' class='bulletin' style='background-color:"+couleursVote[color[i]]+"'>"+$('#sujet'+[i]).val()+"</button>");
		}
		if (nbr == 4){ //le troisieme choix parmi 4 choix est mis sur la ligne suivante}
			$(".bulletin:lt(2)").css("float","left");
			$(".bulletin:nth-child(3)").css("clear","both");
			$(".bulletin:gt(0)").css("float","left");
		}
		else{
			$(".bulletin:lt(3)").css("float","left");
			$(".bulletin:nth-child(4)").css("clear","both");
			$(".bulletin:gt(0)").css("float","left");
		}
		if(nbr ==4 || nbr == 2){
			$(".bulletin").css("width", "50%");
		}
		else{
			$(".bulletin").css("width", "33.3%");
			if (nbr == 5){
				$("#bulletin3").css("margin-left","16.7%");
			}
			if (nbr == 3 || nbr == 2){
				$(".bulletin").css("margin-top", "100px");
			}
		}
		$(".bulletin").css("height", "200px");

		if(nbrVote == (nbrVotant-1))
			$('.continuer_vote').attr('go', 'fin_vote');
	}

	
	/*
	 * Appuie sur le logo d'accueil
	*/
	$("#ecranLogo").on( "click", function(event){
		$("#ecranLogo").hide();
		gotoSection("nombreSujets");
	});

	/*
	 * ajoute la classe selected au nombre de sujets choisi
	*/
	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});
});

/*
 * Ajout la classe selected au bulletin de vote choisi
*/
function addBulletinSelect(){
	$(".bulletin").removeClass("selected");
	$(event.target).addClass("selected");
}
