// shapeDrawing.js
import { drawSquare } from './Square.jsx';
import { drawCircle } from './Circle.jsx';
import { drawInput } from './Input.jsx';

export const drawShapes = (context, shapes, selectedShapeIndex) => {
  for (const [index, shape] of shapes.entries()) {
    if (shape.type === 'square') {
      drawSquare(context, shape.x, shape.y, shape.size);
    } else if (shape.type === 'circle') {
      drawCircle(context, shape.x, shape.y, shape.radius);
    } else if (shape.type === 'input') {
      const isSelected = selectedShapeIndex === index;
      drawInput(context, shape.width, shape.height, shape.x, shape.y, shape.borderRadius , isSelected, shape.strokeWidth, shape.strokeColor, shape.fillStyleColor, shape.borderSides, shape.placeholderText);
    }
  }
};
