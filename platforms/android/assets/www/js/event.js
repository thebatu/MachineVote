$(function(){
/***
	main.js
***/

	/*
	 * affichage chiffre : lors de l'appui sur un canvas, on le grise et on incrémente le conmpteur
	*/ 
	$('.canvaResultat').live("click", function(event){
		var tmp = $(event.target).parent().find('p').text();
		$(event.target).parent().find('p').html(parseInt(tmp)+1);
		$(event.target).removeClass('canvaResultat');
		$(event.target).css('background-color', 'gray');
	});

	/*
	 * ajoute la classe selected au nombre de sujets choisi
	*/
	$(".choixSujet").mousedown(function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});

	/*
	 * Appuie sur le bouton + lors du choix du nombre de votant
	*/
	$('#plusVot').mousedown(function(event){
		var tmp = $("#numVot").html();
		if (tmp < 400){
			$('#numVot').html(parseInt(tmp)+1);
		}
	});

	/*
	 * Appuie sur le bouton - lors du choix du nombre de votant
	*/
	$('#moinsVot').mousedown(function(event){
		var tmp = $("#numVot").html();
		if (tmp > 0){
			$('#numVot').html(parseInt(tmp)-1);			
		}
	});

	/*
	 * ajout de class select lors du clic sur une classe
	*/
	$('#listeClass button').live('mousedown', function(){
		$('#listeClass button').removeClass('classSelect');
  		$(event.target).addClass('classSelect');
  		$('#selectionClass .valider').show();
	});	

	/*
	 * ajout de la classe select lors de la selection d'un prenom
	*/
	$('#listeSelectionPrenom button').live('mousedown',function(){
		if(!($(event.target).hasClass('hasBeenSelected'))){
			$('#listeSelectionPrenom button').removeClass('classSelect');
			$(event.target).addClass('classSelect');
			$('#selectionPrenom .valider').show();
		}
	});

/***
	class.js
***/

	/*
	*	Sécurité/ergonomie si on appuie sur un bouton de modification de code.
	*/
	$(".codeParams").click(function(){
		$(".codeParams").removeClass("sel");
	    $(this).addClass("sel");
	});

	/*
	* Pavé numérique
	*/
	$('.keyCode').click(function(){
		var tmp = $(this).html();
		var current = $('.sel');
		current.html(tmp);
		if (current.hasClass("lastCode")){
			current.siblings(".firstCode").addClass("sel");
		}
		else{
			$('.sel').next('.codeParams').addClass("sel");
		}
		current.removeClass("sel");
	});

	/*
	 * Ajout d'un élève dans la liste de droite
	*/
	$('#ajoutClasse #buttonAjoutEleve').click(function(){
		if($('#inputNomEleve').val() != ''){
			$('.classRight div').append('<p>'+$('#inputNomEleve').val()+'</p>');
			$('#inputNomEleve').val('');
		}
	});

	/*
	 * alert si pas de classe sélectionner avant la suppression d'un élève
	*/
	$("#supprimerEleve").on('click', function(){
		if($('#listeSelectClasse option:selected').val() == 'null')
			alert("Veuillez d'abord choisir une classe");
	});

	/*
	 * ajout de la classe select pour mettre en valeur l'élève sélectionné
	*/
	$("#supprEleveDyna button").live('click', function(){
		$("#supprEleveDyna button").removeClass('select');
		$(event.target).addClass('select');
		$("#supprEleve .valider").show();
	});
});