//Import 
import {deleteStoredBoxes, saveStoredBoxes, checkResize, isOverBoxParamater, BoxClass } from './boxes.mjs';

import { rerenderObjects, clearCanvas } from './render.mjs';

import {mouseClickPosition, currentMouse} from './mouse.mjs';


// Set the size of the canvas to the size of the window
canvas.width = window.innerWidth * 0.985;
canvas.height = window.innerHeight * 0.985;


//rerenders all objects
rerenderObjects();


// changes the background color of the canvas to alight grey 
ctx.fillStyle = "#F9FAFB";
ctx.fillRect(0, 0, canvas.width, canvas.height);


//*******************************************************************************************
// Event Handlers

// clears canvas when clear canvas button is clicked
clear.addEventListener("click", deleteStoredBoxes);

//track current position of mouse on canvas when mouse down
canvas.addEventListener("mousedown", mouseClickPosition);

//track current position of mouse on canvas
canvas.addEventListener("mousemove", currentMouse);

//draws box when mouse is lifted
canvas.addEventListener("mouseup", function(e) {
  xEnd = e.clientX;
  yEnd = e.clientY;

  // sets box color to the color of the selector

  // Calculate the width and height of the box  based on the starting and ending coordinates
  boxWidth = xEnd - xMouse;
  boxHeight = yEnd - yMouse;

  // Checks to see if the drawing shape is a box or not before drawing the box
  if (drawingThing == "box" & !isDragging & selectedBox == null) {
    // drawbox(xMouse, yMouse, boxWidth, boxHeight, boxColor);
    // save box to box array
    box = BoxClass.createBox(xMouse, yMouse, boxWidth, boxHeight, boxColor, true, true);
    selectedBox = box; 

    // clears the Canvas and re-renders the boxes
    clearCanvas();
    rerenderObjects();

  };

});

// Changes mouse to pointer if over a box
canvas.addEventListener("mousemove", function(e) {
  xCurrentMouse = e.clientX;
  yCurrentMouse = e.clientY;

  // Keep track of whether the mouse is over any box

  for (var key in boxes) {
    if (boxes.hasOwnProperty(key)) {
      box = boxes[key];
      if (xCurrentMouse >= box.x && xCurrentMouse <= box.x + box.width + 0 && yCurrentMouse >= box.y && yCurrentMouse <= box.y + box.height + 0) {
        // If the mouse is over this box, set its outline to true
        isOverBox = true;
        box.outline = true;
        box.outlineBox();
        break;
      } else {
        // If the mouse is not over this box, set its outline to false
        isOverBox = false;
        box.outline = false;
        box.outlineBox();

      }
    }
  }

  // If the mouse is over a box, change the cursor to a pointer; changes to resize pointer if over paramater
  //if (isOverBox ==true & isOverBoxParamaters == false) {
    //canvas.classList.remove("col-resize");
    //canvas.classList.add("pointer");
  //} if (isOverBox == false & isOverBoxParamaters == false) {
  //  canvas.classList.remove("pointer");
    //canvas.classList.remove("col-resize");
  //} if (isOverBoxParamaters) {
    //canvas.classList.add("col-resize");
  //}

  // Redraw the boxes
  clearCanvas();
  rerenderObjects();
});

// re-render the canvas on mouse movement
canvas.addEventListener("mousemove", function(e) {
  if (isDragging & !resize) {
    // Track the position of the mouse on the canvas  
    xMouse = e.clientX;
    yMouse = e.clientY;

    // Calculate the x and y distance to the current position of the box

    if(selectedBox){
    var diffX = xMouse - selectedBox.x;
    var diffY = yMouse - selectedBox.y;

    // Update the box position to current position of mouse 
    selectedBox.x = xMouse - selectedBox.width / 2;
    selectedBox.y = yMouse - selectedBox.height / 2;}

    // Clear canvas 
    clearCanvas();

    // re-render all the boxes
    rerenderObjects();
  }
});

// Sets isDragging boolean to true when mouse is clicked down over a box
canvas.addEventListener('mousedown', function(e) {
  xMouse = e.clientX;
  yMouse = e.clientY;
  // Loop through all the boxes and set selected box to the 
  // box the mouse is currently over 
  for (var key in boxes) {
    if (boxes.hasOwnProperty(key)) {
      box = boxes[key];
    // Check if mouse is inside the box 
    if (box.x < xMouse &&
      box.x + box.width + 16 > xMouse &&
      box.y < yMouse &&
      box.y + box.height + 16 > yMouse) {


      selectedBox = box;
      isDragging = true;
      break;
    } else {
      isDragging = false;
      selectedBox = null;
    }
  }}

})

// Sets isDragging boolean to false when mouse is released
canvas.addEventListener('mouseup', function(e) {
  isDragging = false;

});

// changes box color to the color of the selector
colorPicker.addEventListener("change", function(e) {
  boxColor = e.target.value;
});

// detects when save button is clicked and then triggers the saveImage function
saveButton.addEventListener("click", saveStoredBoxes);

// if click in the area where there is a box then set that box's outline to dashed
canvas.addEventListener("mousedown", function(e) {
  xMouse = e.clientX;
  yMouse = e.clientY;
  // Loop through all the boxes and set selected box to the 
  // box the mouse is currently over 
  for (var key in boxes) {
    // Check if mouse is inside the box 
    if (boxes.hasOwnProperty(key)){
      box = boxes[key];
    if (box.x < xMouse &&
      box.x + box.width > xMouse &&
      box.y < yMouse &&
      box.y + box.height + 16 > yMouse) {

      box.selected =
        true;
      selectedBox = box;
      box.resizeMode();
      isDragging = true;
      break; 
    } else {
      box.selected =
        false;
      isDragging = false;
    }
  }}
});

// sets mouseDown variable to true and checks if box is being resized
canvas.addEventListener("mousedown", function() {
  mouseDown = true;
  checkResize();
})

//resizes the box if box is currently set to be resized and a particular box is selected
canvas.addEventListener("mousemove", function(e) {
  if (resize && selectedBox) {
    boxWidth = xCurrentMouse - selectedBox.x;
    boxHeight = yCurrentMouse - selectedBox.y;
    selectedBox.width = boxWidth;
    selectedBox.height = boxHeight;
// update the box in the boxes object
    for (var key in boxes) {
      if (boxes.hasOwnProperty(key)) {
        if (boxes[key] === selectedBox) {
          boxes[key].width = boxWidth;
          boxes[key].height = boxHeight;
        }
      }
    }
  
    
  }
  clearCanvas();
  rerenderObjects();
})

// resizes box and rerenders
canvas.addEventListener("mouseup", function() {
  mouseDown = false;
  resize = false;
  rerenderObjects();
  //drawingThing = "shapes";
})

// checks if mouse is over the paramaters of a box
canvas.addEventListener("mousemove", function() {
  isOverBoxParamater();

})