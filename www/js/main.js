$(function(){
	$("#nombreSujets").hide();

	$(".app").on( "tap", function(event){
		$( event.target ).addClass( "tap" );
		$(".app.tap").hide();
		$("#nombreSujets").show();
	});
});