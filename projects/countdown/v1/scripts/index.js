var elements = {
			countdown:	document.getElementById('countdown'),
			hours:		document.getElementById('hours'),
			minutes:	document.getElementById('minutes'),
			seconds:	document.getElementById('seconds'),
		},
	qs = parseQS(),
	countdownDate = Date.parse(qs.countdown),
	anim = requestAnimationFrame(draw);

function parseQS() {
	return location.search.substr(1)
			.split('&')
			.filter(function(n) { return n; })
			.map(function(n) { return n.split('='); })
			.reduce(function(p, n) {
					p[n[0]] = decodeURIComponent(n[1] || true);
					if(n[0][0] == '!') {
						p[n[0].substr(1)] = false;
					}
					else if(p[n[0]] === 'true') {
						p[n[0]] = true;
					}
					else if(p[n[0]] === 'false') {
						p[n[0]] = false;
					}
					return p;
				}, {});
}
function s(n) {
	return Math.abs(parseInt(n)) !== 1 ? 's' : '';
}
function pad(text, padding, length, side) {
	text = '' + text;
	side = side === undefined || side == 'right' || side === true;
	if(text.length >= length || padding.length === 0) return text;
	if(side) text += padding;
	else text = padding + text;
	return this.pad(text, padding, length, side);
}
function padL(text, padding, length) {
	return this.pad(text, padding, length, false);
}
function timeDiff(timestamp, options) {
	if(timestamp === undefined) return null;
	options = options || {};
	var self = this,
		now = options.now || new Date(),
		then = new Date(timestamp),
		difference = now.getTime() - then.getTime(),
		isFuture = difference < 0,
		suffixes = options.suffixes || ['year','day','hour',
			'minute','second'];
	if(isFuture) {
		if(options.future === false) {
			var arr = [];
			arr.isFuture = isFuture;
			return arr;
		}
		difference = Math.abs(difference);
	}
	else if(options.future === true) {
		var arr = [];
		arr.isFuture = isFuture;
		return arr;
	}
	var sec = difference/1000, min = sec/60,
		hr = min/60, d = hr/24,
		showRest = false;
	function filterOut(n, i, arr) {
		if(i + 1 == arr.length) return true;
		var notZero = n !== 0;
		if(notZero) showRest = true;
		return notZero || showRest;
	}
	function pad(n) {
		var padding = typeof options.pad == 'string' ? options.pad : 0;
		return self.padL(n, padding, 2);
	}
	function suffix(n, i, arr) {
		var offset = suffixes.length - arr.length,
			suffixDelim = ' ';
		if(typeof options.suffix == 'string')
			suffixDelim = options.addsuffixes;
		return n + suffixDelim + suffixes[offset + i] + utils.s(n);
	}
	var times = [d/365, d%365, hr%24, min%60, sec%60]
			.map(function(n) { return Math.floor(n); });
	if(options.filter || options.filter === undefined)
		times = times.filter(filterOut);
	if(options.pad === undefined && options.pad !== false)
		times = times.map(pad);
	if(options.suffix !== undefined && options.suffix !== false)
		times = times.map(suffix);
	times.isFuture = isFuture;
	return times;
}

function draw() {
	var tD = timeDiff(countdownDate, { future: true }).reverse();
	
	if(tD.isFuture) {
		elements.seconds.innerText = tD[0] || '00';
		elements.minutes.innerText = tD[1] || '00';
		elements.hours.innerText = tD[2] || '00';
		anim = requestAnimationFrame(draw);
	}
	else {
		elements.seconds.innerText = '00';
		elements.minutes.innerText = '00';
		elements.hours.innerText = '00';
	}
}
