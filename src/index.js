import IroStylesheet from './stylesheet.js';
import { throttle } from './util.js';

const DynamicCssPlugin = function(iro, pluginOptions) {

  const throttleDelay = pluginOptions.throttle || null;

  const updateStylesheet = function() {
    const css = this.css;
    const rgb = this.color.rgbString;
    for (let selector in css) {
      let properties = css[selector];
      for (let property in properties) {
        this.stylesheet.setRule(selector, property, rgb);
      }
    }
  }

  iro.ColorPicker.addHook('init:before', function() {
    this.css = this.props.css || {};
    this.updateStylesheet = throttleDelay ? throttle(updateStylesheet.bind(this), throttleDelay) : updateStylesheet.bind(this);
  });

  iro.ColorPicker.addHook('mount', function() {
    this.stylesheet = new IroStylesheet();
    this.updateStylesheet();
  });

  iro.ColorPicker.addHook('color:afterUpdate', function() {
    this.updateStylesheet();
  });

  iro.Stylesheet = IroStylesheet;

  iro.dynamicCss = {
    version: VERSION
  };

}

export default DynamicCssPlugin;