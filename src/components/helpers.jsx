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
