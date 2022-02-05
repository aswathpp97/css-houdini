if ("layoutWorklet" in CSS) {
  await CSS.layoutWorklet.addModule("custom-layout.js");

  console.log("layout script installed!");
}
