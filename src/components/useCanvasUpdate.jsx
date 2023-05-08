import { useEffect } from 'react';
import { drawShapes } from './shapeDrawing.jsx';
import { updateResizingBox } from './helpers.jsx';

export const useCanvasUpdate = (canvasRef, resizingBoxRef, shapes, selectedShapeIndex) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawShapes(context, shapes, selectedShapeIndex);

    updateResizingBox(resizingBoxRef, selectedShapeIndex, shapes);
  }, [canvasRef, resizingBoxRef, shapes, selectedShapeIndex]);
};
