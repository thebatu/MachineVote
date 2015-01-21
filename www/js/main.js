$(function(){
	$("#nombreSujets").hide();
	$("#couleursSujets").hide();

	$("#ecranLogo").on( "click", function(event){
		$("#ecranLogo").hide();
		$("#nombreSujets").show();
	});

	/* Liste des boutons récurrents */
	var button = $(".content .navigation"); 

	// Gestion du clic sur les boutons de choix de chemin //
	button.click( function() {
		$(this).closest("div").hide();
		gotoSection($(this).attr("go"));
	});

	function gotoSection(key) {
		var nouvelle = $("#"+key);
		nouvelle.show();
	}

	
	$(".choixSujet").on("click", function(event){
		$(".choixSujet").removeClass("selected");
		$(event.target).addClass("selected");
	});
});