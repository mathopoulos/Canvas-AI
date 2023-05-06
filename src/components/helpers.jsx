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
