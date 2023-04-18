import { TextClass, isOverText } from './text.mjs';
import {mouseClickPosition} from './mouse.mjs'
import { rerenderTexts } from './render.mjs';
import {selectorMode, checkclickedNavOption} from './navigation.mjs';

//*******************************************************************************************
// Event Handlers

//draws a new text in the place where mouse click
canvas.addEventListener("click", function() {
  if (drawingThing == "text" & !isDragging) {
    mouseClickPosition;
    var text = TextClass.createText("Input text!", xMouse, yMouse, 22, "black", false);
    text.input();
    selectorMode();
    checkclickedNavOption();
    drawingThing = null;
    selectedText = text;
    lastText = text
    
  }

});


// drags the text to new position if selected and mouse is down
canvas.addEventListener("mousemove", function() {
  if (selectedText != null & mouseDown & selectedInput == null) {
    selectedText.x = xCurrentMouse;
    selectedText.y = yCurrentMouse;
  }

});

// unselects text if click on somewhere other than over text
canvas.addEventListener("click", function(){
  if(!isOverText(xCurrentMouse, yCurrentMouse)){
    var inputValue = document.getElementById('my-input');
    if (inputValue) {
    document.body.removeChild(document.getElementById('my-input'));
    lastText.content = inputValue.value;
    selectedText=null;
    rerenderTexts();}
  } if (isOverText(xCurrentMouse, yCurrentMouse)==true){
    selectedText.input();
  }
  
  }
)

canvas.addEventListener("mousemove", function(){
  isOverText(xCurrentMouse,yCurrentMouse);
})

// selects text if double click
canvas.addEventListener("mouseup", function(){
 selectedText= null;
})

