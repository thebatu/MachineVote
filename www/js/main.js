$(function(){
	$("#nombreSujets").hide();

	$(".app").bind( "tap", function(event){
		$( event.target ).addClass( "tap" );
		$(".app.tap").hide();
		$("#nombreSujets").show();
	});
});