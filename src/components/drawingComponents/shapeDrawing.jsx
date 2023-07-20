// shapeDrawing.js
import { drawSquare } from '/src/components/drawingComponents/Square.jsx';
import { drawCircle } from '/src/components/drawingComponents/Circle.jsx';
import { drawInput } from '/src/components/drawingComponents/Input.jsx';
import { drawButton } from './Button';

export const drawShapes = (context, shapes, selectedShapeIndex, newInput) => {
  for (const [index, shape] of shapes.entries()) {
    if (shape.type === 'square') {
      drawSquare(context, shape.x, shape.y, shape.size);
    } else if (shape.type === 'circle') {
      drawCircle(context, shape.x, shape.y, shape.radius);
    } else if (shape.type === 'input') {
      const isSelected = selectedShapeIndex === index;
      drawInput(context, shape.width, shape.height, shape.x, shape.y, shape.borderRadius , isSelected, shape.strokeWidth, shape.strokeColor, shape.fillStyleColor, shape.borderSides, shape.placeholderText);
    } else if (shape.type === 'button') {
      const isSelected = selectedShapeIndex === index;
      drawButton(context, shape.width, shape.height, shape.x, shape.y, shape.borderRadius , isSelected, shape.strokeWidth, shape.strokeColor, shape.fillStyleColor, shape.borderSides, shape.placeholderText);
    }
  }
};
