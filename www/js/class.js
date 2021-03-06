$(function(){
	var storage = window.localStorage;

	//stockage du mot de passe
	if(!('password' in storage))
		storage.setItem('password', "0000");
	var code = new Array();
	code = storage.getItem('password');

	//stockage du style de l'application (flat VS dégradés)
	if(!('styleSheet' in storage)){
		$("head").append("<link rel='stylesheet' type='text/css' href='css/index.css' />");
		storage.setItem('styleSheet', "1");
	}
	var stylei = storage.getItem('styleSheet');
	if(stylei == 2)
		$("head").append("<link rel='stylesheet' type='text/css' href='css/newStyle.css' />");
		
	//Changer le style de l'application	
	function styliser(){
		if(stylei==1){
			$("head").append("<link rel='stylesheet' type='text/css' href='css/newStyle.css' />");
			storage.styleSheet=2;
		}
		else if (stylei == 2){
			$("head").append("<link rel='stylesheet' type='text/css' href='css/index.css' />");
			$("link[href='css/newStyle.css']").remove();	
			storage.styleSheet=1;
		}
		stylei=storage.getItem('styleSheet');

	}

	//vérifie si le code est bon pour accéder aux paramètres
	function verifyCode(n1, n2, n3, n4){
		if (n1 == code[0] && n2 == code[1] && n3 == code[2] && n4 == code[3]){
			return true;
		}
		return false;
	}

	/*
	* Validation du code
	*/
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
			$("#codeParams .entrerCode").removeClass("wrong");
		}else
			$("#codeParams .entrerCode").addClass("wrong");
	});

	//Stocker le nouveau code
	function replaceCode(n1, n2, n3, n4){
		storage.password=n1+n2+n3+n4;
		code=storage.getItem('password');
	}

	/*
	* Validation du nouveau code
	*/
	$("#changeCodeParams .ok").click(function(){
		$("#numericInput").hide();
		//verification du code lors de l'appui sur ok
		var a = $(".changecodeParams:first").text();
		var b = $(".changecodeParams:nth-child(3)").text();
		var c = $(".changecodeParams:nth-child(4)").text();
		var d = $(".changecodeParams:last").text();
		replaceCode(a,b,c,d);
		$("#numericInput").hide();
		$("#changeCodeParams").hide();
		$("#parametres").show();
		$(".codeParams").removeClass("sel");
		$(".codeParams").text("0");
	});

	/*
	* Changer le design de l'application 
	*/
	$("#styleSheet").click(function(){
		styliser();
	});

	$('input').keyup(function(event) {
        var textBox = event.target;
        //var start = textBox.selectionStart;
        //var end = textBox.selectionEnd;
        textBox.value = textBox.value.charAt(0).toUpperCase() + textBox.value.slice(1);
        //textBox.setSelectionRange(start, end);
    });	

    /*
	 * Ajout de la classe lors de l'appui sur le bouton valider
	*/
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

	/*
	 * Suppression de la classe lors de l'appui sur le bouton
	*/
	$("#supprimerClasse").on('click', function(){
		if($('#listeSelectClasse option:selected').val() == 'null')
			alert('Veuillez choisir une classe à supprimer');
		else {
			var r = confirm("Voulez-vous vraiment supprimer la classe : "+$('#listeSelectClasse option:selected').text()+" ?");
			if(r == true){
				db.transaction(function(tx){
					tx.executeSql("DELETE FROM Classe WHERE id_Classe = "+$('#listeSelectClasse option:selected').val());
					alert('classe supprimée');
					$('#listeSelectClasse').empty();
					$("#listeEleveModif").empty();
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
    
    /*
     * Ajout d'un élève
    */
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

	/*
	 * met à jour l'affichage de la page lors de la selection d'une classe
	*/
	$("#listeSelectClasse").on('change', function(){
		rempliListeModifEleve();
		if($('#listeSelectClasse option:selected').val() == 'null')
			$("#supprimerEleve").attr('go', 'modifClasse');
		else
			$("#supprimerEleve").attr('go', 'supprEleve');
	});

	/*
	 * function qui remplit la liste des élèves de la classe choisie afin de les supprimer 
	*/
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
});