(function(module) {

function addToLine(user, addedByOther) {
	let name = (user.username || user).replace(/\W/g, '');
	if(name === '') {
		return false;
	}
	else if(line.list.find(n => name.toLowerCase() === n.name)) {
		return false;
	}
	
	let item = {
				name: name.toLowerCase(),
				display: user['display-name'] || name,
				added: Date.now(),
				removed: false,
				removedByOther: false,
				ele: null,
				addedByOther
			};
	
	if(item.name.indexOf('"') > -1) {
		item.name = item.name.replace(new RegExp('"', 'g'), '\\\\"');
	}
	
	let itemEle = document.createElement('div'),
		itemNameEle = document.createElement('div'),
		itemRemoveEle = document.createElement('div');
	
	itemEle.className = 'list-item';
	itemNameEle.className = 'item-name';
	itemRemoveEle.className = 'item-remove';
	
	itemEle.setAttribute('name', name.toLowerCase());
	itemNameEle.innerText = item.display;
	itemRemoveEle.addEventListener('click', () => removeFromLine(user), false);
	
	itemEle.appendChild(itemRemoveEle);
	itemEle.appendChild(itemNameEle);
	list.appendChild(itemEle);
	
	item.ele = itemEle;
	
	line.list.push(item);
	
	return item;
}

function removeFromLine(user, removedByOther) {
	let name = (user.username || user.name || user).toLowerCase(),
		ele = user.ele || document.querySelector(`[name="${name}"]`),
		itemIndex = line.list.findIndex(n => name === n.name),
		item = line.list[itemIndex];
	if(itemIndex < 0) {
		return false;
	}
	ele.parentNode.removeChild(ele);
	line.list.splice(itemIndex, 1);
	
	item.removed = Date.now();
	item.removedByOther = removedByOther || false;
	
	return item;
}

function clearLine() {
	return line.list.slice(0).map(removeFromLine);
}

function sortUpdate(event) {
	let item = line.list.splice(event.oldIndex, 1)[0];
	line.list.splice(event.newIndex, 0, item);
}


module.exports({
	add: addToLine,
	remove: removeFromLine,
	clear: clearLine,
	list: [],
	commands: {
			add: '',
			remove: ''
		},
	sortUpdate
});

})(new Module('line'));
