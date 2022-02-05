const DEG2RAD = Math.PI / 180;
class CustomBg {
  static get inputProperties() {
    return ["--angle", "--loader-length"];
  }
  paint(ctx, size, props) {
    const length = 180;
    const angle = parseInt(props.get("--angle")) || 0;
    const loaderLength = parseInt(props.get("--loader-length")) || 0;
    const { width, height } = size;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#d2d2d2";
    ctx.stroke();

    ctx.beginPath();
    const start = angle * DEG2RAD + length * loaderLength * DEG2RAD * 0.01;
    const end = 180 * DEG2RAD + angle * DEG2RAD;
    ctx.arc(width / 2, height / 2, 50, start.toFixed(2), end);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

registerPaint("custom-bg", CustomBg);
