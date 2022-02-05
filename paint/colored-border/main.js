if ("paintWorklet" in CSS) {
  CSS.registerProperty({
    name: "--stroke-width",
    syntax: "<number>",
    inherits: false,
    initialValue: 1,
  });

  CSS.paintWorklet.addModule("./color-border.js");
} else {
  console.log("No CSS Houdini Support");
}
