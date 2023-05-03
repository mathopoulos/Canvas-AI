//Import 
import { FormClass } from './forms.mjs';
import { InputClass, isOverInput } from './input.mjs';
import {selectorMode, checkclickedNavOption} from './navigation.mjs'

import { rerenderObjects, clearCanvas } from './render.mjs';


//*******************************************************************************************
// Event Handlers

// draws a new form if click on canvas and drawing thing is form
//formB.addEventListener("click", function() {
  //if (drawingThing == "form") {
    //form = FormClass.createForm(320, 220, 300, 100, "#832BDB", "no", "no", 10, {} /*inputs*/ , {} /*texts*/);
  //  form.draw();
  //}
//});

window.onload = function() {
  form = FormClass.createForm(320, 220, 300, 100, "#832BDB", "no", "no", 10, {} /*inputs*/ , {} /*texts*/);
    form.draw();
};

// draws a new input if click on canvas and drawing thing is input
canvas.addEventListener("click", function() {
  if (drawingThing == "input" & !isDragging) {
    input = InputClass.createInput(xMouse, yMouse, 250, 50, "text", "grey", false, false, 5);
    input.draw();
    selectedInput = input; 
    selectorMode();
    checkclickedNavOption();
    drawingThing=null;
    
  }
});

// selects a input if mousedown over an input
canvas.addEventListener("mousedown", function() {
  isOverInput(xCurrentMouse, yCurrentMouse);
});


// drags the input to new position if selected and mouse is down
let prevX = 0;
let prevY = 0;
canvas.addEventListener("mousemove", function (){
  if (selectedInput != null && mouseDown && selectedText == null) {
    selectedInput.isSelected = true;
    if (prevX == 0 && prevY == 0) {
      prevX = xCurrentMouse;
      prevY = yCurrentMouse;
      clearCanvas();
      rerenderObjects();
    } else {
      //calculate difference between starting position and mouse position and update position

      let diffX = xCurrentMouse - prevX;
      let diffY = yCurrentMouse - prevY;
      selectedInput.x += diffX;
      selectedInput.y += diffY;
      prevX = xCurrentMouse;
      prevY = yCurrentMouse;

      
      // re-render the canvas to reflect the new position of the input
      clearCanvas();
      rerenderObjects();
    }    
  };
});

canvas.addEventListener("mouseup", function() {
  if (selectedInput != null) {
  selectedInput.isSelected = false;
  selectedInput.outline = false;
  selectedInput = null;
  prevX = 0;
  prevY = 0;}
});

canvas.addEventListener("mousemove", function(){
  isOverInput(xCurrentMouse, yCurrentMouse);
})


///THIS IS THE CODE I NEED TO INCLUDE IN MY NEW DETAIL ELEMENTS 
//updates the height of selectedinput when the height input changes
let heightInput = document.getElementById("height");
heightInput.addEventListener("change", function() {
  console.log(selectedInput);
  if (selectedInput != null) {
    selectedInput.height = parseInt(heightInput.value);
    clearCanvas();
    rerenderObjects();
  }
});

//updates the width of selectedinput when the width input changes
let widthInput = document.getElementById("width");
widthInput.addEventListener("change", function() {
  if (selectedInput != null) {
    selectedInput.width = parseInt(widthInput.value);
    clearCanvas();
    rerenderObjects();
  }
});


// sets default value of height and width in the toolpanel to the current value of the selected input
canvas.addEventListener("mousedown", function() {
  let heightInput = document.getElementById("height");
heightInput.value = selectedInput.height.toString();
  let widthInput = document.getElementById("width");
widthInput.value = selectedInput.width.toString();
});