let inputCounter = 1;
let squareCounter = 1;
let circleCounter = 1;

export const findShapeUnderCursor = (shapes, x, y) => {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.type === 'square') {
      const { x: shapeX, y: shapeY, size } = shape;
      if (x >= shapeX - size / 2 && x <= shapeX + size / 2 && y >= shapeY - size / 2 && y <= shapeY + size / 2) {
        return i;
      }
    } else if (shape.type === 'circle') {
      const { x: centerX, y: centerY, radius } = shape;
      const dx = x - centerX;
      const dy = y - centerY;
      if (dx * dx + dy * dy <= radius * radius) {
        return i;
      }
    } else if (shape.type === 'input') {
      const { x: shapeX, y: shapeY, width, height } = shape;
      if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
        return i;
      }
    }
  }
  return null;
};

export const updateResizingBox = (resizingBoxRef, selectedIndex, shapes) => {
  if (resizingBoxRef.current === null) {
    return;
  }

  const resizingBox = resizingBoxRef.current;

  if (selectedIndex === null) {
    resizingBox.style.display = 'none';
    return;
  }

  const selectedShape = shapes[selectedIndex];

  if (selectedShape.type === 'input') {
    resizingBox.style.display = 'block';
    resizingBox.style.left = `${selectedShape.x}px`;
    resizingBox.style.top = `${selectedShape.y}px`;
    resizingBox.style.width = `${selectedShape.width}px`;
    resizingBox.style.height = `${selectedShape.height}px`;
  } else {
    resizingBox.style.display = 'none';
  }
};

export const updateCursor = (resizingBoxRef, e) => {
  const resizingBox = resizingBoxRef.current;
  if (resizingBox) {
    const { left, top, width, height } = resizingBox.getBoundingClientRect();
    const buffer = 5;
    const isOnRightEdge = Math.abs(e.clientX - (left + width)) < buffer;
    const isOnLeftEdge = Math.abs(e.clientX - left) < buffer;
    const isOnTopEdge = Math.abs(e.clientY - top) < buffer;
    const isOnBottomEdge = Math.abs(e.clientY - (top + height)) < buffer;
    const isInsideBox = e.clientX > left && e.clientX < left + width && e.clientY > top && e.clientY < top + height;

    if (isOnRightEdge || isOnLeftEdge) {
      document.body.style.cursor = 'ew-resize';
    } else if (isOnTopEdge || isOnBottomEdge) {
      document.body.style.cursor = 'ns-resize';
    } else if (isInsideBox) {
      document.body.style.cursor = 'pointer';
    } else {
      resizingBox.style.cursor = 'default';
    }
  }
};

export const createNewShape = (shapeType, offsetX, offsetY) => {
  const newShape = { x: offsetX, y: offsetY, type: shapeType };
  if (shapeType === 'square') {
    newShape.name = `Square ${squareCounter}`;
    newShape.size = 50;
  } else if (shapeType === 'circle') {
    newShape.name = `Circle ${circleCounter}`;
    newShape.radius = 25;
  } else if (shapeType === 'input') {
    newShape.name = `Input ${inputCounter}`;
    newShape.width = 200;
    newShape.height = 50;
    newShape.borderRadius = 5;
    inputCounter++; // Increment the counter for the next input
  }


  return newShape;
};

export const updateShapeIndexes = (shapes, newOrder) => {
  return newOrder.map((newIndex, oldIndex) => {
    const shape = shapes[oldIndex];
    return { ...shape, index: newIndex };
  });
};

// Generate HTML for all inputs

/* export const syncCode() {
  let inputsHTML = '';
  for (const key in form.inputs) {
    if (form.inputs.hasOwnProperty(key)) {
      input = form.inputs[key];
      //inputsHTML += `<label for="${key}">${input.label}</label>\n`;
      inputsHTML += `<input type="${input.type}" id="${key}" name="${key}" style="position:absolute; left:${input.x}px; top:${input.y}px;"`;
      if (input.required) {
        inputsHTML += ' required';
      }
      if (input.value) {
        inputsHTML += ` value="${input.value}"`;
      }
      inputsHTML += '>\n';
      
    }
  }

  // Generate HTML for all texts
  let textsHTML = '';
  for (const key in form.texts) {
    if (form.texts.hasOwnProperty(key)) {
      text = form.texts[key];
      textsHTML += `<p style="font-size:${text.fontSize}px; color:${text.color}; position: absolute; left:${text.x}px; top:${text.y}px">${text.content}</p>\n`;
    }
  }

// Combine generated HTML code for all inputs and texts
const html = `
  <html>
    <head>
      <style>
        div {
          border-radius: 5px;
          background-color: #f2f2f2;
          padding: 20px;
          height: 600px;
          width: 850px; 
          left: 220px; 
          top: 120px; 
        }
      </style>
    </head>
    <body>
      <div>
        <form>
          ${inputsHTML}
          ${textsHTML}
        </form>
      </div>
    </body>
  </html>
`;


const str = html;
const base64 = btoa(str); // Encodes str in base64

const token = "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"; // Replace with your Github personal access token
const owner = "mathopoulos"; // Replace with the repository owner
const repo = "canvas_data"; // Replace with the repository name
const path = "index.html"; // Replace with the file path you want to create/update
const message = "New file created"; // Replace with the commit message
const newContent = html; // Replace with the new file's content

// Get the current file content and its SHA hash
fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  headers: {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const currentContent = atob(data.content);
    const currentSHA = data.sha;

    // Update the file with the new content
    const updatedContent = newContent;
    const updatedContentBase64 = btoa(updatedContent);
    const body = {
      message: message,
      content: updatedContentBase64,
      sha: currentSHA,
    };
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
  
// Get messageDiv and check if it already has a success message
const messageDiv = document.querySelector("#messageDiv");
const successMsg = messageDiv.querySelector("p");

// Only add a new success message if it doesn't exist already
if (!successMsg) {
  const exportSuccessfulMsg = document.createElement("p");
  exportSuccessfulMsg.textContent = "Success!";
  messageDiv.appendChild(exportSuccessfulMsg);
  setTimeout(() => {
    messageDiv.removeChild(exportSuccessfulMsg); // Remove the success message after 5 seconds
  }, 3000);
}

}

*/

