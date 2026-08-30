// PERSON 3: Network Visualization
//
// Implement:
// drawNetwork(ctx, weights, bias, inputs) — draws the neuron diagram
// onto a canvas context. Must show:
//   - input nodes (marks, attendance)
//   - an output node showing the predicted probability
//   - connecting lines whose thickness reflects |weight| and color reflects sign
// Returns the predicted probability (0-1) so the caller can display it elsewhere.
//
// Depends on: forward() and normalize() from person1-math/math-core.js