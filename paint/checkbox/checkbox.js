registerPaint(
  "checkbox",
  class {
    static get inputProperties() {
      return ["--check-color"];
    }
    paint(ctx, geom, properties) {
      const checkColor = properties.get("--check-color").toString();
      this.width = geom.width;
      this.height = geom.height;

      this.tick(ctx, checkColor);
    }

    tick(ctx, color) {
      ctx.lineWidth = this.perc(10);

      ctx.beginPath();
      ctx.moveTo(this.perc(15), this.perc(50));
      ctx.lineTo(this.perc(40), this.perc(80));
      ctx.lineTo(this.perc(85), this.perc(20));
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.stroke();
    }

    perc(value) {
      return this.width * value * 0.01;
    }
  }
);
