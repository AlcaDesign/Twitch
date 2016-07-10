function logError(e) {
	if(e) {
		if(e instanceof Error) {
			console.log(e.message);
		}
		else {
			console.log(e);
		}
	}
}

function attachListeners() {
	[
		[	inputs.connect,		'click',	chat.clickedConnect		],
		[	inputs.disconnect,	'click',	chat.clickedDisconnect	],
		[	inputs.channel,		'keydown',	chat.clickedConnect		],
		[	inputs.channel,		'keydown',	chat.clickedConnect		],
		[	inputs.channel,		'input',	settings.save			],
		[	inputs.addline,		'input',	settings.save			],
		[	inputs.removeline,	'input',	settings.save			],
		[	inputs.clearBtn,	'click',	line.clear				]
	].forEach((n,i) => {
			n[0].addEventListener(n[1], n[2], false);
		});
	
	chat.attachListeners();
}

void function init() {
	Sortable.create(outputs.list, {
			animation: 100,
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			onUpdate: line.sortUpdate
		});
	chat.create();
	settings.load();
	attachListeners();
}();
