if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule("./angled-corners.js");
} else {
  console.log("No CSS Houdini Support");
}
