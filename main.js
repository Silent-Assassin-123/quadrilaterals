// main.js - Quadrilateral Explorer (angles, diagonals, sides, heights in cm)
function initShapeCanvas(shapeType) {
  const canvas = document.getElementById("shapeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(80, canvas.height / 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffffff";

  // Utility functions
  const toCm = (px) => Math.ceil(px / 10); // round up pixels to cm

  function drawPoly(pts, fill = true) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = "rgba(79,70,229,0.06)";
      ctx.fill();
    }
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function label(text, x, y, color = "white") {
    ctx.fillStyle = color;
    ctx.font = "13px sans-serif";
    ctx.fillText(text, x, y);
  }

  function angleLabel(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(text, x + 5, y - 5);
  }

  function dashedLine(x1, y1, x2, y2, color = "white") {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  function dist(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }

  // ---- SHAPES ----

  if (shapeType === "square") {
    const s = 140;
    const pts = [
      { x: 0, y: -s / 2 },
      { x: s, y: -s / 2 },
      { x: s, y: s / 2 },
      { x: 0, y: s / 2 },
    ];
    drawPoly(pts);

    // Diagonals
    dashedLine(pts[0].x, pts[0].y, pts[2].x, pts[2].y);
    dashedLine(pts[1].x, pts[1].y, pts[3].x, pts[3].y);

    const diag = Math.sqrt(2) * s;

    // Labels
    pts.forEach((p) => angleLabel("90°", p.x, p.y));
    label(`Side = ${toCm(s)}cm`, s / 3, s / 2 + 20);
    label(`Diagonal = ${toCm(diag)}cm`, s / 2 - 20, 20);
  }

  else if (shapeType === "rectangle") {
    const w = 200, h = 110;
    const pts = [
      { x: 0, y: -h / 2 },
      { x: w, y: -h / 2 },
      { x: w, y: h / 2 },
      { x: 0, y: h / 2 },
    ];
    drawPoly(pts);

    dashedLine(pts[0].x, pts[0].y, pts[2].x, pts[2].y);
    dashedLine(pts[1].x, pts[1].y, pts[3].x, pts[3].y);

    const diag = Math.sqrt(w ** 2 + h ** 2);

    // Angles and lengths
    pts.forEach((p) => angleLabel("90°", p.x, p.y));
    label(`Width = ${toCm(w)}cm`, w / 2 - 20, h / 2 + 20);
    label(`Height = ${toCm(h)}cm`, w + 15, 0);
    label(`Diagonal = ${toCm(diag)}cm`, w / 3, -h / 2 - 15);
  }

  else if (shapeType === "rhombus") {
    const side = 140;
    const angleDeg = 60;
    const angle = (angleDeg * Math.PI) / 180;
    const x = Math.cos(angle / 2) * side;
    const y = Math.sin(angle / 2) * side;
    const pts = [
      { x: 0, y: -y },
      { x: x, y: 0 },
      { x: 0, y: y },
      { x: -x, y: 0 },
    ];
    drawPoly(pts);

    dashedLine(pts[0].x, pts[0].y, pts[2].x, pts[2].y);
    dashedLine(pts[1].x, pts[1].y, pts[3].x, pts[3].y);

    const d1 = 2 * y;
    const d2 = 2 * x;

    // Labels
    label(`Side = ${toCm(side)}cm`, x + 10, 0);
    label(`d₁ = ${toCm(d1)}cm, d₂ = ${toCm(d2)}cm`, -20, -y - 15);

    angleLabel("60°", pts[0].x, pts[0].y);
    angleLabel("120°", pts[1].x, pts[1].y);
    angleLabel("60°", pts[2].x, pts[2].y);
    angleLabel("120°", pts[3].x, pts[3].y);
  }

  else if (shapeType === "parallelogram") {
    const base = 180, height = 100, slant = 40;
    const pts = [
      { x: 0, y: -height / 2 },
      { x: base, y: -height / 2 },
      { x: base + slant, y: height / 2 },
      { x: slant, y: height / 2 },
    ];
    drawPoly(pts);

    dashedLine(pts[0].x, pts[0].y, pts[0].x, pts[3].y, "cyan"); // height
    const side = dist(pts[0], pts[3]);

    label(`Base = ${toCm(base)}cm`, base / 2 - 30, height / 2 + 20);
    label(`Side = ${toCm(side)}cm`, base + 15, height / 4);
    label(`Height = ${toCm(height)}cm`, pts[0].x - 55, 0);

    angleLabel("60°", pts[0].x, pts[0].y);
    angleLabel("120°", pts[1].x, pts[1].y);
    angleLabel("60°", pts[2].x, pts[2].y);
    angleLabel("120°", pts[3].x, pts[3].y);
  }

  else if (shapeType === "trapezium") {
    const a = 230, b = 120, h = 100;
    const pts = [
      { x: 0, y: -h / 2 },
      { x: a, y: -h / 2 },
      { x: b, y: h / 2 },
      { x: 40, y: h / 2 },
    ];
    drawPoly(pts);

    dashedLine(pts[0].x, pts[0].y, pts[0].x, pts[3].y, "cyan");

    // Side lengths
    const side1 = dist(pts[1], pts[2]);
    const side2 = dist(pts[2], pts[3]);
    const side3 = dist(pts[3], pts[0]);
    const side4 = dist(pts[0], pts[1]);

    label(`Base₁ = ${toCm(a)}cm`, a / 2 - 30, -h / 2 - 15);
    label(`Base₂ = ${toCm(b)}cm`, b / 2, h / 2 + 20);
    label(`Height = ${toCm(h)}cm`, pts[0].x - 45, 0);
    label(`Sides: ${toCm(side1)}cm, ${toCm(side2)}cm`, a + 20, 0);

    angleLabel("100°", pts[0].x, pts[0].y);
    angleLabel("80°", pts[1].x, pts[1].y);
    angleLabel("100°", pts[2].x, pts[2].y);
    angleLabel("80°", pts[3].x, pts[3].y);
  }

  else if (shapeType === "kite") {
    const d1 = 160, d2 = 90;
    const pts = [
      { x: 0, y: -d1 / 2 },
      { x: d2 / 2, y: 0 },
      { x: 0, y: d1 / 2 },
      { x: -d2 / 2, y: 0 },
    ];
    drawPoly(pts);

    dashedLine(pts[0].x, pts[0].y, pts[2].x, pts[2].y);
    dashedLine(pts[1].x, pts[1].y, pts[3].x, pts[3].y);

    const side1 = dist(pts[0], pts[1]);
    const side2 = dist(pts[1], pts[2]);

    label(`d₁ = ${toCm(d1)}cm, d₂ = ${toCm(d2)}cm`, 10, -d1 / 2 - 15);
    label(`Sides = ${toCm(side1)}cm, ${toCm(side2)}cm`, d2 / 2 + 15, 0);

    angleLabel("70°", pts[0].x, pts[0].y);
    angleLabel("110°", pts[1].x, pts[1].y);
    angleLabel("70°", pts[2].x, pts[2].y);
    angleLabel("110°", pts[3].x, pts[3].y);
  }

  ctx.restore();
}

if (typeof window !== "undefined") window.initShapeCanvas = initShapeCanvas;
