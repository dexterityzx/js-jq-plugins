(function ($, window, document, undefined) {

	const EMPTY = '';

	const OPTION_KEYWORD = 'val-option';

	const DEFAULTS_KEYWORDS = {
		TYPE_REQUIRED: 'val-required',
		TYPE_NUM: 'val-number',
		TYPE_TIME: 'val-time',
	};

	const OPTIONS = {
		OPT_TIME_24: '24',
		OPT_TIME_12: '12',
		OPT_NUM_POSITIVE: '+',
		OPT_NUM_NEGATIVE: '-',
		OPT_NUM_NONE_ZERO: '~0'
	};

	var USER_KEYWORDS = {};

	const _isFn = function (fn) {
		return fn && typeof fn === 'function';
	};

	const _isInput = function ($target) {
		return $target.is('input');
	};

	const _isSelect = function ($target) {
		return $target.is('select');
	};

	const _isMultiSelect = function ($target) {
		return _isSelect($target) && $target.prop('multiple');
	};

	const _hasVal = function ($target) {
		var val = $target.val();
		return $.isArray(val) ?
			val.indexOf(EMPTY) < 0 : val !== EMPTY;
	};

	const _checkRequired = function ($target, option) {
		if (_isInput($target) || _isSelect($target)) {
			return _hasVal($target);
		}
		return false;
	};

	const _checkNumbers = function ($target, option) {
		var regexp;
		switch (option) {
			case OPTIONS.OPT_NUM_POSITIVE:
				regexp = /^[+]*\d+$/;
				break;
			case OPTIONS.OPT_NUM_NEGATIVE:
				regexp = /^[-]\d+$/;
				break;
			case OPTIONS.OPT_NUM_NONE_ZERO:
				regexp = /^[+-]*[1-9]+$/;
				break;
			default:
				regexp = /^[+-]*\d+$/;
		}
		var tVal = $target.val();
		if (!tVal.length) {
			return false;
		}
		if (_isMultiSelect($target)) {
			return tVal.reduce(function (rlt, val) {
				return rlt && regexp.test(val);
			}, true);
		}
		if (_isInput($target) || _isSelect($target)) {
			return regexp.test(tVal);
		}
		return true;
	};

	const _checkTime = function ($target, option) {
		var regexp;
		switch (option) {
			case OPTIONS.OPT_TIME_24:
				regexp = /^(([0-1][1-9])|2[0-3]):?([0-5])([0-9])$/;
				break;
			case OPTIONS.OPT_TIME_12:
				/* falls through */
			default:
				regexp = /(((0[1-9])|(1[0-2])):?([0-5])([0-9])\s?(A|P|a|p)(M|m))/;
		}
		var tVal = $target.val();
		if (!tVal.length) {
			return false;
		}
		if (_isMultiSelect($target)) {
			return tVal.reduce(function (rlt, val) {
				return rlt && regexp.test(val);
			}, true);
		}
		if (_isInput($target) || _isSelect($target)) {
			return regexp.test(tVal);
		}
		return true;
	};

	const _warn = function ($target, isValid) {
		if (isValid) {
			$target.removeClass('is-invalid');
		} else {
			$target.addClass('is-invalid');
		}
		return isValid;
	};
	const _toJqAttr = function (attr) {
		return '[' + attr + ']';
	};
	const _exec = function ($target) {
		var rlt = true;
		//
		const option = $target.attr(OPTION_KEYWORD);
		if ($target.is(_toJqAttr(DEFAULTS_KEYWORDS.TYPE_REQUIRED))) {
			rlt = rlt && _warn($target, _checkRequired($target, option));
		}
		if ($target.is(_toJqAttr(DEFAULTS_KEYWORDS.TYPE_NUM))) {
			rlt = rlt && _warn($target, _checkNumbers($target, option));
		}
		if ($target.is(_toJqAttr(DEFAULTS_KEYWORDS.TYPE_TIME))) {
			rlt = rlt && _warn($target, _checkTime($target, option));
		}
		return rlt;
	};

	const _getTargetSelector = function () {
		var targets = [];
		Object.keys(USER_KEYWORDS).forEach(function (key) {
			if (key.indexOf('TYPE') === 0) {
				targets.push(_toJqAttr(USER_KEYWORDS[key]));
			}
		});
		return targets.join(',');
	};

	$.validator = function (keywordsOptions) {
		$.extend(USER_KEYWORDS, DEFAULTS_KEYWORDS, keywordsOptions);
	};

	$.validator.run = function (keywordsOptions) {
		$.extend(USER_KEYWORDS, DEFAULTS_KEYWORDS, keywordsOptions);
		//
		const selector = _getTargetSelector();
		const $targets = $(selector);
		$targets.each(function () {
			_exec($(this));
		});
	};

})(jQuery, window, document);