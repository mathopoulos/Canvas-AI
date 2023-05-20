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