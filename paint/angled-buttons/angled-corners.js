if (typeof registerPaint !== "undefined") {
  registerPaint(
    "angled-corners",
    class {
      static get inputProperties() {
        return ["--corner-radius", "--stroke-weight", "--paint-color"];
      }

      paint(ctx, size, properties) {
        let radii = properties
          .get("--corner-radius")
          .toString()
          .replace(/px/g, "")
          .split(" ")
          .slice(1);

        const radius1 = radii[0];
        const radius2 = radii[1];
        const radius3 = radii[2];
        const radius4 = radii[3];

        const points = [
          { x: 0, y: radius1 }, //x0,y0
          { x: radius1, y: 0 }, //x1,y1
          { x: size.width - radius2, y: 0 }, //x2,y2
          { x: size.width, y: radius2 }, //x3,y3
          { x: size.width, y: size.height - radius3 }, //x4,y4
          { x: size.width - radius3, y: size.height }, //x5,y5
          { x: radius4, y: size.height }, //x6,y6
          { x: 0, y: size.height - radius4 }, //x7,y7
        ];

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y); //x0,y0
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.lineTo(points[4].x, points[4].y);
        ctx.lineTo(points[5].x, points[5].y);
        ctx.lineTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
        ctx.closePath();

        ctx.fillStyle = properties.get("--paint-color");
        ctx.fill();
      }
    }
  );
}
