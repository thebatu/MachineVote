$(function(){
	var couleursVote = new Array("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF","#F6358A","#347C17","#7E3817","#8E35EF");
	var color = [false,false,false,false,false,false,false,false,false,false];
	$("#nombreSujets").hide();
	$("#couleursSujets").hide();
	$("#demarre_vote").hide();
	$("#vote").hide();
	$("#fin_vote").hide();
	var creation = false;
	var nbrVotant = 3;
	var nbrVote = 1;

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
			initBulletins(nbrSujet);
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

	function randomColorGenerator(){
		var tmpRandomColor = Math.floor((Math.random() * 10 ) );
		
		if(color[tmpRandomColor]==false){
			color[tmpRandomColor]=true;
			

			return tmpRandomColor;

		}else{
			randomColorGenerator();
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
					cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[randomColorGenerator()]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' /></td>");
				}
				else{
					cases1tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[randomColorGenerator()]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' /></td>");
				}
			}
			else{ // les 4eme 5eme et 6eme choix sur la seconde ligne
				cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[randomColorGenerator()]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' /></td>");
			}
			
		}
		creation = true;
	}

	function initBulletins(nbr){
		$("#bulletins").empty();
		$(".bulletin").removeClass("selected");
		for(var i = 0; i < nbr ; i++){
			$('#bulletins').append("<button id='bulletin"+[i]+"' class='bulletin' style='background-color:"+couleursVote[i]+"'>"+$('#sujet'+[i]).val()+"</button>");
		}
		if(nbrVote == (nbrVotant-1))
			$('.validation_vote').attr('go', 'fin_vote');
	}

	$('.validation_vote').on("click", function(event){
		nbrVote++;
	});

	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});

	$(".bulletin").on("click", function(event){
		$(".bulletin").removeClass("selected");
		$(event.target).addClass("selected");
	});
});