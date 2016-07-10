(function(module) {

const identifiers = /^[!@#$%^&*()_+]+/g;

function test(str) {
	return identifiers.test(str.trim());
}

function normalize(name) {
	return name.replace(identifiers, '') || name;
}

function parse(chan, user, message) {
	if(!test(message)) {
		return false;
	}
	message = normalize(message);
}

module.exports({
	normalize,
	parse,
	test
});

})(new Module('commands'));
