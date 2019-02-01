/*!
 * iro-dynamic-css v1.0.2
 * iro.js plugin to dynamically update CSS rules whenever the selected color changes
 * 2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro-dynamic-css
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["iroDynamicCss"] = factory();
	else
		root["iroDynamicCss"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylesheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stylesheet.js */ "./stylesheet.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./util.js");



var DynamicCssPlugin = function DynamicCssPlugin(iro, pluginOptions) {
  var throttleDelay = pluginOptions.throttle || null;

  var updateStylesheet = function updateStylesheet() {
    var css = this.css;
    var rgb = this.color.rgbString;

    for (var selector in css) {
      var properties = css[selector];

      for (var property in properties) {
        this.stylesheet.setRule(selector, property, rgb);
      }
    }
  };

  iro.ColorPicker.addHook('init:before', function () {
    this.css = this.props.css || {};
    this.updateStylesheet = throttleDelay ? Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["throttle"])(updateStylesheet.bind(this), throttleDelay) : updateStylesheet.bind(this);
  });
  iro.ColorPicker.addHook('mount', function () {
    this.stylesheet = new _stylesheet_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.updateStylesheet();
  });
  iro.ColorPicker.addHook('color:afterUpdate', function () {
    this.updateStylesheet();
  });
  iro.Stylesheet = _stylesheet_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  iro.dynamicCss = {
    version: "1.0.2"
  };
};

/* harmony default export */ __webpack_exports__["default"] = (DynamicCssPlugin);

/***/ }),

/***/ "./stylesheet.js":
/*!***********************!*\
  !*** ./stylesheet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stylesheet; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stylesheet =
/*#__PURE__*/
function () {
  /**
    @constructor stylesheet writer
  */
  function Stylesheet() {
    _classCallCheck(this, Stylesheet);

    // Create a new style element
    var style = document.createElement('style');
    document.head.appendChild(style); // Webkit apparently requires a text node to be inserted into the style element
    // (according to https://davidwalsh.name/add-rules-stylesheets)

    style.appendChild(document.createTextNode(''));
    this.style = style; // Create a reference to the style element's CSSStyleSheet object
    // CSSStyleSheet API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet

    this.sheet = style.sheet; // We'll store references to all the CSSStyleDeclaration objects that we change here, keyed by the CSS selector they belong to
    // CSSStyleDeclaration API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

    this.map = {};
  }

  _createClass(Stylesheet, [{
    key: "setRule",

    /**
      * @desc Set a specific rule for a given selector
      * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
      * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
      * @param {String} value    - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
    */
    value: function setRule(selector, property, value) {
      var sheet = this.sheet,
          map = this.map,
          rules = this.rules; // Convert property from camelCase to snake-case

      property = property.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase();
      });

      if (!map.hasOwnProperty(selector)) {
        // If the selector hasn't been used yet we want to insert the rule at the end of the CSSRuleList, so we use its length as the index value
        var index = rules.length; // Prepare the rule declaration text, since both insertRule and addRule take this format

        var declaration = "".concat(property, ": ").concat(value); // Insert the new rule into the stylesheet

        try {
          // Some browsers only support insertRule, others only support addRule, so we have to use both
          sheet.insertRule("".concat(selector, " {").concat(declaration, ";}"), index);
        } catch (e) {
          sheet.addRule(selector, declaration, index);
        } finally {
          // Add our newly inserted rule's CSSStyleDeclaration object to the internal map
          map[selector] = this.rules[index].style;
        }
      } else {
        map[selector].setProperty(property, value);
      }
    }
    /**
      * @desc Get the stylesheet text
      * @return {String} css text
    */

  }, {
    key: "rules",
    get: function get() {
      // Get a reference to the sheet's CSSRuleList object
      // CSSRuleList API: https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
      return this.sheet.rules || this.sheet.cssRules;
    }
  }, {
    key: "enabled",
    get: function get() {
      return !this.sheet.disabled;
    },
    set: function set(value) {
      this.sheet.disabled = !value;
    }
  }, {
    key: "cssText",
    get: function get() {
      var map = this.map;
      return Object.keys(map).map(function (selector) {
        var selectorText = selector.replace(/,\W/g, ',\n');
        var ruleText = map[selector].cssText.replace(/;\W/g, ';\n\t');
        return "".concat(selectorText, " {\n\t").concat(ruleText, "\n}");
      }).join('\n');
    }
    /**
      * @desc Get an object representing the current css styles
      * @return {Object} css object
    */

  }, {
    key: "css",
    get: function get() {
      var map = this.map;
      return Object.keys(map).reduce(function (result, selector) {
        var ruleSet = map[selector];
        result[selector] = {};

        for (var i = 0; i < ruleSet.length; i++) {
          var property = ruleSet[i];
          result[selector][property] = ruleSet.getPropertyValue(property);
        }

        return result;
      }, {});
    }
  }]);

  return Stylesheet;
}();



/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! exports provided: throttle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
var throttle = function throttle(callback, delay) {
  var timer = null;

  var fn = function fn() {
    callback();
    timer = null;
  };

  return function () {
    if (!timer) timer = setTimeout(fn, delay);
  };
};

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=iro-dynamic-css.js.map