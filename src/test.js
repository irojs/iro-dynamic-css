import iro from '@jaames/iro';
import iroDynamicCss from './index';

iro.use(iroDynamicCss);

var colorPicker = new iro.ColorPicker(document.body, {
  color: '#f00',
  css: {
    'body': {
      'background': '$color'
    },
  }
});

window.colorPicker = colorPicker;
window.iro = iro;
export default iro;