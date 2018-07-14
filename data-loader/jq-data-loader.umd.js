/*
payload = {
	key: "test1",
	data: {...}
}
payloads = [payload1, payload2, ...]
setting = {
	key: "test1",
	url: "https://jsonplaceholder.typicode.com/posts/1",
	type: 'GET'
	fn: function(response){			
		console.log('test1:'+response.id);
	}
}
*/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function (root, jQuery) {
			if (jQuery === undefined) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery, window, document);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {

	var _repo = {};

	const ACT_SET = 'set';
	const ACT_LOAD = 'load';

	const HTTP_GET = 'GET';
	const HTTP_POST = 'POST';

	const isFn = function (fn) {
		return fn && typeof fn === 'function';
	};

	const _load = function (payload) {
		const setting = _repo[payload.key];
		if (setting) {
			return execAjax(setting.url, setting.data, setting.type);
		}
		return $.Deferred().promise();
	};

	const load = function (payloads) {

		var promises = [];

		$.each(payloads, function (index, payload) {
			promises.push(_load(payload));
		});

		return promises;
	};

	const execAjax = function (url, data, httpType) {

		httpType = httpType || HTTP_GET;

		return $.ajax({
			url: url,
			type: httpType,
			data: data,
		});
	};

	const execFn = function (key, promise) {
		if (_repo[key] && isFn(_repo[key].fn)) {
			return promise.then(function (response) {
				_repo[key].fn(response);
			});
		}
	};

	const execLoader = function (payloads) {

		var dfrd = $.Deferred();
		var p = dfrd.promise();

		const promises = load(payloads);

		$.each(promises, function (index, promise) {
			const key = payloads[index].key;
			if (_repo[key] && isFn(_repo[key].fn)) {
				p = p.then(function () {
					return promise;
				}).then(function (response) {
					_repo[key].fn(response);
				});
			}
		});

		dfrd.resolve();
		return p;
	};

	const setLoader = function (args) {
		if (!args) {
			return;
		}
		if (!args.key) {
			return;
		}
		if (_repo[args.key] === undefined) {
			_repo[args.key] = args;
		}
	};

	$.dataLoader = function (action, args) {

		if (action === ACT_SET) {
			setLoader(args);
		}
		if (action === ACT_LOAD) {
			return execLoader(args);
		}

	};

	$.dataLoader.set = function (args) {
		setLoader(args);
		return this;
	};

	$.dataLoader.load = function (args) {
		return execLoader(args);
	};

}));