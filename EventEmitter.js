(function() {
	var EventEmitter = function() {};

	EventEmitter.prototype.dictionary = {};

	EventEmitter.prototype.on = function(event, callback) {

		if(!callback) {
			return;
		}

		if(!this.dictionary[event]) {
			this.dictionary[event] = [];
		}

		return this.dictionary[event].push(callback);
	};

	EventEmitter.prototype.emit = function() {
		var _args = [];

		var evtName;

		for(var i in arguments) {
			_args.push(arguments[i]);
		}

		evtName = _args.splice(0, 1);

		for(var key in this.dictionary[evtName]) {
			this.dictionary[evtName][key].apply(this, _args);
		}

		return;
	};

	// Node.js
	if (typeof module === 'object' && module.exports) {
		module.exports = EventEmitter;
	}
	// AMD / RequireJS
	else if (typeof define === 'function' && define.amd) {
		define([], function () {
			return EventEmitter;
	    });
	}
	// included directly via <script> tag
	else {
		root.async = EventEmitter;
	}

})();