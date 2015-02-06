$(function(){
	var resultatVote; var color; var nbrVotant; var nbrVote; var creation; var initListeEleve; var tousVote;
	var couleursVote = new Array("#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF","#F778A1","#347C17","#7E3817","#8E35EF");
	$(".content").not(":first").hide();
	/* Liste des boutons récurrents */
	var button = $(".content .navigation"); 
	var storage = window.localStorage;
	var style = storage.getItem('styleSheet');

	$('.validation_vote').on("click", function(event){
		nbrVote++;
		var key = $('.bulletin').filter('.select').attr('id');
		resultatVote[key] = resultatVote[key]+1;
		progressBar();
	});

/*
 *	progress bar handler
 *
*/



function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

var camQualityDefault = ['quality value', 50];
    var camDestinationTypeDefault = ['FILE_URI', 1];

	$('#cam').click(function(){
navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });		
	});


 	function progressBar(){
 		if($("#listeClass button").length == 0){
 			$('#progressbar').show();
 			$('#progressbar').progressbar({value: nbrVote, max:nbrVotant});
 		}
 	}



	$('.canvaResultat').live("click", function(event){
		var tmp = $(event.target).parent().find('p').text();
		$(event.target).parent().find('p').html(parseInt(tmp)+1);
		$(event.target).removeClass('canvaResultat');
		$(event.target).css('background-color', 'gray');
	});

	/*
	 * Affiche les résultats une fois le vote fini
	*/
	function affichageResultats(nbr){
				$('#progressbar').hide();

		$('#affichageResultats').empty();
		for(var i=0; i<nbr ; i++){
			if(resultatVote['bulletin'+i] != 0)
				if (nbr > 0)		
					$('#affichageResultats').append("<div class='ligne1compt'></div>");
			for(var j=0 ; j<resultatVote['bulletin'+i]; j++){
				$('#affichageResultats').append("<canvas class='vote' style='background-color:"+couleursVote[color[i]]+"'></canvas>&nbsp;");	
			}
		}
	}

	/*
	 * Affiche les résultats chiffrés
	*/
	function affichageResultatsChiffres(nbr){
		$('#affichageResultatsChiffre').empty();
		for(var i=0; i<nbr ; i++){
			if(resultatVote['bulletin'+i] != 0) {
				$('#affichageResultatsChiffre').append("<div class='ligne1compt'></div>");
				for(var j=0 ; j<resultatVote['bulletin'+i]; j++){
					$('#affichageResultatsChiffre div:last').append(" <canvas class='vote canvaResultat' style='background-color:"+couleursVote[color[i]]+"'></canvas>&nbsp;");

				}
				$('#affichageResultatsChiffre div:last').append("<p class='span'>0</p>");
				$("#affichageResultatsChiffre div:last p").css("color",couleursVote[color[i]]);
			}
		}
	}

	function affichageResultatsTableau(nbr){
		$('#affichageResultatsTableau').empty();
		for(var i=0; i<nbr ; i++){
		    if(resultatVote['bulletin'+i] != 0)	{
		    	var nbrTable = parseInt(resultatVote['bulletin'+i]/10)+1;
		    	for(var k=0 ; k<nbrTable; k++){
		        	$('#affichageResultatsTableau').append("<table></table>");
		        	$('#affichageResultatsTableau table:last').append("<tr>");
		        	$('#affichageResultatsTableau table:last').append("<tr>");
		        	for(var j=0 ; j<10; j++){
		        		if(j%2 == 0){
                    		$('#affichageResultatsTableau table:last tr:last').append("<td>");
                    		if(j+(k*10) <resultatVote['bulletin'+i])
                    			$('#affichageResultatsTableau table:last tr:last td:last').append("<canvas class='voteCase' style='background-color:"+couleursVote[color[i]]+"'></canvas>");
                    	}else {
                   		 	$('#affichageResultatsTableau table:last tr:first').append("<td>");
                    		if(j+(k*10) <resultatVote['bulletin'+i])
                    			$('#affichageResultatsTableau table:last tr:first td:last').append("<canvas class='voteCase' style='background-color:"+couleursVote[color[i]]+"'></canvas>");
                    	}
                    }
                }
            }
        }
	}

	// Gestion du clic sur les boutons de choix de chemin //
	button.click( function() {
		$(this).closest("div[id]").hide(); //a cause de enterCode, sélection de la div engolbante qui a un id.
		gotoSection($(this).attr("go"));
	});


