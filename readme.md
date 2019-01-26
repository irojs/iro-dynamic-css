# Dynamic CSS Plugin for iro.js


## Installation

### Install with NPM

```bash
$ npm install iro-dynamic-css --save
```

If you are using a module bundler like Webpack or Rollup, import iro-dynamic-css into your project: 

```javascript
// Using ES6 module syntax
import iroDynamicCss from 'iro-dynamic-css';

// Using CommonJS modules
const iroDynamicCss = require('iro-dynamic-css');
```

### Download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro-dynamic-css/master/dist/iro-dynamic-css.js)**<br/>
Uncompressed at around 12kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro-dynamic-css/master/dist/iro-dynamic-css.min.js)**<br/>
Minified to 4kB

Then add it to the `<head>` of your page with a `<script>` tag:

```html
<html>
  <head>
    <!-- ... -->
    <script src="./path/to/iro.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

### Using the unpkg CDN

```html
<script src="https://unpkg.com/@jaames/iro-dynamic-css/dist/iro-dynamic-css.min.js"></script>
```
