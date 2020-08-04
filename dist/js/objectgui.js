/*!
 * Author : Matteo Bruni - https://www.matteobruni.it
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://editor.matteobruni.it/
 * GitHub : https://www.github.com/matteobruni/objectgui
 * How to use? : Check the GitHub README
 * v1.0.0-alpha.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Editor", function() { return /* reexport */ Editor_Editor; });

// CONCATENATED MODULE: ./dist/js/Editors/EditorItem.js
class EditorItem {
  constructor(data) {
    this.data = data;
    this.element = this.createElement();
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorButton.js

class EditorButton_EditorButton extends EditorItem {
  constructor(data, name, label, click) {
    super(data);
    this.name = name;
    this.label = label;
    this.element.id = `button_${name}`;
    this.element.innerText = label;
    this.element.addEventListener("click", () => click());
  }

  createElement() {
    return document.createElement("button");
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorStringInput.js

class EditorStringInput_EditorStringInput extends EditorItem {
  constructor(data, name, label, value, change) {
    super(data);
    this.name = name;
    this.label = label;
    this.value = value;
    this.change = change;
    const input = this.element;
    input.id = `input_${this.name}`;
    input.value = this.value;
    input.addEventListener("change", () => {
      this.value = this.element.value;
      this.change(this.value);
    });
  }

  createElement() {
    const element = document.createElement("input");
    element.setAttribute("type", "text");
    return element;
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorNumberInput.js

class EditorNumberInput_EditorNumberInput extends EditorItem {
  constructor(data, name, label, value, change) {
    super(data);
    this.name = name;
    this.label = label;
    this.value = value;
    this.change = change;
    const input = this.element;
    input.id = `input_${this.name}`;
    input.value = value === null || value === void 0 ? void 0 : value.toString();
    input.addEventListener("change", () => {
      this.value = parseFloat(this.element.value);
      this.change(this.value);
    });
  }

  createElement() {
    const element = document.createElement("input");
    element.setAttribute("type", "number");
    return element;
  }

  step(step) {
    this.element.step = step.toString(10);
    return this;
  }

  min(min) {
    this.element.min = min.toString(10);
    return this;
  }

  max(max) {
    this.element.max = max.toString(10);
    return this;
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorCheckboxInput.js

class EditorCheckboxInput_EditorCheckboxInput extends EditorItem {
  constructor(data, name, label, value, change) {
    super(data);
    this.name = name;
    this.label = label;
    this.value = value;
    this.change = change;
    const input = this.element;
    input.id = `input_${this.name}`;
    input.checked = this.value;
    input.addEventListener("change", () => {
      this.value = this.element.checked;
      this.change(this.value);
    });
  }

  createElement() {
    const element = document.createElement("input");
    element.setAttribute("type", "checkbox");
    return element;
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorSelectInput.js

class EditorSelectInput_EditorSelectInput extends EditorItem {
  constructor(data, name, label, value, change) {
    super(data);
    this.name = name;
    this.label = label;
    this.value = value;
    this.change = change;
    const select = this.element;
    select.id = `input_${this.name}`;
    select.addEventListener("change", () => {
      this.value = this.element.value;
      this.change(this.value);
    });
  }

  createElement() {
    return document.createElement("select");
  }

  addItem(value, text, group) {
    const select = this.element;
    const item = document.createElement("option");
    const groupElement = select.querySelector(`[label=${group}]`);
    item.value = value;
    item.text = text !== null && text !== void 0 ? text : value;
    item.selected = this.value === value;
    (groupElement !== null && groupElement !== void 0 ? groupElement : select).append(item);
  }

  addItemGroup(name) {
    const select = this.element;
    const group = document.createElement("optgroup");
    group.label = name;
    select.append(group);
  }

}
// CONCATENATED MODULE: ./dist/js/Utils/ColorUtils.js
class ColorUtils {
  static stringToRgb(input) {
    return ColorUtils.stringToRgba(input);
  }

  static hslaToRgba(hsla) {
    const rgbResult = ColorUtils.hslToRgb(hsla);
    return {
      a: hsla.a,
      b: rgbResult.b,
      g: rgbResult.g,
      r: rgbResult.r
    };
  }

  static hslToRgb(hsl) {
    const result = {
      b: 0,
      g: 0,
      r: 0
    };
    const hslPercent = {
      h: hsl.h / 360,
      l: hsl.l / 100,
      s: hsl.s / 100
    };

    if (hslPercent.s === 0) {
      result.b = hslPercent.l;
      result.g = hslPercent.l;
      result.r = hslPercent.l;
    } else {
      const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
      const p = 2 * hslPercent.l - q;
      result.r = ColorUtils.hue2rgb(p, q, hslPercent.h + 1 / 3);
      result.g = ColorUtils.hue2rgb(p, q, hslPercent.h);
      result.b = ColorUtils.hue2rgb(p, q, hslPercent.h - 1 / 3);
    }

    result.r = Math.floor(result.r * 255);
    result.g = Math.floor(result.g * 255);
    result.b = Math.floor(result.b * 255);
    return result;
  }

  static stringToRgba(input) {
    if (input.startsWith("rgb")) {
      const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
      const result = regex.exec(input);
      return result ? {
        a: result.length > 4 ? parseFloat(result[5]) : 1,
        b: parseInt(result[3], 10),
        g: parseInt(result[2], 10),
        r: parseInt(result[1], 10)
      } : undefined;
    } else if (input.startsWith("hsl")) {
      const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
      const result = regex.exec(input);
      return result ? ColorUtils.hslaToRgba({
        a: result.length > 4 ? parseFloat(result[5]) : 1,
        h: parseInt(result[1], 10),
        l: parseInt(result[3], 10),
        s: parseInt(result[2], 10)
      }) : undefined;
    } else {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
      const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
        return r + r + g + g + b + b + (a !== undefined ? a + a : "");
      });
      const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
      const result = regex.exec(hexFixed);
      return result ? {
        a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16)
      } : undefined;
    }
  }

  static hue2rgb(p, q, t) {
    let tCalc = t;

    if (tCalc < 0) {
      tCalc += 1;
    }

    if (tCalc > 1) {
      tCalc -= 1;
    }

    if (tCalc < 1 / 6) {
      return p + (q - p) * 6 * tCalc;
    }

    if (tCalc < 1 / 2) {
      return q;
    }

    if (tCalc < 2 / 3) {
      return p + (q - p) * (2 / 3 - tCalc) * 6;
    }

    return p;
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorColorInput.js


class EditorColorInput_EditorColorInput extends EditorItem {
  constructor(data, name, label, value, change) {
    super(data);
    this.name = name;
    this.label = label;
    this.value = value;
    this.change = change;
    const input = this.element;
    input.id = `input_${this.name}`;
    input.value = this.value;
    this.updateStyle(input.value);
    input.addEventListener("change", () => {
      this.value = this.element.value;
      this.change(this.value);
      this.updateStyle(this.value);
    });
  }

  createElement() {
    const element = document.createElement("input");
    element.setAttribute("type", "text");
    return element;
  }

  updateStyle(bgColor) {
    this.element.style.backgroundColor = bgColor;
    const textColor = this.textColor(bgColor);

    if (textColor !== undefined) {
      this.element.style.color = textColor;
    }
  }

  textColor(value) {
    if (value === undefined) {
      return undefined;
    }

    const rgb = ColorUtils.stringToRgb(value);

    if (!rgb) {
      return undefined;
    }

    const color = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
    return color > 125 ? "#000" : "#fff";
  }

}
// CONCATENATED MODULE: ./dist/js/Editors/EditorContainer.js







class EditorContainer_EditorContainer extends EditorItem {
  constructor(data, name, title, collapsed, parent) {
    super(data);
    this.name = name;
    this.title = title;
    this.collapsed = collapsed;
    this.children = [];
    this.element.id = name;
    this.element.classList.add("editor", "container");
    const divTitle = document.createElement("div");
    divTitle.classList.add("title");
    const divName = document.createElement("div");
    divName.classList.add("name");
    const b = document.createElement("b");
    b.textContent = title;
    divName.append(b);
    divTitle.append(divName);
    const divCollapse = document.createElement("div");
    divCollapse.classList.add("collapse");
    this.collapseButton = document.createElement("button");
    this.collapseButton.type = "button";
    this.collapseButton.addEventListener("click", () => {
      this.toggleCollapse();
    });
    divCollapse.append(this.collapseButton);
    divTitle.append(divCollapse);
    this.element.append(divTitle);
    this.childrenContainer = document.createElement("div");
    this.childrenContainer.classList.add("container-content");
    this.element.append(this.childrenContainer);
    parent.append(this.element);
    this.setCollapse();
  }

  createElement() {
    return document.createElement("div");
  }

  addContainer(name, title, collapsed = true) {
    return new EditorContainer_EditorContainer(this.data, `${this.name}_${name}`, title, collapsed, this.childrenContainer);
  }

  addProperty(name, label, value, type, change) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("element");
    const htmlLabel = document.createElement("label");
    htmlLabel.textContent = label;
    divContainer.append(htmlLabel);
    let item;
    const inputName = `${this.name}_${name}`;

    switch (type) {
      case "number":
        item = new EditorNumberInput_EditorNumberInput(this.data, inputName, label, value, change);
        break;

      case "boolean":
        item = new EditorCheckboxInput_EditorCheckboxInput(this.data, inputName, label, value, change);
        break;

      case "color":
        item = new EditorColorInput_EditorColorInput(this.data, inputName, label, value, change);
        break;

      case "select":
        item = new EditorSelectInput_EditorSelectInput(this.data, inputName, label, value, change);
        break;

      default:
        item = new EditorStringInput_EditorStringInput(this.data, inputName, label, value, change);
    }

    if (value === undefined) {
      item.element.value = "";
    }

    divContainer.append(item.element);
    this.childrenContainer.append(divContainer);
    return item;
  }

  addButton(name, label, click) {
    const button = new EditorButton_EditorButton(this.data, `${this.name}_${name}`, label, click);
    this.childrenContainer.append(button.element);
  }

  setCollapse() {
    if (this.collapsed) {
      this.childrenContainer.style.display = "none";
    } else {
      this.childrenContainer.style.display = "block";
    }

    if (this.collapsed) {
      this.collapseButton.textContent = "Expand";
    } else {
      this.collapseButton.textContent = "Collapse";
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.setCollapse();
  }

}
// CONCATENATED MODULE: ./dist/js/Editor.js

class Editor_Editor {
  constructor(id, name, data) {
    this.container = new EditorContainer_EditorContainer(data, `${id}_editor`, `${name} Editor`, false, document.body);
    this.container.element.classList.add("editor-root");
    this.customize();
  }

  top() {
    this.container.element.classList.add("top");
    return this;
  }

  bottom() {
    this.container.element.classList.add("bottom");
    return this;
  }

  left() {
    this.container.element.classList.add("left");
    return this;
  }

  right() {
    this.container.element.classList.add("right");
    return this;
  }

  theme(theme) {
    this.container.element.classList.add(`editor-${theme}`);
  }

  customize() {}

}
// CONCATENATED MODULE: ./dist/js/index.js


/***/ })
/******/ ]);
});