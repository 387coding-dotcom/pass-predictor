// PERSON 3: Network Visualization
//
// Depends on normalize() and forward() from person1-math/math-core.js,
// loaded as a plain browser global (no bundler/import-export in this
// project — see index.html script order).
//
// drawNetwork(ctx, weights, bias, inputs)
//   inputs -> [marks, attendance], raw 0-100 values (normalized internally)
// Draws the diagram onto ctx and returns the predicted probability (0-1).

function drawNetwork(ctx, weights, bias, inputs) {
  const [marksNorm, attendanceNorm] = normalize(inputs[0], inputs[1]);
  const probability = forward(marksNorm, attendanceNorm, weights, bias);

  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);

  const inputLabels = ['Marks', 'Attendance'];
  const inputX = 80;
  const inputYPositions = [height / 3, (2 * height) / 3];
  const outputX = width - 100;
  const outputY = height / 2;
  const nodeRadius = 30;

  // Draw connecting lines first, so nodes render on top
  inputYPositions.forEach((inputY, i) => {
    const weight = weights[i];
    const thickness = Math.min(Math.abs(weight) * 4, 10) + 1;
    const color = weight >= 0 ? '#2ecc71' : '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(inputX, inputY);
    ctx.lineTo(outputX, outputY);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.stroke();
  });

  // Draw input nodes
  inputYPositions.forEach((inputY, i) => {
    ctx.beginPath();
    ctx.arc(inputX, inputY, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(inputLabels[i], inputX, inputY - nodeRadius - 10);
    ctx.fillText(inputs[i].toFixed(1), inputX, inputY + 5);
  });

  // Draw output node
  ctx.beginPath();
  ctx.arc(outputX, outputY, nodeRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#f39c12';
  ctx.fill();
  ctx.strokeStyle = '#2c3e50';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#000';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Output', outputX, outputY - nodeRadius - 10);
  ctx.fillText((probability * 100).toFixed(1) + '%', outputX, outputY + 5);

  return probability;
}