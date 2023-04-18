
// Input object class
export class InputClass {
  constructor(x, y, width, height, type, color, isSelected, outline, borderRadius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; 
    this.color = color;
    this.isSelected = isSelected;
    this.outline = outline;
    this.borderRadius = borderRadius;
    
  }
  // Method to create a new input object and add it to inupts

  static createInput(x, y, width, height, type, color, isSelected, outline, borderRadius) {
    var input = new InputClass(x, y, width, height, type, color, isSelected, outline, borderRadius);
    inputs[Date.now()] = input;
    var firstKey = Object.entries(forms)[0][0];
    form = forms[firstKey];
    form.inputs[Date.now()] = input;
    return input;
    
  }

  // Draw input object
  draw() {
    canvas = document.getElementById("drawing-canvas");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(this.x + this.borderRadius, this.y);
    ctx.lineTo(this.x + this.width - this.borderRadius, this.y);
    ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.borderRadius, this.borderRadius);
    ctx.lineTo(this.x + this.width, this.y + this.height - this.borderRadius);
    ctx.arcTo(this.x + this.width, this.y + this.height, this.x + this.width - this.borderRadius, this.y + this.height, this.borderRadius);
    ctx.lineTo(this.x + this.borderRadius, this.y + this.height);
    ctx.arcTo(this.x, this.y + this.height, this.x, this.y + this.height - this.borderRadius, this.borderRadius);
    ctx.lineTo(this.x, this.y + this.borderRadius);
    ctx.arcTo(this.x, this.y, this.x + this.borderRadius, this.y, this.borderRadius);
    ctx.closePath();
    ctx.stroke();


  }

  // Set the outline based on whether the input is selected or not
  outlineInput() {
    if (this.outline || this.isSelected) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);

    }
  }

  containsPoint(x, y) {
    return this.x < x &&
      this.x + this.width + 16 > x &&
      this.y < y &&
      this.y + this.height + 16 > y;
  }

}

//Functions

//function that checks if mouse is currently over a form
export function isOverInput(x, y) {
  for (const key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      input = inputs[key];
      if (input.containsPoint(x, y) & selectedText == null) {
        selectedInput = input;
        canvas.style.cursor = "pointer"; 
        input.outline = true;
        input.outlineInput();
        return true;
        break;
      } else { 
        input.outline = false; input.outlineInput(); canvas.style.cursor = "default"; //selectedInput= null}
      }
    }
  }


}

