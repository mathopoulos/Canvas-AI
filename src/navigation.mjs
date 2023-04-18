
// Sets the drawing mode to the box shape
export function boxDrawingMode() {
  drawingThing = "box";
  canvas.style.cursor = "crosshair"

}

// Sets the drawing mode to the selector
export function selectorMode() {
  drawingThing = "selector";
  canvas.style.cursor = "auto"
  

}

// Sets the drawing mode to text
export function textDrawingMode() {
  drawingThing = "text";
  canvas.style.cursor = "crosshair"
}

// Sets the drawing mode to shapes
export function shapeDrawingMode() {
  drawingThing = "shapes";
  canvas.style.cursor = "pointer"

}

// Sets the drawing mode to the form
export function formDrawingMode() {
  drawingThing = "form";
}

// Sets the drawing mode to the form
export function inputDrawingMode() {
  drawingThing = "input";
  canvas.style.cursor = "crosshair"
}
  

// Checks what the drawingThing is set to and adjusts nav
export function checkclickedNavOption(){
    if (drawingThing == "box") {buttonBox.style.backgroundColor = '#f3f1f1';
 buttonBox.style.borderRadius = "10px";}
  else {
    buttonBox.style.backgroundColor = "#ffffff"}

    if (drawingThing == "formB") {form.style.backgroundColor = '#f3f1f1';
 form.style.borderRadius = "10px";}
  else {
    formB.style.backgroundColor = "#ffffff"}

    if (drawingThing == "text") {textB.style.backgroundColor = '#f3f1f1';
 textB.style.borderRadius = "10px";}
  else {
    textB.style.backgroundColor = "#ffffff"}

      if (drawingThing == "shapes") {shapes.style.backgroundColor = '#f3f1f1';
 shapes.style.borderRadius = "10px";}
  else {
    shapes.style.backgroundColor = "#ffffff"}

    if (drawingThing == "selector") {selector.style.backgroundColor = '#f3f1f1';
 selector.style.borderRadius = "10px";}
  else {
    selector.style.backgroundColor = "#ffffff"}
if (drawingThing == "input") {inputB.style.backgroundColor = '#f3f1f1';
 inputB.style.borderRadius = "10px";}
  else {
    inputB.style.backgroundColor = "#ffffff"}
}