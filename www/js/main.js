$(function(){
	$("#nombreSujets").hide();

	$(".app").on( "click", function(event){
		$( event.target ).addClass( "tap" );
		$(".app.tap").hide();
		$("#nombreSujets").show();
	});
	/* Liste des boutons récurrents */
	var validation = $(".valider"); 

	// Gestion du clic sur les boutons de choix de chemin //
	validation.click( function() {
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