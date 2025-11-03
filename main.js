// main.js - simple canvas-drawing helper for each shape page
function initShapeCanvas(shapeType){
  const canvas = document.getElementById('shapeCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.save();
  ctx.translate(80, canvas.height/2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';

  // helper: draw polygon from array of points [{x,y},...]
  function drawPoly(pts, fill=true){
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    if(fill){ ctx.fillStyle = 'rgba(79,70,229,0.06)'; ctx.fill(); }
    ctx.stroke();
    // vertices
    ctx.fillStyle = '#ffffff';
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); });
  }

  function label(text, x, y){
    ctx.fillStyle = 'rgba(2,6,23,0.85)';
    ctx.font = '13px sans-serif';
    ctx.fillText(text, x, y);
  }

  if(shapeType === 'square'){
    const s = 140;
    const pts = [{x:0,y:-s/2},{x:s,y:-s/2},{x:s,y:s/2},{x:0,y:s/2}];
    drawPoly(pts);
    // diagonals
    ctx.setLineDash([6,6]);
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[2].x,pts[2].y);
    ctx.moveTo(pts[1].x,pts[1].y); ctx.lineTo(pts[3].x,pts[3].y); ctx.stroke();
    ctx.setLineDash([]);
    label('side = ' + s + ' px', 10, canvas.height - 14);
  }

  else if(shapeType === 'rectangle'){
    const w = 200, h = 110;
    const pts = [{x:0,y:-h/2},{x:w,y:-h/2},{x:w,y:h/2},{x:0,y:h/2}];
    drawPoly(pts);
    // diagonals
    ctx.setLineDash([6,6]);
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[2].x,pts[2].y);
    ctx.moveTo(pts[1].x,pts[1].y); ctx.lineTo(pts[3].x,pts[3].y); ctx.stroke();
    ctx.setLineDash([]);
    label('w = ' + w + ' px, h = ' + h + ' px', 10, canvas.height - 14);
  }

  else if(shapeType === 'rhombus'){
    const side = 140;
    const angleDeg = 60;
    const angle = angleDeg * Math.PI/180;
    const x = Math.cos(angle/2)*side;
    const y = Math.sin(angle/2)*side;
    const pts = [{x:0,y:-y},{x:x,y:0},{x:0,y:y},{x:-x,y:0}];
    drawPoly(pts);
    // diagonals
    ctx.setLineDash([6,6]);
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[2].x,pts[2].y);
    ctx.moveTo(pts[1].x,pts[1].y); ctx.lineTo(pts[3].x,pts[3].y); ctx.stroke();
    ctx.setLineDash([]);
    label('side ≈ ' + side + ' px, angle ≈ ' + angleDeg + '°', 10, canvas.height - 14);
  }

  else if(shapeType === 'parallelogram'){
    const base = 180, height = 100, slant = 40;
    const pts = [{x:0,y:-height/2},{x:base,y:-height/2},{x:base+slant,y:height/2},{x:slant,y:height/2}];
    drawPoly(pts);
    // diagonals
    ctx.setLineDash([6,6]);
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[2].x,pts[2].y);
    ctx.moveTo(pts[1].x,pts[1].y); ctx.lineTo(pts[3].x,pts[3].y); ctx.stroke();
    ctx.setLineDash([]);
    label('base = ' + base + ' px, height = ' + height + ' px', 10, canvas.height - 14);
  }

  else if(shapeType === 'trapezium'){
    const a = 230, b = 120, h = 100;
    const pts = [{x:0,y:-h/2},{x:a,y:-h/2},{x:b,y:h/2},{x:40,y:h/2}];
    drawPoly(pts);
    // diagonals
    ctx.setLineDash([6,6]);
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[2].x,pts[2].y);
    ctx.moveTo(pts[1].x,pts[1].y); ctx.lineTo(pts[3].x,pts[3].y); ctx.stroke();
    ctx.setLineDash([]);
    label('bases ≈ ' + a + ' px & ' + b + ' px', 10, canvas.height - 14);
  }

  else if(shapeType === 'kite'){
    const d1 = 160, d2 = 90;
    const pts = [{x:0,y:-d1/2},{x:d2/2,y:0},{x:0,y:d1/2},{x:-d2/2,y:0}];
    drawPoly(pts);
    // diagonals
    ctx.setLineDash([6,6]);
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[2].x,pts[2].y);
    ctx.moveTo(pts[1].x,pts[1].y); ctx.lineTo(pts[3].x,pts[3].y); ctx.stroke();
    ctx.setLineDash([]);
    label('diagonals ≈ ' + d1 + ' px & ' + d2 + ' px', 10, canvas.height - 14);
  }

  ctx.restore();
}

// expose for pages to call
if(typeof window !== 'undefined') window.initShapeCanvas = initShapeCanvas;
