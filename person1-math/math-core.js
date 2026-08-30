// PERSON 1: Data & Forward Pass
//
// Implement:
// 1. dataset — an array of objects: { marks: number, attendance: number, passed: 0 or 1 }
//    Add ~30-40 rows of sample data.
//
// 2. sigmoid(x) — takes any number, returns a value squashed between 0 and 1.
//
// 3. normalize(marks, attendance) — takes raw 0-100 values,
//    returns [marksNorm, attendanceNorm] scaled to 0-1.
//
// 4. forward(marksNorm, attendanceNorm, weights, bias) — returns a single
//    probability between 0 and 1 (weights is an array [w_marks, w_attendance],
//    bias is a single number).