/*
 *	progress bar handler
 *
 */
 	$("#upload").click(function(){
 		$('#progressbar').progressbar({value: 37});
 		  value: 37

 	});

 	/*function progressBar(int_students){
 		$('#progressBar').progressbar();
 	}
*/
	/*
	 * Function main
	 * Redirection sur la div 
	*/ 
	function gotoSection(key) {
		gererAction(getAction(key));
		$("#"+key).show();
		var nbrSujet = $('.selected').attr('value');
		if(key == "couleursSujets" && creation == false)	
			initNombreSujet(nbrSujet);
		else if(key == "vote") 
			initBulletins(nbrSujet);
		else if(key == "resultats")
			affichageResultats(nbrSujet);
		else if(key == "demarre_vote")
			nbrVotant = $('#numVot').html();
		else if(key == "resultatsChiffres")
			affichageResultatsChiffres(nbrSujet);
		else if(key == "resultatsTableau")
			affichageResultatsTableau(nbrSujet);
		else if(key == "parametres"){
			$("#changeCodeParams").hide();
			$("#numericInput").hide();
		} else if(key == "selectionClass"){
			$('#selectionClass .valider').hide();
			affichageClasse();
		} else if(key =="selectionPrenom"){
			if(initListeEleve == false)	
				affichagePrenomsSelection();
			$('#selectionPrenom .valider').hide();
		} else if(key =="modifClasse")
			initModifClasse();
		else if(key == "supprEleve")
			initSupprEleve();
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
			case "initialisation" :
				resultatVote = {bulletin0:0, bulletin1:0, bulletin2:0, bulletin3:0, bulletin4:0, bulletin5:0};
				color = new Array();
				creation = false;
				initListeEleve = false;
				nbrVote = 0;
				$('#listeClass').empty();
				$('.continuer_vote').attr('go', 'vote');
				$("#menuParams").hide();
				$(".codeParams").text("0");
				$("#numericInput").hide();
				$(".entrerCode").css("background", "linear-gradient( #519802, #9ccf31)");
				break;
			case "initGoDemarrerVote" :
				if($("#listeClass button").length != 0)
					$("#demarre_vote .bigButton").attr('go', 'selectionPrenom');
				else
					$("#demarre_vote .bigButton").attr('go', 'vote');
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
/*Transformation rgb en hexadécimal*/
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}
/*
* Changement de couleur par clic canvas
* retourne une nouvelle couleur qui n'est pas utilisée
* courante est la clé de la couleur utilisée
*/
			function plusKey(ind){
				var max = couleursVote.length;
				//si la couleur arrive au bout du tableau, revenir au debut pour le changement
				if (ind == max-1){
					ind = -1;
				}
				ind++;
				//si la couleur est deja présente
				if (jQuery.inArray(ind, color) != -1){
					return plusKey(ind);
				}
				return ind;
			}
	function changeColor(courante, cl){
		/*alert(color); //tableau d'indices
		alert(cl); // index de la couleur cliquée
		alert(color[cl]); //index de la couleur utilisée dans couleursVote
		alert(couleursVote[color[cl]]); //la couleur*/
		courante = couleursVote[plusKey(color[cl])];
		color[cl]=plusKey(color[cl]);
		return courante;
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
				if (nbr == 4 && i == 2) //le troisieme choix parmi 4 choix est mis sur la ligne suivante
					cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[color[i]]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' maxlength='10' /></td>");
				else
					cases1tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[color[i]]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' maxlength='10' /></td>");
			}
			else // les 4eme 5eme et 6eme choix sur la seconde ligne
				cases2tab.append("<td><canvas class='couleurSujet' style='background-color:"+couleursVote[color[i]]+"'></canvas><input class='intitule_vote' id='sujet"+i+"' type='text' maxlength='10' /></td>");
		}
		creation = true;
			$(".couleurSujet").click(function(){
				var index = $(".couleurSujet").index(this);
				var courante = $(this).css("backgroundColor");
				courante = hexc(courante);
				$(this).css("background-color", changeColor(courante, index));
			});
	}

	/*
	 * Initialise les bulletins de vote, en fonction des couleurs et du nombre de sujes proposés
	*/
	function initBulletins(nbr){
		$("#bulletins").empty();
		for(var i = 0; i < nbr ; i++)
			$('#bulletins').append("<button onclick='addBulletinSelect();' id='bulletin"+[i]+"' class='bulletin' style='background-color:"+couleursVote[color[i]]+"'>"+$('#sujet'+[i]).val()+"</button>");
		if (nbr == 4) 
			$(".bulletin:nth-child(2)").after("<br/>");
		else if (nbr > 4) 
			$(".bulletin:nth-child(3)").after("<br/>");
		if (nbr == 3 || nbr == 2)
				$(".bulletin").css("margin-top", "100px");
		if(nbr ==4 || nbr == 2)
			$(".bulletin").css("width", "40%");
		else
			$(".bulletin").css("width", "26%");
		$(".bulletin").css("height", "200px");
		if($("#listeClass button").length == 0){
			if(nbrVote == (nbrVotant-1))
				$('.continuer_vote').attr('go', 'fin_vote');
		} else {
			$('#listeSelectionPrenom .classSelect').addClass('hasBeenSelected');
			$('#listeSelectionPrenom button').removeClass('classSelect');
			tousVote = true;
			$("#listeSelectionPrenom button").each(function(){
				if(!($(this).hasClass('hasBeenSelected')))
					tousVote=false;
			});
			if(tousVote == false)
				$('.continuer_vote').attr('go', 'selectionPrenom');
			else
				$('.continuer_vote').attr('go', 'fin_vote');
		}
			
		$(".bulletin").click(function(){
			resetBackground();
			if ($(this).hasClass("select")){
				if (style == 1)
					$(this).css("background", "radial-gradient(white,"+couleursVote[color[$(this).attr('id').replace("bulletin","")]]+")");
				else if (style == 2)
					$(this).css("outline", "10px solid black");
			}
		});
	}

	function resetBackground(){
		var identifiant = $('.bulletin').filter('.select').attr('id');
		$('.bulletin').each(function(){
			$(this).css("background", couleursVote[color[$(this).attr('id').replace("bulletin","")]] );
			$(this).css("outline", "0px");
		});
	}

	function affichageClasse(){
		$('#listeClass').empty();
		db.transaction(function(tx) {
         	tx.executeSql("SELECT * FROM Classe", [], function(tx, res) {
       			if(res.rows.length != 0){
       				for(var i=0; i<res.rows.length; i++) {
       					$('#listeClass').append('<li>');
       					$('#listeClass li:last').append("<button id_class='"+res.rows.item(i).id_Classe+"'>"+res.rows.item(i).nom+'</button>');
       				}
       			}else
       				$('#listeClass').append("<li>Aucune classe n'a été enregistrée</li>");
    		});
    	});
	}
	
	function affichagePrenomsSelection(){
		$('#listeSelectionPrenom').empty();
		db.transaction(function(tx){
			tx.executeSql("SELECT nom FROM Eleve WHERE id_classe = "+$('#listeClass .classSelect').attr('id_class'), [], function(tx, res){
				if(res.rows.length != 0){
					for(var i =0; i< res.rows.length; i++)
						$("#listeSelectionPrenom").append("<button>"+res.rows.item(i).nom+"</button>  ");
				}
			});
			initListeEleve = true;
		},onDBError);
	}

	function initModifClasse(){
		$('#listeSelectClasse').empty();
		$("#listeEleveModif").empty();
		$('#listeSelectClasse').append("<option value='null'>Classe à modifier</option>");
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM Classe", [], function(tx,res){
				if(res.rows.length != 0){
					for(var i=0 ; i<res.rows.length ; i++)
						$('#listeSelectClasse').append("<option value='"+res.rows.item(i).id_Classe+"'>"+res.rows.item(i).nom+"</option>");
				}
			});
		}, onDBError);
	}

	function initSupprEleve() {
		$('#supprEleveDyna').empty();
		$('#supprEleveDyna').append('<h2>Supprimer un élève de la classe : '+$('#listeSelectClasse option:selected').text()+"</h2>");
		$('#supprEleveDyna').append('<div>');
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM Eleve WHERE id_classe = "+$("#listeSelectClasse option:selected").val(), [], function(tx,res){
				if(res.rows.length != 0){
					for(var i=0 ; i<res.rows.length ; i++)
						$('#supprEleveDyna div').append(" <button value='"+res.rows.item(i).id_Eleve+"'>"+res.rows.item(i).nom+"</button> ");
				}
			});
		}, onDBError);
	}

	$("#supprEleve .valider").on('click', function(){
		var r =confirm("Voulez-vous vraiment supprimer l'élève "+$("#supprEleveDyna .select").text()+" ?");
		if(r == true){
			db.transaction(function(tx){
				tx.executeSql("DELETE FROM Eleve WHERE id_Eleve = "+$("#supprEleveDyna .select").val());
				initSupprEleve();
			}, onDBError);
		}
	});

	/*
	 * Appuie sur le logo d'accueil
	*/
	$("#ecranLogo").on( "click", function(event){
		$("#ecranLogo").hide();
		gotoSection("accueil");
	});

	/*
	 * ajoute la classe selected au nombre de sujets choisi
	*/
	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});

	/*
	 * Appuie sur le bouton + lors du choix du nombre de votant
	*/
	$('#plusVot').on("click", function(event){
		var tmp = $("#numVot").html();
		if (tmp < 400){
			$('#numVot').html(parseInt(tmp)+1);
		}
	});

	/*
	 * Appuie sur le bouton - lors du choix du nombre de votant
	*/
	$('#moinsVot').on("click", function(event){
		var tmp = $("#numVot").html();
		if (tmp > 0){
			$('#numVot').html(parseInt(tmp)-1);			
		}
	});

	$('#listeClass button').live('click', function(){
		$('#listeClass button').removeClass('classSelect');
  		$(event.target).addClass('classSelect');
  		$('#selectionClass .valider').show();
	});	

	$('#listeSelectionPrenom button').live('click',function(){
		if(!($(event.target).hasClass('hasBeenSelected'))){
			$('#listeSelectionPrenom button').removeClass('classSelect');
			$(event.target).addClass('classSelect');
			$('#selectionPrenom .valider').show();
		}
	});

});

/*
 * Ajout la classe selected au bulletin de vote choisi
*/
function addBulletinSelect(){
	$(".bulletin").removeClass("select");
	$(event.target).addClass("select");
}