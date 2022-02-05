window.CSS.registerProperty({
  name: "--my-color",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee",
});

window.CSS.registerProperty({
  name: "--loader-length",
  syntax: "<number>",
  inherits: false,
  initialValue: "0",
});

window.CSS.registerProperty({
  name: "--angle",
  syntax: "<number>",
  inherits: false,
  initialValue: "0",
});

CSS.paintWorklet.addModule("loader.js");
