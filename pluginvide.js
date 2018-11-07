	// on déclare notre code dans une fonction anonyme
// que l'on appelle aussitôt avec le paramètre jQuery
// alors récupéré dans la variable $ permettant ainsi
// d'utiliser $() plutôt que jQuery() (plus pratique...)
(function($) {

	// Déclaration du plugin
	$.fn.pluginVide = function(parameters) {

		// Déclaration des paramètres par défaut
		// puis fusion de ces dernier aves les
		// paramètres passés par l'utilisateur
		var defaultValues = {
			ajaxTriggers: $('a'),
			loader: $('.gooey'),
			content: $('.ajaxContent')
		};
		var parameters = $.extend(defaultValues, parameters);

		parameters.ajaxTriggers.click(function(event) {
			parameters.content.hide();
		  	const newContent = $(this).attr('href') + " .ajaxContent";
		  	event.preventDefault();
		  	history.pushState(newContent, null);
		  	parameters.content.load(newContent, function() {
  				parameters.loader.hide(200);
				parameters.content.show(300);
			});

		  	parameters.loader.show(500);

		});
		
		// logger la cible
		console.log(this);
		// logger les paramètres
		console.log(parameters);

		window.addEventListener('popstate', function(e) {
		  	const lastContent = e.state;
		  	newContent.load(lastContent);
		});
		// on renvoie la cible pour permettre le chainage de
		// notre plugin avec d'autres fonctions ou plugins jQuery
		return this;
	};


})(jQuery);
