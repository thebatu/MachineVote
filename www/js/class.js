$(function(){
	var code = new Array();
	$.getJSON('res/Password.json', function(data){
		$.each( data.password, function(key,val) {
			code.push(val);
		});
	});

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

	$(".codeParams").click(function(){
		//changer pour faire apparaitre un clavier numerique
		$(this).html(increaseNumber($(this).html()));
	});

	$("#codeParams .ok").click(function(){
		//verification du code lors de l'appui sur ok
		var a = $(".codeParams:first").html();
		var b = $(".codeParams:nth-child(3)").html();
		var c = $(".codeParams:nth-child(4)").html();
		var d = $(".codeParams:nth-child(5)").html();
		if (verifyCode(a,b,c,d)){
			$("#codeParams").hide();
			$("#parametres").show();
		}else{
			alert("wrong");
		}
	});

	function replaceCode(n1, n2, n3, n4){
		fs = require('fs');
		fs.writeFile('res/Password.json', JSON.stringify({"password":[n1,n2,n3,n4]}));
		alert("code changé");
	}

	$("#changeCodeParams .ok").click(function(){
		//verification du code lors de l'appui sur ok
		var a = $(".codeParams:first").html();
		var b = $(".codeParams:nth-child(3)").html();
		var c = $(".codeParams:nth-child(4)").html();
		var d = $(".codeParams:nth-child(5)").html();
		replaceCode(a,b,c,d);
	});

	$(".codeButton").click(function(){
		$(this).parent().hide();
		$("#changeCodeParams").show();
	});

});