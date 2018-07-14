(function ($, window, document, undefined) {

	const ACT_START = 'start';
	const ACT_END = 'end';
	const DEFAULT = {
		class: 'fas fa-spinner fa-spin'
	};
	var _options = {};

	const _isFn = function (fn) {
		return fn && typeof fn === 'function';
	};

	const _getIconSelector = function () {
		return 'i.' + _options.class.split(' ').join('.');
	};

	const _create = function () {
		return $('<i/>').addClass(_options.class);
	};

	const _add = function ($parent, fn) {
		var $spinner = _create();

		if (_isExisting($parent)) {
			return;
		}
		if (_isFn(fn)) {
			fn($parent, $spinner);
		} else {
			$parent.prepend($spinner);
		}
	};

	const _remove = function ($parent) {

		if (_isExisting($parent)) {
			$parent.find(_getIconSelector()).remove();
		}
	};

	const _isExisting = function ($parent) {

		return $parent.find(_getIconSelector()).length > 0;
	};

	$.fn.spinner = function (action, options) {
		$.extend(_options, DEFAULT, options);
		this.each(function () {
			if (action === ACT_START) {
				_add($(this));
			}
			if (action === ACT_END) {
				_remove($(this));
			}
		});
		return this;
	};

})(jQuery, window, document);