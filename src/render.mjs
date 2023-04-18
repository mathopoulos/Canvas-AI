//Import 
import {BoxClass} from './boxes.mjs'; 

import {InputClass} from './input.mjs'; 

import {TextClass} from './text.mjs'; 


// re-render all the forms
export function rerenderForms() {
  for (let key in forms) {
    form = forms[key];
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = `${form.color}60`;
    ctx.lineWidth = 1;
    ctx.strokeRect(form.x, form.y, form.width, form.height);
    ctx.lineWidth = 1;
    

  }
}

// re-render all the inputs
export function rerenderInputs() {
  for (let key in inputs) {
    input = inputs[key];
    ctx.strokeStyle = input.color;
    ctx.lineWidth = 3;
    input.outlineInput();
    input.draw(input.x, input.y, input.width, input.height, "black", input.borderRadius);
    ctx.lineWidth = 1;

  }
}

// re-render all the inputs
export function rerenderTexts() {
  for (let key in texts) {
    var text = texts[key];
    text.draw(text.content, text.x, text.y);
    if (text.outline == true) { text.outlineText();}

  
  }
}

// re-render all the boxes and adds dashed line if they are moused over
export function rerenderBoxes() {
  for (let key in boxes) {
    box = boxes[key];
    ctx.strokeStyle = box.color;

    box.outlineBox();

    //ctx.arc(box.x, box.y, 2, 0, Math.PI * 2);

    //ctx.fill();
    
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    box.resizeMode();
  }
}

// Rerenders all objects
export function rerenderObjects() {
  rerenderBoxes();
  rerenderForms();
  rerenderInputs();
  rerenderTexts();
}

// Function that clears the canvas
export function clearCanvas() {
  ctx. fillStyle = null; 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}