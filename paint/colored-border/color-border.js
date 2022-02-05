if (typeof registerPaint !== "undefined") {
  registerPaint(
    "color-border",
    class {
      static get inputProperties() {
        return ["--stroke-width"];
      }

      static get inputArguments() {
        return ["<color>", "<color>", "<color>", "<color>"];
      }

      paint(ctx, size, properties, args) {
        const points = [
          { x: 0, y: 0 },
          { x: size.width, y: 0 },
          { x: size.width, y: size.height },
          { x: 0, y: size.height },
        ];

        const strokeWidth = properties.get("--stroke-width");

        const color1 = args[0].toString();
        const color2 = args[1].toString();
        const color3 = args[2].toString();
        const color4 = args[3].toString();

        ctx.lineWidth = strokeWidth.value;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.closePath();
        ctx.strokeStyle = color1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        ctx.strokeStyle = color2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.closePath();
        ctx.strokeStyle = color3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[3].x, points[3].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.closePath();
        ctx.strokeStyle = color4;
        ctx.stroke();
      }
    }
  );
}
