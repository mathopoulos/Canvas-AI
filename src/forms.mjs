import { rerenderObjects } from "./render.mjs";

//form oblect class
export class FormClass {
  constructor (x, y, width, height, color, inputs,texts) {
    this.x = x; 
    this.y = y; 
    this.width = width;
    this.height = height; 
    this.color = color; 
    this.inputs = {};
    this.texts = {};
    
  }

  // Method that reates a new form object and adds it to the forms list
  static createForm (x, y, width, height, color, inputs, texts){
    const form = new FormClass(x, y, width, height, color, inputs, texts);
    forms[Date.now()] = form;
    return form; 
  }
  
  // Method that draws a new form object on canvas
  draw() {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = `${this.color}60`;
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.lineWidth = 1;
  }

  
}


