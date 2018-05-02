import React__default, { createElement, Component } from 'react';
import { render } from 'react-dom';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var BigNumber = function BigNumber(_ref) {
    var number = _ref.number;

    return createElement(
        'h1',
        null,
        number
    );
};

var Hello = function (_React$Component) {
    inherits(Hello, _React$Component);

    function Hello() {
        classCallCheck(this, Hello);
        return possibleConstructorReturn(this, (Hello.__proto__ || Object.getPrototypeOf(Hello)).apply(this, arguments));
    }

    createClass(Hello, [{
        key: 'render',
        value: function render$$1() {
            return createElement(
                'h2',
                null,
                'hello!',
                this.props.name,
                createElement(BigNumber, { number: 123321 })
            );
        }
    }]);
    return Hello;
}(Component);

function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function assignTrue(tar, src) {
	for (var k in src) tar[k] = 1;
	return tar;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createElement$1(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = null;
	this._state = {};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function get$1() {
	return this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set$1(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

var proto = {
	destroy,
	get: get$1,
	fire,
	on,
	set: set$1,
	_recompute: noop,
	_set,
	_mount,
	_unmount,
	_differs
};

var User = function () {
    function User() {
        classCallCheck(this, User);
    }

    createClass(User, [{
        key: "setName",
        value: function setName(name) {
            this.name = name;
        }
    }]);
    return User;
}();

/* src/svelte/modal.sve generated by Svelte v2.3.0 */

function data() {
	return {
		visible: true,
		scrollEvent: null
	};
}
var methods = {
	contentScroll: function contentScroll(event) {
		var content = document.querySelector('.content');
		content.scrollTop += event.deltaY;
	}
};

function oncreate() {}
function ondestroy() {}
function onstate(_ref) {
	var changed = _ref.changed,
	    current = _ref.current,
	    previous = _ref.previous;

	if (current.visible && current.scrollEvent) {
		current.scrollEvent.preventDefault();
	}
	if (!current.visible) {
		document.querySelector('.content').scrollTop = 0;
	}
}
function onupdate(_ref2) {
	var changed = _ref2.changed,
	    current = _ref2.current,
	    previous = _ref2.previous;
}
function create_main_fragment(component, ctx) {
	var div, div_1, text_36, p_34, button, div_class_value;

	function onwindowmousewheel(event) {
		component.set({ scrollEvent: event });	}
	window.addEventListener("mousewheel", onwindowmousewheel);

	function mousewheel_handler(event) {
		component.contentScroll(event);
	}

	function click_handler(event) {
		component.set({ visible: false });
	}

	return {
		c: function create() {
			div = createElement$1("div");
			div_1 = createElement$1("div");
			div_1.innerHTML = "<div class=\"demo svelte-1dcf1sz\"><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p><p>2</p></div>";
			text_36 = createText("\n  ");
			p_34 = createElement$1("p");
			button = createElement$1("button");
			button.textContent = "close!!";
			this.h();
		},

		h: function hydrate() {
			addListener(div_1, "mousewheel", mousewheel_handler);
			div_1.className = "content svelte-1dcf1sz";
			addListener(button, "click", click_handler);
			div.className = div_class_value = "modal " + (ctx.visible ? 'show' : '') + " svelte-1dcf1sz";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(text_36, div);
			appendNode(p_34, div);
			appendNode(button, p_34);
		},

		p: function update(changed, ctx) {
			if (changed.visible && div_class_value !== (div_class_value = "modal " + (ctx.visible ? 'show' : '') + " svelte-1dcf1sz")) {
				div.className = div_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			window.removeEventListener("mousewheel", onwindowmousewheel);

			removeListener(div_1, "mousewheel", mousewheel_handler);
			removeListener(button, "click", click_handler);
		}
	};
}

function Modal(options) {
	var _this = this;

	init(this, options);
	this._state = assign(data(), options.data);

	this._handlers.state = [onstate];
	this._handlers.update = [onupdate];

	this._handlers.destroy = [ondestroy];

	if (!options.root) {
		this._oncreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(function () {
		onstate.call(_this, { changed: assignTrue({}, _this._state), current: _this._state });
		oncreate.call(_this);
		_this.fire("update", { changed: assignTrue({}, _this._state), current: _this._state });
	});

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		callAll(this._oncreate);
	}
}

assign(Modal.prototype, proto);
assign(Modal.prototype, methods);

/* src/svelte/main.sve generated by Svelte v2.3.0 */

function data$1() {
	return {};
}
var methods$1 = {};

function oncreate$1() {
	var _this = this;

	var U = new User();
	U.setName(1);
	console.log(U);

	var plist = document.querySelectorAll('.wrapper > p');
	plist.forEach(function (p) {
		p.onclick = function () {
			_this.refs.modal.set({ visible: true });
		};
	});
}
function ondestroy$1() {}
function create_main_fragment$1(component, ctx) {
	var div, text_69;

	var modal = new Modal({
		root: component.root
	});

	component.refs.modal = modal;

	return {
		c: function create() {
			div = createElement$1("div");
			div.innerHTML = "<p>2</p><p>3</p><p>4</p><p>5</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>";
			text_69 = createText("\n\n");
			modal._fragment.c();
			this.h();
		},

		h: function hydrate() {
			div.className = "wrapper svelte-m210nz";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			insertNode(text_69, target, anchor);
			modal._mount(target, anchor);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
			detachNode(text_69);
			modal._unmount();
		},

		d: function destroy$$1() {
			modal.destroy(false);
			if (component.refs.modal === modal) component.refs.modal = null;
		}
	};
}

function Main(options) {
	var _this2 = this;

	init(this, options);
	this.refs = {};
	this._state = assign(data$1(), options.data);

	this._handlers.destroy = [ondestroy$1];

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment$1(this, this._state);

	this.root._oncreate.push(function () {
		oncreate$1.call(_this2);
		_this2.fire("update", { changed: assignTrue({}, _this2._state), current: _this2._state });
	});

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Main.prototype, proto);
assign(Main.prototype, methods$1);

var App = function App() {
  new Main({
    target: document.getElementById('app')
  });
};

App();

render(React__default.createElement(Hello, { name: 1 }), document.getElementById('react'));
