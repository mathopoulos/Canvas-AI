//Import 
import {deleteStoredBoxes, saveStoredBoxes, checkResize, isOverBoxParamater } from './boxes.mjs';

import {mouseClickPosition, currentMouse} from './mouse.mjs';

import { rerenderForms, rerenderBoxes, rerenderObjects, clearCanvas } from './render.mjs';

import {boxDrawingMode, selectorMode, textDrawingMode, shapeDrawingMode, formDrawingMode, checkclickedNavOption,inputDrawingMode } from './navigation.mjs';

import {syncCode} from './codeSync.mjs';




//*******************************************************************************************
// Event Handlers
// highlights box button if clicked and unhilights when not
boxB.addEventListener("click", function() {
  boxDrawingMode();
  checkclickedNavOption()
});

// highlights form button if clicked and unhilights when not
formB.addEventListener("click", function() {
  formDrawingMode();
  checkclickedNavOption();
  document.getElementById("shapesSection").style.display = "none";
  document.getElementById("formSection").style.display = "flex";
  document.getElementById("thingsSection").style.borderBottom = "solid 1px #c9c9c9";
});

// highlights text button if clicked and unhilights when not
textB.addEventListener("click", function() {
  textDrawingMode();
  checkclickedNavOption()
});

// highlights selector button if clicked and unhilights when not
selector.addEventListener("click", function() {
  selectorMode();
  checkclickedNavOption()
});

// highlights shapes button if clicked and unhilights when not
shapes.addEventListener("click", function() {
  shapeDrawingMode();
  checkclickedNavOption();
  document.getElementById("shapesSection").style.display = "flex";
  document.getElementById("thingsSection").style.borderBottom = "solid 1px #c9c9c9";
  document.getElementById("formSection").style.display = "none";
});

// highlights input button if clicked and unhilights when not
inputB.addEventListener("click", function() {
  inputDrawingMode();
  checkclickedNavOption();
  document.getElementById("shapesSection").style.display = "none";
  document.getElementById("formSection").style.display = "flex";
  document.getElementById("thingsSection").style.borderBottom = "solid 1pxccc #c9c9c9";
});

exportButton.addEventListener("click", syncCode)

textB.addEventListener("mouseenter", function() {
  if (drawingThing !== "text") {
    textB.style.backgroundColor = "#f3f1f1";
    textB.style.borderRadius = "10px";
  }
});

textB.addEventListener("mouseleave", function() {
  if (drawingThing !== "text") {
    textB.style.backgroundColor = "#ffffff";
  }
});

boxB.addEventListener("mouseenter", function() {
  if (drawingThing !== "box") {
    boxB.style.backgroundColor = "#f3f1f1";
    boxB.style.borderRadius = "10px";
  }
});

boxB.addEventListener("mouseleave", function() {
  if (drawingThing !== "box") {
    boxB.style.backgroundColor = "#ffffff";
  }
});

formB.addEventListener("mouseenter", function() {
  if (drawingThing !== "form") {
    formB.style.backgroundColor = "#f3f1f1";
    formB.style.borderRadius = "10px";
  }
});

formB.addEventListener("mouseleave", function() {
  if (drawingThing !== "form") {
    formB.style.backgroundColor = "#ffffff";
  }
});

selector.addEventListener("mouseenter", function() {
  if (drawingThing !== "selector") {
    selector.style.backgroundColor = "#f3f1f1";
    selector.style.borderRadius = "10px";
  }
});

selector.addEventListener("mouseleave", function() {
  if (drawingThing !== "selector") {
    selector.style.backgroundColor = "#ffffff";
  }
});

shapes.addEventListener("mouseenter", function() {
  if (drawingThing !== "shapes") {
    shapes.style.backgroundColor = "#f3f1f1";
    shapes.style.borderRadius = "10px";
  }
});

shapes.addEventListener("mouseleave", function() {
  if (drawingThing !== "shapes") {
    shapes.style.backgroundColor = "#ffffff";
  }
});

inputB.addEventListener("mouseenter", function() {
  if (drawingThing !== "input") {
    inputB.style.backgroundColor = "#f3f1f1";
    inputB.style.borderRadius = "10px";
  }
});

inputB.addEventListener("mouseleave", function() {
  if (drawingThing !== "input") {
    inputB.style.backgroundColor = "#ffffff";
  }
});