(function(module) {

let _channel = '';

function loadFromStorage() {
	line = JSON.parse(localStorage.twitchchatlinebot || '{}');
	line.list = line.list || [];
}

function saveToStorage() {
	localStorage.twitchchatlinebot = JSON.stringify(line);
}

function parseHash() {
	return location.hash
		.replace(/^#/, '')
		.split('&')
		.map(n => n.split('='))
		.reduce((p, n) => {
				p[decodeURIComponent(n[0])] = decodeURIComponent(n[1] || '') || true;
				return p;
			}, {});
}

function stringifyHash(obj) {
	return location.hash = Object.keys(obj)
		.map(key =>
				`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
			)
		.join('&');
}

function restoreFromHash() {
	let hash = parseHash(),
		cA = 'command.add',
		cR = 'command.remove';
	
	if(hash.hasOwnProperty('channel') && typeof hash.channel === 'string') {
		let channel = hash.channel.toLowerCase();
		_channel = channel;
		inputs.channel.value = channel;
	}
	if(hash.hasOwnProperty(cA) && typeof hash[cA] === 'string') {
		let add = hash[cA].toLowerCase();
		line.commands.add = add;
		inputs.addline.value = add;
	}
	if(hash.hasOwnProperty(cR) && typeof hash[cR] === 'string') {
		let remove = hash[cR].toLowerCase();
		line.commands.remove = remove;
		inputs.removeline.value = remove;
	}
}

function saveToHash() {
	let values = {
				'channel': inputs.channel.value.toLowerCase(),
				'command.add': inputs.addline.value.toLowerCase(),
				'command.remove': inputs.removeline.value.toLowerCase(),
			};
	line.commands.add = values['command.add'];
	line.commands.remove = values['command.remove'];
	return stringifyHash(values);
}

module.exports({
	save: saveToHash,
	load: restoreFromHash,
	channel
});

})(new Module('settings'));
