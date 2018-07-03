(function ($, window, document, undefined) {

	const CSS_FILE = 'css/spinner.css';
	const $SPINNER = $('<i/>').addClass('icon-spin6 animate-spin');
	const ACT_START = 'start';
	const ACT_END = 'end';

	const _isFn = function (fn) {
		return fn && typeof fn === 'function';
	};

	const _isCssLoaded = function () {
		return $("link[href='" + CSS_FILE + "']").length > 0;
	};

	const _loadCss = function () {
		if (_isCssLoaded()) {
			return;
		}
		var link = $('<link/>').attr({
			rel: 'stylesheet',
			type: 'text/css',
			href: CSS_FILE
		});
		$('head').append(link);
	};

	const _addSpinner = function ($target, fn) {
		if (_isSpinnerExists($target)) {
			return;
		}
		if (_isFn(fn)) {
			fn($target, $SPINNER);
		} else {
			$target.prepend($SPINNER);
		}
	};

	const _removeSpinner = function ($target) {
		if (_isSpinnerExists($target)) {
			$target.find('i.icon-spin6.animate-spin').remove();
		}
	};

	const _isSpinnerExists = function ($target) {
		return $target.find('i.icon-spin6.animate-spin').length > 0;
	};

	$.fn.spinner = function (action, options) {
		_loadCss();
		this.each(function () {
			if (action === ACT_START) {
				_addSpinner($(this));
			}
			if (action === ACT_END) {
				_removeSpinner($(this));
			}
		});
		return this;
	};

})(jQuery, window, document);