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

	const CL_MODAL = 'modal';
	const CL_DIALOG = CL_MODAL + '-dialog';
	const CL_CONTENT = CL_MODAL + '-content';
	const CL_HEADER = CL_MODAL + '-header';
	const CL_TITLE = CL_MODAL + '-title';
	const CL_BODY = CL_MODAL + '-body';
	const CL_FOOTER = CL_MODAL + '-footer';
	const CL_CLOSE = 'close';
	const ATTR_STK_ID = 'stkmodal-id';
	const ID_PREFIX = CL_MODAL + '-';
	const DEFAULT = {
		baseZIndex: 1000,
	};

	var _options = {};
	var _isInitialized = false;

	const _isFn = function (fn) {
		return fn && typeof fn === 'function';
	};

	const _createBase = function () {
		var $dialog = $('<div/>').addClass(CL_DIALOG);
		var $content = $('<div/>').addClass(CL_CONTENT);
		var $header = $('<div/>').addClass(CL_HEADER);
		var $closeBtn = $('<button/>').attr('type', 'button').attr('data-dismiss', 'stkmodal').addClass(CL_CLOSE);
		var $closeIcon = $('<span/>').attr('aria-hidden', 'true').html('&times;');
		var $body = $('<div/>').addClass(CL_BODY);
		var $footer = $('<div/>').addClass(CL_FOOTER);

		$closeBtn.append($closeIcon);
		$header.append($closeBtn);
		$content.append($header).append($body).append($footer);
		$dialog.append($content);

		return $('<div/>')
			.addClass(CL_MODAL)
			.addClass('stkmodal')
			.append($dialog);
	};

	const _create = function (options) {
		if (options.id === undefined || options.id === null) {
			throw Error('id is not defined.');
		}
		var $modal = _createBase();
		_setModalId($modal, options.id);
		_setModalContents($modal, options.header, options.body, options.footer);
		_setModalBaseEvents($modal);
		$('body').append($modal);
	};

	const _setModalId = function ($modal, id) {
		$modal.attr(ATTR_STK_ID, id);
	};

	const _setModalContents = function ($modal, header, body, footer) {
		$modal.find('.' + CL_HEADER).prepend(header);
		$modal.find('.' + CL_BODY).append(body);
		$modal.find('.' + CL_FOOTER).append(footer);
	};

	const _setModalBaseEvents = function ($modal) {
		$modal.on('stk:show', function () {
			var stackedCount = $('.stkmodal:visible').length;
			$(this).css('z-index', _options.baseZIndex + (10 * stackedCount));
		});
		$modal.on('stk:hidden', function () {
			$(this).css('z-index', _options.baseZIndex);
		});
		$modal.find('[data-dismiss=stkmodal]').on('click', function () {
			var id = $modal.attr(ATTR_STK_ID);
			_hide(id);
		});
	};

	const _show = function (id) {
		var $modal = $('[stkmodal-id=' + id + ']');
		if ($modal.length) {
			$modal.trigger('stk:show');
			$modal.show();
			$modal.trigger('stk:shown');
		}
	};

	const _hide = function (id) {
		var $modal = $('[stkmodal-id=' + id + ']');
		if ($modal.length) {
			$modal.trigger('stk:hide');
			$modal.hide();
			$modal.trigger('stk:hidden');
		}
	};

	const _destroy = function (id) {
		var $modal = $('[stkmodal-id=' + id + ']');
		if ($modal.length) {
			$modal.remove();
		}
	};

	const _initialize = function (options) {
		if (options) {
			$.extend(_options, $.stkModal.defaults, options);
		} else {
			$.extend(_options, $.stkModal.defaults);
		}
		_isInitialized = true;
	};

	$.stkModal = function (options) {
		console.log('Ahh...');
	};

	$.stkModal.defaults = {
		baseZIndex: 1000,
		loadcss: false,
		css: './css/stkmodal.css'
	};

	$.stkModal.initialize = function (options) {
		if (!_isInitialized) {
			_initialize(options);
		}
		return this;
	};

	$.stkModal.create = function (options) {
		if (!_isInitialized) {
			_initialize();
		}
		_create(options);
		return this;
	};

	$.stkModal.show = function (id) {
		_show(id);
		return this;
	};

	$.stkModal.hide = function (id) {
		_hide(id);
		return this;
	};

	$.stkModal.destroy = function (id) {
		_destroy(id);
		return this;
	};

	$.stkModal.auto = function (id) {
		$('[stkmodal-target]').on('click', function () {
			_show($(this).attr('stkmodal-target'));
		});
	};

}));