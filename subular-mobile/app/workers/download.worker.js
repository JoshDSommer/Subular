require('globals');
var http = require("http");

global.onmessage = function (msg) {
	http.getFile({
		url: msg.data.url,
		method: "GET",
	}, msg.data.path).then(() => {
		global.postMessage('true');
	}, (error) => {
		global.postMessage('fail')
	});

}