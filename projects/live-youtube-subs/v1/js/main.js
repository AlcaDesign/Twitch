const google = {
			key: 'AIzaSyByRRku0tHkLZmsTq9I6Ox7o0gQhjR2v-A'
		},
	displayElement = document.getElementById('subcount');

let username = '',
	lastCount = 0,
	sameInARow = 0;

function getSearch() {
	return location.search
		.replace(/^\?/, '')
		.split('&')
		.map(n => n.split('='))
		.reduce((p,n) => {
			p[n[0]] = n[1];
			return p;
		}, {});
}

function getSubscribers(forUsername) {
	if(!forUsername) {
		return Promise.reject('No user found');
	}
	return new Promise((resolve, reject) => {
		gapi.client.youtube.channels.list({
			part: 'statistics',
			forUsername,
			fields: 'items/statistics/subscriberCount',
			prettyPrint: false
		})
		.then(data => {
			let result = data.result;
			if(result.items.length === 0) {
				reject(new Error('No user found'));
			}
			let channel = result.items[0];
			resolve(channel.statistics.subscriberCount);
		});
	});
}

function updateSubscribers() {
	return getSubscribers(username)
		.then(data => {
			data = +data;
			if(lastCount === data) {
				sameInARow += 1;
			}
			else {
				sameInARow = 0;
			}
			lastCount = data;
			return lastCount.toLocaleString();
		})
		.then(addElements)
		.then(subCount => {
			displayElement.querySelectorAll('div')
				.forEach((ele, i) => ele.innerText = subCount[i]);
		});
}

function addElements(subCount) {
	let length = subCount.length;
	length -= displayElement.querySelectorAll('div').length;
	for(let i = 0; i < length; i++) {
		let ele = document.createElement('div');
		displayElement.appendChild(ele);
	}
	return subCount;
}

function delay(data) {
	return new Promise(resolve => {
		let time = (sameInARow + 2) * 1000;
		time = Math.min(time, 30 * 1000);
		setTimeout(() => resolve(data), time);
	});
}

function loop() {
	return updateSubscribers()
		.then(delay)
		.then(loop);
}

function begin() {
	username = getSearch().username;
	return loop()
		.catch(err => {
			if(err instanceof Error) {
				console.log(err);
				if(err.message === 'No user found') {
					return;
				}
			}
			return delay()
				.then(loop);
		});
}

function load() {
	gapi.client.setApiKey(google.key);
	gapi.client.load('youtube', 'v3')
		.then(begin);
}
