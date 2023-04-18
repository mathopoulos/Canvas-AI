//text oblect class
export class TextClass {
  constructor(content, x, y, fontSize, color, outline) {
    this.content = content;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.color = color;
    this.outline = outline; 
    
  }

  // Method that reates a new text object and adds it to the text list
  static createText(content, x, y, fontSize, color, outline) {
    var text = new TextClass(content, x, y, fontSize, color, outline);
    texts[Date.now()] = text;
    //var firstKey = Object.entries(texts)[0][0];
    //text = texts[firstKey];
    form.texts[Date.now()] = text;
    return text;
  }

  //Edit text content
  input() {
    inputDialogue = document.createElement("input");
    inputDialogue.value = this.content;
    inputDialogue.id = "my-input";
    inputDialogue.type = "text";
    inputDialogue.style.position = "absolute";
    inputDialogue.style.fontSize = "22px";
    inputDialogue.style.fontColor = "black";
    inputDialogue.style.zIndex = "9999";
    inputDialogue.style.left = this.x + "px";
    inputDialogue.style.top = this.y - 20 + "px";
    inputDialogue.style.backgroundColor = "#F9FAFB";
    inputDialogue.style.outlineColor = "#F9FAFB";
    inputDialogue.autofocus = true;
inputDialogue.style.borderStyle = "dashed";
inputDialogue.style.borderColor = "black";
inputDialogue.style.borderWidth = "2px";
    document.body.appendChild(inputDialogue);
  }


  // Method that draws a new form object on canvas
  draw() {
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.content, this.x, this.y);
    ctx.fillStyle = "#F9FAFB";

  }

  containsPoint(x, y) {
    var width = ctx.measureText(this.text).width;
return x >= this.x && x <= this.x + width && y >= this.y - this.fontSize && y <= this.y + 10;
  }

  outlineText() {
  //define the outline color and width
  var outlineColor = "black";
  var outlineWidth = 2;

  //get the width of the text
  var textWidth = ctx.measureText(this.content).width +7;

  
  //draw the outline
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = outlineWidth;
  
  ctx.rect(this.x - 5,
           this.y - this.fontSize - 2,
           textWidth + outlineWidth + 3,
           this.fontSize + 10 );

  ctx.stroke();
  ctx.closePath();
}
}


//Functions

//function that checks if mouse is currently over a piece of text
export function isOverText(x, y) {
  for (const key in texts) {
    if (texts.hasOwnProperty(key)) {
      var text = texts[key];
      if (text.containsPoint(x, y) & selectedInput == null) {
        selectedText = text;
        canvas.style.cursor = "pointer";
        text.outline = true; 
        return true;
        break;
      }
      else {selectedText = null; canvas.style.cursor = "default"; text.outline = false}
    }
  }
}