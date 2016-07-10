(function(module) {

function updateConnStatus(state) {
	let colors = {
				red: 'hsl(0, 100%, 50%)',
				green: 'hsl(120, 100%, 50%)',
				blue: 'hsl(210, 100%, 50%)',
				grey: 'hsl(0, 0%, 50%)'
			},
		stateColors = {
				CONNECTING: colors.blue,
				OPEN: colors.green,
				CLOSING: colors.blue,
				CLOSED: colors.grey
			},
		stateMessages = {
				CONNECTING: 'Connecting',
				OPEN: 'Connected',
				CLOSING: 'Disconnecting',
				CLOSED: 'Disconnected'
			},
		connStatusEle = outputs.status.connection,
		stateColor,
		stateMessage;
	
	if(state === undefined || Array.isArray(state) ||
			(typeof state !== 'object' && typeof state !== 'string')) {
		state = client.readyState();
	}
	
	stateColor = state.color || stateColors[state] || colors.grey;
	stateMessage = state.message || stateMessages[state];
	
	connStatusEle.firstElementChild.style.backgroundColor = stateColor;
	connStatusEle.lastElementChild.innerText = stateMessage;
}

function createClient() {
	client = new tmi.client({
			options: {
					debug: true
				},
			connection: {
					secure: true,
					reconnect: true
				}
		});
}

function connectClient() {
	let state = client.readyState(),
		channel = inputs.channel.value.toLowerCase();
	if(state !== 'CLOSED') {
		return Promise.reject(new Error(errors.TMI_ALREADY_CONNECTED));
	}
	if(typeof channel !== 'string') {
		return Promise.reject(new TypeError(errors.CHANNEL_WRONG_TYPE));
	}
	if(channel === '') {
		return Promise.reject(new Error(errors.CHANNEL_EMPTY));
	}
	let prom = client.connect()
		.then(updateConnStatus)
		.then(() => client.join(channel))
		.then(() => _channel = channel);
	updateConnStatus();
	return prom;
}

function disconnectClient() {
	let state = client.readyState();
	if(state !== 'OPEN') {
		return Promise.reject(new Error(errors.TMI_ALREADY_DISCONNECTED));
	}
	let prom = client.disconnect()
		.then(updateConnStatus);
	updateConnStatus();
	return prom;
}

function tryingToConnect(bool) {
	if(bool) {
		inputs.channel.disabled = true;
		inputs.connect.disabled = true;
		inputs.disconnect.disabled = false;
	}
	else {
		inputs.channel.disabled = false;
		inputs.connect.disabled = false;
		inputs.disconnect.disabled = true;
	}
}

function clickedConnect(e) {
	if(e instanceof KeyboardEvent && e.keyCode !== 13) {
		return false;
	}
	tryingToConnect(true);
	settings.save();
	return connectClient()
		.catch(e => {
			if(e.message === errors.CHANNEL_EMPTY) {
				tryingToConnect(false);
				inputs.channel.className = 'alert';
				setTimeout(() => inputs.channel.className = '', 10);
				inputs.channel.focus();
			}
			else {
				logError(e);
			}
		});
}

function clickedDisconnect() {
	tryingToConnect(false);
	settings.save();
	return disconnectClient()
		.catch(e => {
			if(e.message !== errors.TMI_ALREADY_DISCONNECTED) {
				tryingToConnect(true);
				logError(e);
			}
		});
}

function handleChat(channel, user, message, fromSelf) {
	let chan = channel.replace('#', '');
	if(fromSelf || chan !== _channel) {
		return false;
	}
	
	message = message.trim();
	
	if(!message.startsWith('!')) {
		return false;
	}
	
	let params = message.split(' '),
		command = params.shift().toLowerCase().substr(1),
		
		isBroadcaster = user.username === chan,
		isSub = user.subscriber,
		
		modUp = user.mod || isBroadcaster,
		subUp = isSub || modUp;
	
	if(subUp) {
		let action = false,
			name = user,
			changedByOther = false;
		
		switch(command) {
			case line.commands.add:
				action = line.add;
				break;
			case line.commands.remove:
				action = line.remove;
				break;
			default:
				return false;
		}
		
		if(modUp && params.length > 0) {
			let param1 = params[0].replace(/\W/g, '');
			if(name !== user.username) {
				changedByOther = true;
				name = {
					'display-name': param1,
					username: param1.toLowerCase()
				};
			}
		}
		
		if(action) {
			return action(name, changedByOther);
		}
	}
}

function attachListeners() {
	client.on('join', (channel, username, self) => {
			if(self) {
				outputs.status.join.innerText = `Joined ${channel.substr(1)}`;
			}
		})
		.on('part', (channel, username, self) => {
			if(self) {
				outputs.status.join.innerText = `Parted ${channel.substr(1)}`;
			}
		})
		.on('connected', () => {
			tryingToConnect(true);
			updateConnStatus();
			inputs.options.classList.remove('disconnected');
		})
		.on('disconnected', reason => {
			tryingToConnect(false);
			updateConnStatus();
			inputs.options.classList.add('disconnected');
		})
		.on('reconnect', () => {
			tryingToConnect(true);
			updateConnStatus({ message: 'Reconnecting' });
		})
		.on('message', handleChat);
}

module.exports({
	attachListeners,
	clickedConnect,
	clickedDisconnect,
	connect: connectClient,
	create: createClient,
	disconnect: disconnectClient,
	handle: handleChat,
	tryingToConnect,
	updateConnStatus,
});

})(new Module('chat'));
