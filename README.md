# Jquery Ajax Plugin

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ee5c6afc3b3745d286f6c5e41c77ee37)](https://app.codacy.com/app/codacy_alexandre-mace/plugin_jquery_ajax?utm_source=github.com&utm_medium=referral&utm_content=alexandre-mace/plugin_jquery_ajax&utm_campaign=Badge_Grade_Dashboard)

Jquery Plugin with ajax feature, loader transition and history management using history API.
## Installation 
*   Clone the repository and open it.

		$ git clone https://github.com/alexandre-mace/plugin_jquery_ajax.git
		$ cd plugin_jquery_ajax

## Getting Started
* Add the plugin into your HTML file (adjust the location to your needs)
```html
<script type="text/javascript" src="ajaxPlugin.js"></script>
```
* Call the plugin in your javascript file
```javascript
$().ajaxPlugin({
});
```

## Configuration
Here is the default configuration of the plugin
```javascript
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
```
Feel free to bypass the default options by giving the plugin brand new options e.g :
```javascript
$().ajaxPlugin({
    ajaxTriggers: $(".my-own-triggers");
});
```
Your options will automatically override the existing ones.