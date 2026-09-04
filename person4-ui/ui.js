// PERSON 4: UI, Layout & Integration
//
// Implement:
// - Read slider values for marks and attendance
// - On slider input: call drawNetwork() and update the on-screen prediction
// - On "Train" button click: call train(), then update the diagram and
//   draw a loss chart from the returned lossHistory
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

function updatePrediction() {
  const marks = Number(marksSlider.value);
  const attendance = Number(attendanceSlider.value);

  const normalizedInputs = normalize([marks, attendance]);
  const prediction = forward(normalizedInputs);

  predPctEl.textContent = Math.round(prediction * 100) + '%';
  if (prediction > 0.7) {
  predPctEl.style.color = '#2e7d32';
} else if (prediction > 0.4) {
  predPctEl.style.color = '#f9a825';
} else {
  predPctEl.style.color = '#c62828';
}

  drawNetwork(networkCanvas, normalizedInputs, prediction);
}

marksSlider.addEventListener('input', updatePrediction);
attendanceSlider.addEventListener('input', updatePrediction);

trainBtn.addEventListener('click', function () {
  statusEl.textContent = 'Training...';

  const result = train();

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