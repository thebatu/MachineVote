$(function(){
	var storage = window.localStorage;
	if(!('password' in storage))
		storage.setItem('password', "0000");
	var code = new Array();
	code = storage.getItem('password');
	var current;

	if(!('styleSheet' in storage))
		storage.setItem('styleSheet', "1");
	var style = new Array();
	style = storage.getItem('styleSheet');
	styliser();

function styliser(){
	if (style == 1){
			$("head").append("<link rel='stylesheet' type='text/css' href='css/newStyle.css' />");
			storage.styleSheet=2;

		}
		else if (style == 2){
			$("link[href='css/newStyle.css']").remove();
			
			storage.styleSheet=1;
		}
	style=storage.getItem('styleSheet');
}
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
		$("#numericInput").show();
		});
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
				$(".codeParams").removeClass("sel");
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

/*changer le design de l'application */

	$("#styleSheet").click(function(){
		styliser();
	});

	$('#ajoutClasse #buttonAjoutEleve').click(function(){
		if($('#inputNomEleve').val() != ''){
			$('.classRight div').append('<p>'+$('#inputNomEleve').val()+'</p>');
			$('#inputNomEleve').val('');
		}
	});

	$("#ajoutClasse .valider").click(function(){
		var idDerniereClass;
		if($('#inputNomClasse').val() != '' && $('#ajoutClasse .classRight p').length != 0){
			db.transaction(function(tx) {
         		tx.executeSql("INSERT INTO Classe(nom) VALUES ('"+$('#inputNomClasse').val()+"')");
         		tx.executeSql("SELECT MAX(id_classe) AS idClass FROM Classe", [], function(tx, res) {
         			if(res.rows.length != 0)
         				idDerniereClass=res.rows.item(0).idClass;
         		});
         	});
         	db.transaction(function(tx){
         		$('#ajoutClasse .classRight p').each(function(){
         			tx.executeSql("INSERT INTO Eleve(id_classe, nom) VALUES ('"+idDerniereClass+"', '"+$(this).text()+"')");
         		});
			},onDBError);
			//$("#ajoutClasse .valider").addClass('navigation');
		}else
			alert('Veuillez entrer un nom de classe et au moins un élève');
	});
});