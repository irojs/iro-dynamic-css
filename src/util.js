export const throttle = function(callback, delay) {
  let timer = null;
  
  const fn = () => {
    callback();
    timer = null;
  }
  
  return function() {
    if (!timer) timer = setTimeout(fn, delay);
  }
}