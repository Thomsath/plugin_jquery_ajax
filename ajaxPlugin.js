(function($) {
	// Déclaration du plugin
	$.fn.ajaxPlugin = function(options) {

		const defaultParameters = {
			content: $('body'),
            ajaxTriggers: $('a'),
            loaderParameters: {
                url: 'https://loading.io/spinners/coffee/index.coffee-cup-drink-loader.gif',
                css: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    visibility: "hidden"
                }
            }
		};
		// fusion des paramètres par défaut ainsi que ceux passés par l'utilisateur
		var parameters = $.extend(defaultParameters, options);

        generateLoader(parameters.loaderParameters);
        $(document).ajaxStart(function(){
            showLoader();
        });
        $(document).ajaxError(function(){
            alert('Something went wrong');
        });  
        $(document).ajaxSuccess(function(){
            hideLoader();
        });
        parameters.ajaxTriggers.click(function(event) {
            event.preventDefault();
            showNewContent($(this).attr('href'), parameters.content);
        });

        window.onpopstate =  function(event) {
            const lastContent = event.state;
            event.preventDefault();
            $('body').load(lastContent);
        };

        function generateLoader(loaderParameters) {
            $('body').append(`<div id="loader"><img src="${loaderParameters.url}" /></div>`);
            $('#loader').css(loaderParameters.css);
        }

        function showLoader() {
            $('body').css("visibility", "hidden");
            $("#loader").css("visibility", "visible");
        }

        function hideLoader() {
            $("#loader").css("visibility", "hidden");
            $('body').not('#loader').css("visibility", "visible");
        }

        function showNewContent(newContent, destination) {
            destination.load(newContent);
            history.pushState(newContent, null);
        }
		// on renvoie la cible pour permettre le chainage de
		// notre plugin avec d'autres fonctions ou plugins jQuery
		return this;
	};


})(jQuery);
