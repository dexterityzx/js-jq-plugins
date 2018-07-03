(function ($, window, document, undefined) {

	const ACT_LOAD = 'load';
	const ACT_REMOVE = 'remove';

	const HTTP_GET = 'GET';
	const HTTP_POST = 'POST';

	const DEFAULT = {
		keepFirst: true,
		textAsValue: true
	};

	const _isFn = function (fn) {
		return fn && typeof fn === 'function';
	};

	const _isObj = function (obj) {
		return obj && typeof obj === "object";
	};

	const _isSelectTag = function ($target) {
		return $target.is('select');
	};

	const _generateOption = function (value, text) {
		return $('<option/>').attr('value', value).text(text);
	};

	const _defaultDataFn = function (data) {
		var rData = [];
		if ($.isArray(data)) {
			data.forEach(function (d) {
				rData.push({
					value: d,
					text: d
				});
			});
		} else if (_isObj(list)) {
			Object.keys(data).forEach(function (key) {
				rData.push({
					value: key,
					text: data[key]
				});
			});
		}
		return rData;
	};

	const _addOptions = function ($target, data, dataFn) {

		dataFn = _isFn(dataFn) ? dataFn : _defaultDataFn;
		data = dataFn(data);

		data.forEach(function (obj) {
			var option = _generateOption(obj.value, obj.text);
			$target.append(option);
		});
	};

	const _removeOptions = function ($target, options) {
		const findQuery = options.keepFirst ?
			'option:not(:first)' : 'option';
		$target.find(findQuery).remove();
	};

	$.fn.optionLoader = function (action, options) {
		var opt = $.extend({}, DEFAULT, options);
		this.each(function () {
			var $target = $(this);
			if (!_isSelectTag($target)) {
				return;
			}
			if (action === ACT_LOAD) {
				_addOptions($target, opt.data, opt.dataFn);
			}
			if (action === ACT_REMOVE) {
				_removeOptions($target, opt);
			}
		});
		return this;
	};

}(jQuery, window, document));