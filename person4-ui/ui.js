// PERSON 4: UI, Layout & Integration
//
// Depends on: forward(), normalize() from person1-math/math-core.js
//             train() from person2-training/train.js
//             drawNetwork() from person3-diagram/diagram.js

// Grab references to HTML elements
const marksSlider = document.getElementById('marksSlider');
const attendanceSlider = document.getElementById('attendanceSlider');
const trainBtn = document.getElementById('trainBtn');
const statusEl = document.getElementById('status');
const predPctEl = document.getElementById('predPct');
const networkCanvas = document.getElementById('network');
const lossCanvas = document.getElementById('lossChart');
const networkCtx = networkCanvas.getContext('2d');

// Model state — starts untrained at zero, gets replaced by train()'s result
let weights = [0, 0];
let bias = 0;

function updatePrediction() {
  const marks = Number(marksSlider.value);
  const attendance = Number(attendanceSlider.value);

  // normalize() takes two separate numbers and returns [marksNorm, attendanceNorm]
  const [marksNorm, attendanceNorm] = normalize(marks, attendance);

  // forward() needs marksNorm, attendanceNorm, weights, bias — all four
  const prediction = forward(marksNorm, attendanceNorm, weights, bias);

  predPctEl.textContent = Math.round(prediction * 100) + '%';
  if (prediction > 0.7) {
    predPctEl.style.color = '#2e7d32';
  } else if (prediction > 0.4) {
    predPctEl.style.color = '#f9a825';
  } else {
    predPctEl.style.color = '#c62828';
  }

  // drawNetwork() needs a 2D context, weights, bias, and raw [marks, attendance]
  drawNetwork(networkCtx, weights, bias, [marks, attendance]);
}

marksSlider.addEventListener('input', updatePrediction);
attendanceSlider.addEventListener('input', updatePrediction);

trainBtn.addEventListener('click', function () {
  statusEl.textContent = 'Training...';

  // train() needs the dataset (global from math-core.js), epochs, and a learning rate
  const result = train(dataset, 1000, 0.1);
  weights = result.weights;
  bias = result.bias;

  statusEl.textContent = 'Trained';

  updatePrediction();
  drawLossChart(result.lossHistory);
});

function drawLossChart(lossHistory) {
  const ctx = lossCanvas.getContext('2d');
  ctx.clearRect(0, 0, lossCanvas.width, lossCanvas.height);

  if (!lossHistory || lossHistory.length === 0) return;

  const maxLoss = Math.max(...lossHistory);
  const w = lossCanvas.width;
  const h = lossCanvas.height;

  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  lossHistory.forEach((loss, i) => {
    const x = (i / (lossHistory.length - 1)) * w;
    const y = h - (loss / maxLoss) * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

updatePrediction();