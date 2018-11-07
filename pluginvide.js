(function($) {
	// Déclaration du plugin
	$.fn.pluginVide = function(parameters) {

		const defaultValues = {
			ajaxTriggers: $('a'),
			loader: 'loader.html',
			content: $('body')
		};
		// fusion des paramètres par défaut ainsi que ceux passés par l'utilisateur
		var parameters = $.extend(defaultValues, parameters);

		parameters.ajaxTriggers.click(function(event) {
            event.preventDefault();
            hideOldContent(parameters.content);
            showLoader(parameters.loader, parameters.content);
            showNewContent($(this).attr('href'), parameters.content, parameters.loader);
        });

        window.addEventListener('popstate', function(e) {
            const lastContent = e.state;
            newContent.load(lastContent);
        });

		function hideOldContent(oldContent) {
            oldContent.hide(0);
        }
        function showLoader(loader, destination) {
            destination.load(loader);

        }
        function hideLoader(loader) {
			$('body').hide(0);
        }
        function showNewContent(newContent, destination, loader) {
            history.pushState(newContent, null);
            destination.load(newContent, function() {
                hideLoader(loader);
                $('body').show(300);
            });

        }
        // logger la cible
		console.log(this);

		// logger les paramètres
		console.log(parameters);

		// on renvoie la cible pour permettre le chainage de
		// notre plugin avec d'autres fonctions ou plugins jQuery
		return this;
	};


})(jQuery);
