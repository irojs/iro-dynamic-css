export default class Stylesheet {
  /**
    @constructor stylesheet writer
  */
  constructor() {
    // Create a new style element
    const style = document.createElement('style');
    document.head.appendChild(style);
    // Webkit apparently requires a text node to be inserted into the style element
    // (according to https://davidwalsh.name/add-rules-stylesheets)
    style.appendChild(document.createTextNode(''));
    this.style = style;
    // Create a reference to the style element's CSSStyleSheet object
    // CSSStyleSheet API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
    this.sheet = style.sheet;
    // We'll store references to all the CSSStyleDeclaration objects that we change here, keyed by the CSS selector they belong to
    // CSSStyleDeclaration API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
    this.map = {};
  }

  get rules() {
    // Get a reference to the sheet's CSSRuleList object
    // CSSRuleList API: https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
    return this.sheet.rules || this.sheet.cssRules;
  }

  get enabled() {
    return !this.sheet.disabled;
  }

  set enabled(value) {
    this.sheet.disabled = !value;
  }

  /**
    * @desc Set a specific rule for a given selector
    * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
    * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
    * @param {String} value    - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
  */
  setRule(selector, property, value) {
    const { sheet, map, rules } = this;
    // Convert property from camelCase to snake-case
    property = property.replace(/([A-Z])/g, function($1) {
      return '-' + $1.toLowerCase();
    });

    if (!map.hasOwnProperty(selector)) {
      // If the selector hasn't been used yet we want to insert the rule at the end of the CSSRuleList, so we use its length as the index value
      const index = rules.length;
      // Prepare the rule declaration text, since both insertRule and addRule take this format
      const declaration = `${property}: ${value}`;
      // Insert the new rule into the stylesheet
      try {
        // Some browsers only support insertRule, others only support addRule, so we have to use both
        sheet.insertRule(`${selector} {${declaration};}`, index);
      } catch(e) {
        sheet.addRule(selector, declaration, index);
      } finally {
        // Add our newly inserted rule's CSSStyleDeclaration object to the internal map
        map[selector] = this.rules[index].style;
      }
    }
    else {
      map[selector].setProperty(property, value);
    }
  }

  /**
    * @desc Get the stylesheet text
    * @return {String} css text
  */
  get cssText() {
    const { map } = this;
    return Object.keys(map).map(selector => {
      const selectorText = selector.replace(/,\W/g, ',\n');
      const ruleText = map[selector].cssText.replace(/;\W/g, ';\n\t');
      return `${selectorText} {\n\t${ruleText}\n}`;
    }).join('\n');
  }

  /**
    * @desc Get an object representing the current css styles
    * @return {Object} css object
  */
  get css() {
    const { map } = this;
    return Object.keys(map).reduce((result, selector) => {
      const ruleSet = map[selector];
      result[selector] = {};
      for (var i = 0; i < ruleSet.length; i++) {
        const property = ruleSet[i];
        result[selector][property] = ruleSet.getPropertyValue(property);
      }
      return result;
    }, {});
  }
}