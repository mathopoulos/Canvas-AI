import { useEffect } from 'react';
import { drawShapes } from '/src/components/drawingComponents/shapeDrawing.jsx';
import { updateResizingBox } from '/src/components/helpers.jsx';

// Custom hook to handle canvas updates
export const useCanvasUpdate = (canvasRef, resizingBoxRef, shapes, selectedShapeIndex, canvasHeight, canvasWidth) => {
  useEffect(() => {
    // Get the canvas and its 2D context
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Get the device pixel ratio, fall back to 1 if not available
    const dpr = window.devicePixelRatio || 1;

    // Adjust canvas dimensions based on device pixel ratio
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Adjust the scale of the context based on device pixel ratio
    context.scale(dpr, dpr);

    // Draw the shapes on the canvas
    drawShapes(context, shapes, selectedShapeIndex); // pass selectedShapeIndex to drawShapes

    // Update the resizing box based on the selected shape
    updateResizingBox(resizingBoxRef, selectedShapeIndex, shapes);
  }, [canvasRef, resizingBoxRef, shapes, selectedShapeIndex]);
};