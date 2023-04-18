export class BoxClass {
  constructor(x, y, width, height, color, outline, selected) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.outline = outline;
    this.selected = selected;

    
  }

  // Method that creates a new form object and adds it to the forms list
  static createBox(x, y, width, height, color, outline, selected) {
    box = new BoxClass(x, y, width, height, color, outline, selected);
    boxes[Date.now()] = box;
    return box;
  }

  draw() {
    ctx.strokeStyle = this.color;
    this.outline(); // Call the outline method defined below
    ctx.strokeRect(this.x, this.y, this.width, this.height);

  }

  // Set the outline based on whether the box is selected or not
  outlineBox() {
    if (this.outline || this.selected) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }
  }

  delete() { }

  resizeMode() {
    if (this == selectedBox) {
      ctx.strokeStyle = "purple";
      ctx.setLineDash([]);
      ctx.strokeRect(this.x - 8, this.y - 8, 8, 8);
      ctx.strokeRect(this.x - 8, this.y + this.height, 8, 8);
      ctx.strokeRect(this.x + this.width, this.y - 8, 8, 8);
      ctx.strokeRect(this.x + this.width, this.y + this.height, 8, 8);
    }
  }

}


// Functions

// deletes all boxes in the array 
export function deleteStoredBoxes() {
  boxes = {};
  clearCanvas();
}

// Saves boxes to local storage
export function saveStoredBoxes() {
  localStorage.setItem("boxes", JSON.stringify(boxes));
}

// checks if a box is currently set to be resized and changes resize variable
export function checkResize() {
  if (isOverBoxParamaters == true & mouseDown == true) {
    resize = true;
  } else {
    resize = false;
  }
}

//checks if mouse is currently over a box's paramaters and changes variable that tracks that
export function isOverBoxParamater() {
  for (var key in boxes) {
    if (boxes.hasOwnProperty(key)) {
      box = boxes[key];
      if (xCurrentMouse >= box.x & xCurrentMouse <= box.x + 8 || yCurrentMouse >= box.y & yCurrentMouse <= box.y + 8 || xCurrentMouse >= box.x + box.width & xCurrentMouse <= box.x + box.width + 20 || yCurrentMouse >= box.y + box.height & yCurrentMouse <= box.y + box.height + 20) {
        isOverBoxParamaters = true;
        break;
      }
      else {
        isOverBoxParamaters = false;
      }
    }
  }
};

