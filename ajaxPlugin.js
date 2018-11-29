(function($) {
	$.fn.ajaxPlugin = function(options) {
	    // PARAMETERS
		const parameters = $.extend({
			destination: $("body"),
            ajaxTriggers: $("a"),
            loader: {
                url: "https://loading.io/spinners/coffee/index.coffee-cup-drink-loader.gif",
                style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    visibility: "hidden"
                }
            }
		}, options);

		// OBSERVERS
        parameters.ajaxTriggers.click(function(event) {
            event.preventDefault();
            AjaxContent.newContent = $(this).attr("href");
            AjaxContent.destination = parameters.destination;
            AjaxContent.load(function(response, status, xhr) {
                if ( status == "success" ) {
                    Browser.updateHistory(AjaxContent.newContent, "");
                    Browser.sluggedTitle = slugify(removeExtension(AjaxContent.newContent));
                    Browser.updateTitle();
                }
            });
        });
        $(document).ajaxStart(function(){
            Loader.append(parameters.loader);
            Loader.show();
            AjaxContent.hide();
        });
        $(document).ajaxError(function(){
            alert("Something went wrong, please contact the site owner");
        });
        $(document).ajaxSuccess(function(){
            AjaxContent.show();
            Loader.hide();
        });
        window.onpopstate =  function(event) {
            event.preventDefault();
            if (event.state) {
                parameters.destination.load(event.state);
            }
        };

		return this;
	};

    // ENTITIES
    const Browser = {
        sluggedTitle: "",
        updateHistory: function (newContent, title) {
            history.pushState(newContent, title);
        },
        updateTitle: function () {
            document.title = this.sluggedTitle.toUpperCase();
        }
    };
	const Loader = {
	    append: function (parameters) {
            $("body").append(`<div id="loader"><img src="${parameters.url}" /></div>`);
            this.setStyle(parameters.style);
        },
        show: function () {
            $("#loader").css("visibility", "visible");
        },
        hide: function () {
            $("#loader").css("visibility", "hidden");
        },
        setStyle: function (style) {
            $("#loader").css(style);
        }
    };
    const AjaxContent = {
        newContent: "",
        destination: "",
        load: function (callback = null) {
            this.destination.load(this.newContent, callback);
        },
	    show: function () {
            $("body").css("visibility", "visible");
        },
        hide: function () {
            $("body").css("visibility", "hidden");
        }
    };

    // SERVICES
    function slugify(text)
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, "-")           // Replace spaces with -
            .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
            .replace(/\-\-+/g, "-")         // Replace multiple - with single -
            .replace(/^-+/, "")             // Trim - from start of text
            .replace(/-+$/, "");            // Trim - from end of text
    }

    function removeExtension(text) {
        return text.substring(0, text.lastIndexOf("."));
    }

})(jQuery);
