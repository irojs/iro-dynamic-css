> This plugin is for [iro.js v4](https://github.com/jaames/iro.js/tree/v4), which is currently in beta. This documentation may be subject to change. For more info, join the v4 discussion thread [here](https://github.com/jaames/iro.js/issues/30) -- we're looking for feedback and help with testing!

<h1 align="center">iro-dynamic-css</h1>

<br/>

<p align="center">
  <b>An <a href="https://github.com/jaames/iro.js">iro.js</a> plugin that dynamically updates CSS styles to match the currently selected color</b>
</p>

<p align="center">
  <a href="https://github.com/jaames/iro-dynamic-css/blob/master/LICENSE.txt">
    <img src="https://badgen.net/github/license/jaames/iro-dynamic-css" alt="license" />
  </a>
  <a href="https://npmjs.org/package/iro-dynamic-css">
    <img src="https://badgen.net/npm/v/iro-dynamic-css?color" alt="version" />
  </a>
  <a href="https://npmjs.org/package/iro-dynamic-css">
    <img src="https://badgen.net/npm/dt/iro-dynamic-css?color" alt="downloads" />
  </a>
  <a href="https://bundlephobia.com/result?p=iro-dynamic-css">
    <img src="https://badgen.net/bundlephobia/minzip/iro-dynamic-css?color" alt="minzip size" />
  </a>
  <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XS9R3QTLZYAXQ&source=url">
    <img src="https://badgen.net/badge/donate/paypal/ED5151" alt="donate" />
  </a>
</p>

<p align="center">
<a href="#features">Features</a> | <a href="#installation">Installation</a> | <a href="#usage">Usage</a> | <a href="#stylesheet-api">Stylesheet API</a>
</p>

<br/>

## Features

* **Tiny**: Just 4kb minified, or less than 1kB minified + gzipped.
* **Consistent**: Works across all modern browsers, down to IE 9.
* **CSS Variables**: CSS variables are available in browsers that support them.

<br/>

## Installation

### Install with NPM

```bash
$ npm install iro-dynamic-css --save
```

If you are using a module bundler like Webpack or Rollup, import iro-dynamic-css into your project **after iro.js**: 

**Using ES6 modules**:

```js
import iro from '@jaames/iro';
import iroDynamicCss from 'iro-dynamic-css';
```

**Using CommonJS modules**:

```js
const iro = require('@jaames/iro');
const iroDynamicCss = require('iro-dynamic-css');
```

### Download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro-dynamic-css/master/dist/iro-dynamic-css.js)**<br/>
Uncompressed at around 12kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro-dynamic-css/master/dist/iro-dynamic-css.min.js)**<br/>
Minified to 4kB

Then add it to the `<head>` of your page with a `<script>` tag **after iro.js**:

```html
<html>
  <head>
    <!-- ... -->
    <script src="./path/to/iro.min.js"></script>
    <script src="./path/to/iro-dynamic-css.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

### Using the unpkg CDN

```html
<script src="https://unpkg.com/iro-dynamic-css/dist/iro-dynamic-css.min.js"></script>
```

<br/>

## Usage

### Register Plugin

After both [**iro.js**](https://github.com/jaames/iro.js) and **iro-dynamic-css** have been imported/downloaded, the plugin needs to be registered with `iro.use`:

```js
iro.use(iroDynamicCss);
```

### Global Plugin Options

Global config options can optionally be passed to the second parameter of `iro.use`. 

The only current option is `throttle`, which can be used to limit how regularly the CSS rules are updated. The value passed to `throttle` is the minimum time between CSS updates in milliseconds. You can read more about throttling [here](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-5)

Since the color picker updates the selected color very quickly, throttling stylesheet updates can be helpful to reduce lag if you are changing a lot of styles at once.

```js
iro.use(iroDynamicCss, {
  // Only allow the css to update once in 100 milliseconds
  throttle: 100
});
```

### ColorPicker Setup

The plugin adds a new `css` config option to `iro.ColorPicker`, dynamic CSS rules can be passed to this option as a CSS "template" formatted as a JavaScript object.

```js
var colorPicker = new iro.ColorPicker([
  width: 320,
  color: {r: 255, g: 100, b: 100},
  // ... etc
  css: {
    'body': {
      'background-color': '$color'
    },
    'input, button': {
      'border-color': '$color',
      'color': '$color'
    }
  }
])
```

`$color` is treated as a variable representing the currently selected color. To demonstrate, let's say the currently selected color is `rgb(255, 0, 0)`. Using the template above, the CSS applied to the page would look something like this:

```css
body {
  background-color: rgb(255, 0, 0);
}

input, button {
  border-color: rgb(255, 0, 0);
  color: rgb(255, 0, 0);
}
```

### CSS Variables

[CSS variables](https://alligator.io/css/css-variables/) can also be used, provided that the browser supports them. Variables are defined using properties that begin with a double-dash (`--`). 

```js
var colorPicker = new iro.ColorPicker([
  width: 320,
  color: {r: 255, g: 100, b: 100},
  // ... etc
  css: {
    ':root': {
      '--selected-color': '$color'
    }
  }
])
```

By adding the variables to the `:root` psuedo-class, we ensure that they are globally accessible so you can reference them anywhere in your project's CSS:

```css
.example {
  background-color: var(--selected-color);
}
```

<br/>

## Stylesheet API

Each colorPicker has its own stylesheet, accessible from its `stylesheet` property. After the plugin is registered, the stylesheet constructor is also available globally on `iro.Stylesheet()`.

### Properties

#### `enabled`

Boolean indicating whether this stylesheet's rules should be applied to the page. This is readable/writable, and defaults to `true`.

#### `css`

The current CSS rules formatted as a JavaScript object. For example:

```js
"body": {
  "background-color": "red"
},
".example": {
  "border": "1px solid red"
}
```

#### `cssText`

The current CSS rules formatted as a CSS string. For example:

```css
body {
  background-color: red;
}
.example: {
  border: 1px solid red;
}
```

#### `sheet`

A reference to the stylesheet's [`CSSStyleSheet`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) object.

#### `rules`

A reference to the stylesheet's [`CSSRuleList`](https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList) object.

### Methods

#### `setRule`

Adds or updates a CSS rule.

**Arguments**:

  * `{String}` selector
  * `{String}` property
  * `{String}` value

**Example**:

```js
var stylesheet = new Stylesheet();
// Set the background of all elements with the CSS class 'example' to red
stylesheet.setRule('.example', 'background', '#f00');
```

© [James Daniel](https://github.com/jaames)