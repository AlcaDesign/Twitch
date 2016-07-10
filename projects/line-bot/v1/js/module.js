(function(global) {
	
	class Module {
		constructor(name) {
			this.name = name || null;
		}
		
		exports(value) {
			if(typeof value === 'undefined') {
				throw new TypeError('Nothing passed');
			}
			else if(this.name === null) {
				throw new Error('Not ready');
			}
			global[this.name] = value;
			return this;
		}
	}
	
	global.Module = Module;
	
})(window);
