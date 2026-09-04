# Pass Predictor — Neural Network Prototype

A single trainable neuron predicts a student's chance of passing based on
previous marks and attendance. Built with plain JavaScript and HTML Canvas
— no libraries, no frameworks — to demonstrate the core math behind neural
networks: forward pass, mean squared error loss, and gradient descent.

## How to run it

Open `index.html` in any browser. No build step, no server required.
(Tip: VS Code's "Live Server" extension gives auto-reload while editing.)

## File structure

```
pass-predictor-nn/
├── index.html              Page layout + loads all scripts in order
├── person1-math/
│   └── math-core.js         Dataset, sigmoid, normalize, forward()
├── person2-training/
│   └── train.js              Loss calculation, train()
├── person3-diagram/
│   └── diagram.js             drawNetwork() canvas visualization
├── person4-ui/
│   └── ui.js                   Sliders, button, loss chart, wiring
└── README.md
```

## Team task split

### Person 1 — Data & Forward Pass (`person1-math/math-core.js`)
- Define the input dataset as an array of `{ marks, attendance, passed }` objects
- Write `sigmoid(x)`
- Write `normalize(marks, attendance)`
- Write `forward(marksNorm, attendanceNorm, weights, bias)`

### Person 2 — Training & Optimization (`person2-training/train.js`)
- Write `calculateLoss(dataset, weights, bias)` — Mean Squared Error
- Write `train(dataset, epochs, learningRate)` using gradient descent
- Return `{ weights, bias, lossHistory }` so the UI can plot progress

### Person 3 — Network Visualization (`person3-diagram/diagram.js`)
- Write `drawNetwork(ctx, weights, bias, inputs)`
- Line thickness = absolute weight value, line color = sign (green/red)
- Redraw on every slider move and after training

### Person 4 — UI, Layout & Integration (`person4-ui/ui.js`, `index.html`)
- Build sliders, canvas containers, and the Train button
- Wire slider `input` events to live-update the prediction
- Wire the Train button to call `train()` and redraw everything
- Draw the loss chart on canvas

## Shared contract

Everyone writes their own implementation, but all functions must match
these exact names and return shapes — this is what lets the four files
work together without conflicts.

```js
sigmoid(x) -> number (0 to 1)
normalize(marks, attendance) -> [marksNorm, attendanceNorm]
forward(marksNorm, attendanceNorm, weights, bias) -> probability (0 to 1)
train(dataset, epochs, learningRate) -> { weights, bias, lossHistory }
drawNetwork(ctx, weights, bias, inputs) -> probability (also draws to canvas)

// format used everywhere:
weights = [w_marks, w_attendance]
bias = single number
```

## Git workflow

1. Clone the repo: `git clone [REPO URL]`
2. Work only inside your assigned folder (see table above) — this keeps
   pushes conflict-free since no two people edit the same file
3. When your function works, push it:
   ```
   git add .
   git commit -m "describe what you built"
   git push
   ```
4. If `git push` fails saying the remote has changes you don't have, run
   `git pull` first, then `git push` again
5. Ping the group once you've pushed so everyone knows your part is ready

## Script load order (in `index.html`)

```html
<script src="person1-math/math-core.js"></script>
<script src="person2-training/train.js"></script>
<script src="person3-diagram/diagram.js"></script>
<script src="person4-ui/ui.js"></script>
```

This order is required: later files call functions defined in earlier
ones (e.g. `train.js` calls `forward()` from `math-core.js`), so
`math-core.js` must load first.