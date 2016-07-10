const errors = {
			CHANNEL_EMPTY: 'Channel is an empty string.',
			CHANNEL_WRONG_TYPE: 'Channel is not a string.',
			TMI_ALREADY_CONNECTED: 'Client might still be connected.',
			TMI_ALREADY_DISCONNECTED: 'Client is already disconnected.'
		},
	inputs = {
			options: document.getElementById('options'),
			channel: document.getElementById('channel'),
			connect: document.getElementById('connect'),
			disconnect: document.getElementById('disconnect'),
			addline: document.getElementById('command-add'),
			removeline: document.getElementById('command-remove'),
			clearBtn: document.getElementById('clear-line')
		},
	outputs = {
			status: {
					connection: document.getElementById('connection-status'),
					join: document.getElementById('join-status')
				},
			line: document.getElementById('line'),
			list: document.getElementById('list')
		};

let client;
