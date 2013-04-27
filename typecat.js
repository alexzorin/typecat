var system = require('system');
var webpage = require('webpage');
var fs = require('fs');

var b64_header = 'data:font/opentype;base64,';

function dumpFont(font_name) {

	console.log("Dumping", font_name);

	var page = webpage.create();
	var font_bin = [];

	/* May as well pretend we're chrome for the chrome targeted fonts */
	page.settings.userAgent = 'Agent:Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31';

	/* Catch the font data in the 'data:' resource requested event */
	page.onResourceRequested = function(reqData) {
		if(reqData.url.indexOf(b64_header) === 0) {
			font_bin.push(atob(reqData.url.slice(b64_header.length)));
		}
	};

	page.onInitialized = function() {
		page.evaluate(function(domContentLoadedMsg) {
			document.addEventListener('DOMContentLoaded', function() {
				window.callPhantom('DOMContentLoaded');
			}, false);
		});
	};

	/* catch font names/weights/styles on the actual page and hope that the orders match (they do for now) */
	page.onCallback = function() {
		var titles = page.evaluate(function() {
			return $("dt", ".font-variations").map(function(i,v) { return $(v).contents(':not(abbr)').text().trim().replace(' ', '_'); });
		});

		for(var i = 0; i < titles.length; i++) {
			var file = fs.open(font_name + '_' + titles[i] + ".ttf", 'wb');
			file.write(font_bin[i]);
			file.close();
		}

		console.log('Done with', font_name);
	};

	page.open('https://typekit.com/fonts/' + font_name, function(status) {
		if(status !== 'success') {
			console.log('Failed', status, font_name);
		}
	});

}

if (system.args.length < 2) {
	console.log('USAGE: phantomjs typeripper.phantom.js font-name');
	phantom.exit();
}

console.log('^c when all fonts are done');

system.args.slice(1).forEach(function (v) {
	dumpFont(v);
});