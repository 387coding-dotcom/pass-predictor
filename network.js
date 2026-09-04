function sigmoid(z){
    return 1/(1+ Math.exp(-z));
}

let w1 = 0.5; //importance of  hours studied
let w2 = -0.3;// importance of hours slept
let b = 0.1;

function forward(study,sleep){
    let z = w1*study+ w2*sleep + b;
    let output = sigmoid(z);
    return output;
}