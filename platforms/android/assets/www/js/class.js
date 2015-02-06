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
		if(style==1){
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
	*	Virtual Keyboard handler for security code 
	*/
	$(".codeParams").click(function(){
		$(".codeParams").removeClass("sel");
	    $(this).addClass("sel");
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
		//verification du code lors de l'appui sur ok
		var a = $(".codeParams:first").html();
		var b = $(".codeParams:nth-child(3)").html();
		var c = $(".codeParams:nth-child(4)").html();
		var d = $(".codeParams:nth-child(5)").html();
		if (verifyCode(a,b,c,d)){
			$("#codeParams").hide();
			$("#parametres").show();
			$("#numericInput").hide();
		}else
			$("#codeParams .entrerCode").css("background","linear-gradient( #aa4444, #ff0000)");
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
         	},onDBError);
         	db.transaction(function(tx) {
         		$('#ajoutClasse .classRight p').each(function(){
         			tx.executeSql("INSERT INTO Eleve(id_classe, nom) VALUES ('"+idDerniereClass+"', '"+$(this).text()+"')");
         		});
         		$('#inputNomClasse').val('');
         		$('#ajoutClasse .classRight div').empty();
         	},onDBError);
		}else
			alert('Veuillez entrer un nom de classe et au moins un élève');
	});

	$("#supprimerClasse").on('click', function(){
		if($('#listeSelectClasse option:selected').val() == 'null')
			alert('Veuillez choisir une classe à supprimer');
		else {
			var r = confirm("Vouvlez-vous vraiment supprimer la classe : "+$('#listeSelectClasse option:selected').text()+" ?");
			if(r == true){
				db.transaction(function(tx){
					tx.executeSql("DELETE FROM Classe WHERE id_Classe = "+$('#listeSelectClasse option:selected').val());
					alert('classe supprimée');
					$('#listeSelectClasse').empty();
					$('#listeSelectClasse').append("<option value='null'>Classe à modifier</option>");
					tx.executeSql("SELECT * FROM Classe", [], function(tx,res){
						if(res.rows.length != 0){
							for(var i=0 ; i<res.rows.length ; i++)
								$('#listeSelectClasse').append("<option value='"+res.rows.item(i).id_Classe+"'>"+res.rows.item(i).nom+"</option>");
						}
					});
				}, onDBError);
			}
		}
	});

	$("#ajouterEleve").on('click', function(){
		if($('#listeSelectClasse option:selected').val() == 'null')
			alert("Veuillez d'abord choisir une classe");
		else{
			if($('#modifClasse .modif input').val() != ''){
				db.transaction(function(tx){
					tx.executeSql("INSERT INTO Eleve(id_classe, nom) VALUES ("+$('#listeSelectClasse option:selected').val()+",'"+$('#modifClasse .modif input').val()+"')");
					$('#modifClasse .modif input').val('');
				}, onDBError);
				rempliListeModifEleve();
			} else
				alert("Veuillez saisir le nom d'un élève");
		}
	});

	$("#listeSelectClasse").on('change', function(){
		rempliListeModifEleve();
		if($('#listeSelectClasse option:selected').val() == 'null')
			$("#supprimerEleve").attr('go', 'modifClasse');
		else
			$("#supprimerEleve").attr('go', 'supprEleve');
	});

	function rempliListeModifEleve(){
		$("#listeEleveModif").empty();
		if($('#listeSelectClasse option:selected').val() != 'null'){
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM Eleve WHERE id_classe = "+$("#listeSelectClasse option:selected").val(), [], function(tx,res){
					if(res.rows.length != 0){
						for(var i=0 ; i<res.rows.length ; i++)
							$('#listeEleveModif').append("<p>"+res.rows.item(i).nom+"</p>");
					}
				});
			}, onDBError);
		}
	}

	$("#supprimerEleve").on('click', function(){
		if($('#listeSelectClasse option:selected').val() == 'null')
			alert("Veuillez d'abord choisir une classe");
	});

	$("#supprEleveDyna button").live('click', function(){
		$("#supprEleveDyna button").removeClass('select');
		$(event.target).addClass('select');
	});
});