export function deepAssign(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, {
            [key]: source[key]
          });
        else
          output[key] = deepAssign(target[key], source[key]);
      } else {
        Object.assign(output, {
          [key]: source[key]
        });
      }
    });
  }
  return output;
}

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}


export const getId = ((prefix = '_', suffix = '_') =>
  prefix + parseInt(Math.random() * 10E10) + Date.now() + suffix
);
