'use strict';

var google = {
	key: 'AIzaSyByRRku0tHkLZmsTq9I6Ox7o0gQhjR2v-A'
},
    displayElement = document.getElementById('subcount');

var qs = {},
    username = '',
    lastCount = 0,
    sameInARow = 0;

function getSearch() {
	return location.search.replace(/^\?/, '').split('&').map(function (n) {
		return n.split('=');
	}).reduce(function (p, n) {
		p[n[0]] = n[1];
		return p;
	}, {});
}

function getSubscribers(forUsername) {
	if (!forUsername) {
		return Promise.reject('No user found');
	}
	return new Promise(function (resolve, reject) {
		gapi.client.youtube.channels.list({
			part: 'statistics',
			forUsername: forUsername,
			fields: 'items/statistics/subscriberCount',
			prettyPrint: false
		}).then(function (data) {
			var result = data.result;
			if (result.items.length === 0) {
				reject(new Error('No user found'));
			}
			var channel = result.items[0];
			resolve(channel.statistics.subscriberCount);
		});
	});
}

function updateSubscribers() {
	return getSubscribers(username).then(function (data) {
		data = +data;
		if (lastCount === data) {
			sameInARow += 1;
		} else {
			sameInARow = 0;
		}
		lastCount = data;
		return lastCount.toLocaleString();
	}).then(addElements).then(function (subCount) {
		displayElement.querySelectorAll('div').forEach(function (ele, i) {
			return ele.innerText = subCount[i];
		});
	});
}

function addElements(subCount) {
	var length = subCount.length;
	length -= displayElement.querySelectorAll('div').length;
	for (var i = 0; i < length; i++) {
		var ele = document.createElement('div');
		displayElement.appendChild(ele);
	}
	return subCount;
}

function delay(data) {
	return new Promise(function (resolve) {
		var time = (sameInARow + 2) * 1000;
		time = Math.min(time, 30 * 1000);
		setTimeout(function () {
			return resolve(data);
		}, time);
	});
}

function loop() {
	return updateSubscribers().then(delay).then(loop);
}

function begin() {
	qs = getSearch();
	username = qs.username;
	if (qs.hasOwnProperty('color') && typeof qs.color == 'string') {
		displayElement.style.color = qs.color;
	}
	return loop()['catch'](function (err) {
		if (err instanceof Error) {
			console.log(err);
			if (err.message === 'No user found') {
				return;
			}
		}
		return delay().then(loop);
	});
}

function load() {
	gapi.client.setApiKey(google.key);
	gapi.client.load('youtube', 'v3').then(begin);
}
