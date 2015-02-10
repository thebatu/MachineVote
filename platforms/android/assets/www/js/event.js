$(function(){
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

	$('#listeClass button').live('mousedown', function(){
		$('#listeClass button').removeClass('classSelect');
  		$(event.target).addClass('classSelect');
  		$('#selectionClass .valider').show();
	});	

	$('#listeSelectionPrenom button').live('mousedown',function(){
		if(!($(event.target).hasClass('hasBeenSelected'))){
			$('#listeSelectionPrenom button').removeClass('classSelect');
			$(event.target).addClass('classSelect');
			$('#selectionPrenom .valider').show();
		}
	});
});