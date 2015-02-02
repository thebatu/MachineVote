/*document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
  	var db = window.sqlitePlugin.openDatabase({name: "Databases"});
  	db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Password (id integer primary key, premier integer, deuxieme integer, troisieme integer, quatrieme integer)');
	});
}*/



$(function(){
	var storage = window.localStorage;
	if(!('password' in storage))
		storage.setItem('password', "0000");
	var code = new Array();
	code = storage.getItem('password');
	
	function increaseNumber(nbr){
		var tot = parseInt(nbr) + 1;
		if (tot == 10){
			tot = 0;
		}
		return tot;
	}

	function verifyCode(n1, n2, n3, n4){
		if (n1 == code[0] && n2 == code[1] && n3 == code[2] && n4 == code[3]){
			return true;
		}
		return false;
	}


	function nextSelection(next){
		next.next().addClass("sel");
	}

	/*
	*	Virtual Keyboard handler for seurity code 
	*/

	$(".codeParams").click(function(){
		$("#numericInput").hide();
		$(".codeParams").removeClass("sel");
	    $(this).addClass("sel");
	    var tttt = $(this);
		$("#numericInput").show();


			$('.codeParamz').click(function(){
				var tmp = $(this).html();
				var current = $('.sel').html(tmp);						
				
				$('.sel').next().addClass("sel");
				current.removeClass("sel");
			});
	});




	$("#codeParams .ok").click(function(){
		$("#numericInput").hide();
		//verification du code lors de l'appui sur ok
		var a = $(".codeParams:first").html();
		var b = $(".codeParams:nth-child(3)").html();
		var c = $(".codeParams:nth-child(4)").html();
		var d = $(".codeParams:nth-child(5)").html();
		if (verifyCode(a,b,c,d)){
			$("#codeParams").hide();
			$("#parametres").show();
		}else{
			$("#codeParams .entrerCode").css("background","linear-gradient( #aa4444, #ff0000)");
		}
	});

	function replaceCode(n1, n2, n3, n4){
		storage.password=n1+n2+n3+n4;
		code=storage.getItem('password');
	}

	$("#changeCodeParams .ok").click(function(){
		$("#numericInput").hide();
		//verification du code lors de l'appui sur ok
		var a = $(".changecodeParams:first").text();
		var b = $(".changecodeParams:nth-child(3)").text();
		var c = $(".changecodeParams:nth-child(4)").text();
		var d = $(".changecodeParams:last").text();
		replaceCode(a,b,c,d);
	});

	$(".codeButton").click(function(){
		$(this).parent().hide();
		$("#changeCodeParams").show();
	});

});