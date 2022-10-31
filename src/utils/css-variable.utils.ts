const get = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name);

const set = (name: string, value: string) => {
  document.documentElement.style.setProperty(`--${name}`, value);
};

const utils = { get, set };

export default utils;
