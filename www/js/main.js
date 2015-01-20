$(function(){
	$("#nombreSujets").hide();

	$(".app").on( "click", function(event){
		$( event.target ).addClass( "tap" );
		$(".app.tap").hide();
		$("#nombreSujets").show();
	});
});