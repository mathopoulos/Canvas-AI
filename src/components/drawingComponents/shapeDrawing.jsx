// Importing drawing functions for different shapes
import { drawSquare } from '/src/components/drawingComponents/Square.jsx';
import { drawCircle } from '/src/components/drawingComponents/Circle.jsx';
import { drawInput } from '/src/components/drawingComponents/Input.jsx';
import { drawButton } from './Button';

// Function to draw a collection of shapes on a canvas context
export const drawShapes = (context, shapes, selectedShapeIndex, newInput) => {

  // Loop through each shape in the shapes array
  for (const [index, shape] of shapes.entries()) {

    // Check the type of the shape and call the appropriate drawing function
    if (shape.type === 'square') {
      drawSquare(context, shape.x, shape.y, shape.size);
    } else if (shape.type === 'circle') {
      drawCircle(context, shape.x, shape.y, shape.radius);
    } else if (shape.type === 'input') {
      // Check if the current input shape is the selected one
      const isSelected = selectedShapeIndex === index;
      drawInput(context, shape.width, shape.height, shape.x, shape.y, shape.borderRadius , isSelected, shape.strokeWidth, shape.strokeColor, shape.fillStyleColor, shape.borderSides, shape.placeholderText);
    } else if (shape.type === 'button') {
      // Check if the current button shape is the selected one
      const isSelected = selectedShapeIndex === index;
      drawButton(context, shape.width, shape.height, shape.x, shape.y, shape.borderRadius , isSelected, shape.strokeWidth, shape.strokeColor, shape.fillStyleColor, shape.borderSides, shape.placeholderText);
    }
  }
};
