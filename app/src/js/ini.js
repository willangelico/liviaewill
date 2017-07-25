;(function( $ ) {

    "use strict";

	$(document).ready( function(){

		if( $.fn.WFlashZooScroll ){
	        $(this).WFlashZooScroll();
	    }
		if( $.fn.WHorloge ){
	        $('#timer').WHorloge({
	            getTime : '2017-09-23-17-30'
	        });
	    }
	    $('#map')
			.click(function(){
				$(this).find('iframe').addClass('clicked')})
			.mouseleave(function(){
				$(this).find('iframe').removeClass('clicked')});
		
		function above13(){
			$('.above13').on("click",function(){
				var parent = $(this).parent();
				if($(this).is(':checked')){
					$(this).parents('.checkbox').find('.age').show();				
				}else{
					$(this).parents('.checkbox').find('.age').hide();
				}
			});
		}
		above13();
		
		var companionTemplate = '<div class="companion-group">'
	    							+'<input type="text" class="form-control companion" placeholder="Nome do Acompanhante">'
	    							+'<div class="checkbox">'
										+'<label class="above">'
											+'<input type="checkbox" value="above13" class="above13">Menor que 12 anos?'
										+'</label>'
										+'<label class="age">'
											+'<input type="number" class="iptage" min="00" max="12" placeholder="00" />'
											+'<span>Idade</span>'
										+'</label>'
									+'</div>'
								+'</div>';
		$('.addCompanion').on("click", function(e){
			e.preventDefault();
			$('#companion-form').append(companionTemplate);
			above13();
		});

		$('#header-mobile button').on("click", function(){
			if($('header').hasClass('active')){
				$(this).find('span').addClass('glyphicon-menu-hamburger').removeClass('glyphicon-remove');
				$('header').removeClass('active');

			}else{
				$(this).find('span').removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove');
				$('header').addClass('active');
			}
		});
		if($(window).width() < 992){
			$('nav ul li a').on('click', function(){
				$('#header-mobile button').find('span').addClass('glyphicon-menu-hamburger').removeClass('glyphicon-remove');
				$('header').removeClass('active');
			});
		}

		$('.gift').tooltip();
		// Initialize Firebase
		// TODO: Replace with your project's customized code snippet
		var config = {
			apiKey: "AIzaSyB6H6AGu_0_4bu5zXyYttXLOnzDT7b4Je4",
			authDomain: "liviaewill-fc616.firebaseapp.com",
			databaseURL: "https://liviaewill-fc616.firebaseio.com"
			
			
		};
		firebase.initializeApp(config);

		$('#rsvp-confirm').on('click',function(){
			$(this).prop("disabled",true);
			var acompanhante = function(){
				var acpsReturn = [];
				$('.companion-group').each(function(index){
					var name = $(this).find('.companion').val();
					var above = $(this).find('.above13').is(':checked');
					var age = $(this).find('.iptage').val();
					var aboveret = "NO";
					if(above){
						aboveret = "YES";						
					}
					if(age == ""){
						age = "Maior";
					}
					var key = "acompanhante"+index;
					var acp = {
								"name" : name,
								"above13" : aboveret,
								"age": age
							}
					acpsReturn.push(acp);
					
				}); 
				return acpsReturn;
			}
			//console.log(acompanhante());
			//acompanhante();

			var json = { 
				"nome": $('#name').val(), 
				"acompanhantes": acompanhante()
			};
			
			var defaultDatabase = firebase.database().ref('users/').push(json, function(error) {
  				if (error){
  					$('.modal-footer').prepend('<div class="alert alert-error" role="alert">Erro ao confirmar sua presença. Tente novamente ou liga pra gente ;)</div>')
  				}else{
	  				$('.modal-footer').prepend('<div class="alert alert-success" role="alert">Confirmação realizada com sucesso.</div>')
	  				$('#rsvp-modal form').trigger("reset");
	  			}
  			});
  			setTimeout(function(){
  				$(this).prop("disabled",false);	
  			},3000);
			
		});
	});
})(jQuery); 