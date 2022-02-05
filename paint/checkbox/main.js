if ("paintWorklet" in CSS) {
  CSS.registerProperty({
    name: "--checkbox-color",
    syntax: "<color>",
    inherits: false,
    initialValue: "lightgrey",
  });

  CSS.registerProperty({
    name: "--check-color",
    syntax: "<color>",
    inherits: false,
    initialValue: "lightgrey",
  });

  CSS.paintWorklet.addModule("./checkbox.js");
} else {
  console.log("No CSS Houdini Support");
}
