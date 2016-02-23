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
			if(opts === undefined) {
				return Promise.reject(
						new TypeError('No options specified')
					);
			}
			var method = (opts.method || 'GET').toUpperCase();
			if(opts.headers === undefined) {
				opts.headers = {};
			}
			opts.headers.method = method;
			if(method === 'GET') {
				return this.fetch(opts);
			}
			else {
				return Promise.reject(
						new Error('Unupported method')
					);
			}
		};
}

API.prototype.fetch = function(options) {
		return fetch(this.base + options.url)
			.then(res => {
				return res.json();
			});
	};

var api = new API({ base: '' });

api.github = new API({
			base: 'https://api.github.com/'
		});

global.APIs = api;

})(window);
