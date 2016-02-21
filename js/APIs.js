/* jshint esversion: 6 */

(function(global) { 'use strict';

function each(a, predicate) {
	var keys = Object.keys(a);
	keys.forEach(key => predicate(a[key], key, a));
}

function API(config) {
	this.base = config.base;
	this.config = config;
	return opts => {
			var method = (opts.method || 'GET').toUpperCase();
			opts.method = method;
			if(method === 'GET') {
				return this.fetch(opts);
			}
			/*else if(method === 'POST') {
				return this.post(opts);
			}
			else if(method === 'PATCH') {
				return this.patch(opts);
			}*/
			else {
				return this.fetch(opts);
			}
		};
}

API.prototype.fetch = function(options) {
		return fetch(this.base + options.url)
			.then(res => {
				return res.json();
			});
	};

/*API.prototype.post = function(options) {
		var headers = new Headers();
		if(options.headers) {
			each(options.headers, (val, key) => {
					console.log(val, key);
					headers.append(key, val);
				});
		}
		headers.append('method', 'POST');
		options.headers = headers;
		console.log(headers);
		return this.fetch(options);
	};

API.prototype.patch = function(options) {
		var headers = new Headers();
		if(options.headers) {
			each(options.headers, (val, key) => {
					headers.append(key, val);
				});
		}
		headers.method = 'POST';
		options.headers = headers;
		console.log(headers);
		return this.fetch(options);
	};*/

/*
	
	** * * *** * * ** * * *** * * ** * * *** * * **
	
*/

var api = {};

api.github = new API({
			base: 'https://api.github.com/'
		});

global.APIs = api;

})(window);
