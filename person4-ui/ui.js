// PERSON 4: UI, Layout & Integration
//
// What this person had to do:
// 1. Build the HTML/CSS layout — sliders for study hours and sleep
//    hours, a "Train Network" button, a canvas for the network
//    diagram, and a canvas for the loss chart, all laid out side by side.
// 2. Wire up the sliders — on every slider move, read the values,
//    run them through normalize() + forward(), and update the live
//    prediction percentage on screen.
// 3. Wire up the "Train Network" button — call train() with the
//    dataset, store the resulting weights/bias, then refresh the
//    diagram and prediction.
// 4. Draw the loss chart — after training finishes, plot the
//    lossHistory on a canvas so you can see the error dropping over
//    each epoch.
//
// Depends on: forward(), normalize() from person1-math/math-core.js
//             train() from person2-training/train.js
//             drawNetwork() from person3-diagram/diagram.js

// Grab references to HTML elements
const studySlider = document.getElementById('studySlider');
const sleepSlider = document.getElementById('sleepSlider');
const trainBtn = document.getElementById('trainBtn');
const statusEl = document.getElementById('status');
const predPctEl = document.getElementById('predPct');
const networkCanvas = document.getElementById('network');
const lossCanvas = document.getElementById('lossChart');
const networkCtx = networkCanvas.getContext('2d');

// Model state — starts untrained at zero, gets replaced by train()'s result
let weights = [0, 0, 0];
let bias = 0;

function updatePrediction() {
  const study = Number(studySlider.value);
  const sleep = Number(sleepSlider.value);

  // normalize() takes two separate numbers and returns [studyNorm, sleepNorm, diffNorm]
  const [studyNorm, sleepNorm, diffNorm] = normalize(study, sleep);

  // forward() needs studyNorm, sleepNorm, diffNorm, weights, bias — all five
  const prediction = forward(studyNorm, sleepNorm, diffNorm, weights, bias);

  predPctEl.textContent = Math.round(prediction * 100) + '%';
  if (prediction > 0.7) {
    predPctEl.style.color = '#2e7d32';
  } else if (prediction > 0.4) {
    predPctEl.style.color = '#f9a825';
  } else {
    predPctEl.style.color = '#c62828';
  }

  // drawNetwork() needs a 2D context, weights, bias, and raw [study, sleep]
  drawNetwork(networkCtx, weights, bias, [study, sleep]);
}

studySlider.addEventListener('input', updatePrediction);
sleepSlider.addEventListener('input', updatePrediction);

trainBtn.addEventListener('click', function () {
  statusEl.textContent = 'Training...';
  trainBtn.disabled = true;

  // Remember where we started so we can animate from here to the trained result
  const startWeights = [...weights];
  const startBias = bias;

  // train() needs the dataset (global from math-core.js), epochs, and a learning rate
  // (higher epochs/learning rate here since we now have 3 weights to fit)
  const result = train(dataset, 3000, 0.5);

  animateTraining(startWeights, startBias, result.weights, result.bias, result.lossHistory);
});

// Animates from the pre-training weights/bias to the final trained ones,
// drawing the loss chart progressively at the same time, so training
// visibly "happens" instead of the UI snapping straight to the end state.
function animateTraining(startWeights, startBias, endWeights, endBias, lossHistory) {
  const totalFrames = 60; // ~1 second at 60fps
  let frame = 0;

  function step() {
    frame++;
    const t = frame / totalFrames; // 0 -> 1 progress

    // Interpolate weights/bias toward their final trained values
    weights = [
      startWeights[0] + (endWeights[0] - startWeights[0]) * t,
      startWeights[1] + (endWeights[1] - startWeights[1]) * t,
    ];
    bias = startBias + (endBias - startBias) * t;

    updatePrediction();
    drawLossChart(lossHistory, t);

    if (frame < totalFrames) {
      requestAnimationFrame(step);
    } else {
      // Snap to exact final values to avoid any floating point drift
      weights = endWeights;
      bias = endBias;
      updatePrediction();
      drawLossChart(lossHistory, 1);

      statusEl.textContent = 'Trained';
      trainBtn.disabled = false;
    }
  }

  requestAnimationFrame(step);
}

// progress: 0-1, how much of the lossHistory to reveal so far
function drawLossChart(lossHistory, progress = 1) {
  const ctx = lossCanvas.getContext('2d');
  ctx.clearRect(0, 0, lossCanvas.width, lossCanvas.height);

  if (!lossHistory || lossHistory.length === 0) return;

  const maxLoss = Math.max(...lossHistory);
  const w = lossCanvas.width;
  const h = lossCanvas.height;

  const pointsToShow = Math.max(1, Math.round(lossHistory.length * progress));
  const visibleHistory = lossHistory.slice(0, pointsToShow);

  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  visibleHistory.forEach((loss, i) => {
    const x = (i / (lossHistory.length - 1)) * w;
    const y = h - (loss / maxLoss) * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

updatePrediction();