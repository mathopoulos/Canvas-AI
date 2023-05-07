import React, { useRef, useState, useEffect } from 'react';
import Toolbar from './Toolbar.jsx';
import { drawSquare } from './Square.jsx';
import { drawCircle } from './Circle.jsx';
import { drawInput } from './Input.jsx';
import { findShapeUnderCursor } from './helpers.jsx';
import ElementDetails from '/src/components/elementDetails.jsx';
import { updateResizingBox, updateCursor } from './helpers.jsx';



function Canvas() {
  const canvasRef = useRef(null);
  const resizingBoxRef = useRef(null);
  const [resizingEdge, setResizingEdge] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState('input');
  const [resizing, setResizing] = useState(false);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

useEffect(() => {
  window.addEventListener('mouseup', handleMouseUp);
  return () => {
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, []);


useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const [index, shape] of shapes.entries()) {
    if (shape.type === 'square') {
      drawSquare(context, shape.x, shape.y, shape.size);
    } else if (shape.type === 'circle') {
      drawCircle(context, shape.x, shape.y, shape.radius);
    } else if (shape.type === 'input') {
      const isSelected = selectedShapeIndex === index;
      drawInput(context, shape.width, shape.height, shape.x, shape.y, 5, isSelected);
    }
  };
// Update the resizing box position and size
  updateResizingBox(resizingBoxRef, selectedShapeIndex, shapes);
}, [shapes, resizingBoxRef, selectedShapeIndex]);


const handleClick = (e) => {
  if (!dragging) {
    const { offsetX, offsetY } = e.nativeEvent;
    const shapeIndex = findShapeUnderCursor(shapes, offsetX, offsetY);
    if (shapeIndex === null) {
      const newShape = { x: offsetX, y: offsetY, type: shapeType };

      if (shapeType === 'square') {
        newShape.size = 50;
      } else if (shapeType === 'circle') {
        newShape.radius = 25;
      } else if (shapeType === 'input') {
        newShape.width = 200;
        newShape.height = 50;
        newShape.borderRadius = 5;
      }

      setShapes([...shapes, newShape]);
      setSelectedShapeIndex(null); 
      setShapeType(null); // Add this line to reset the selected shape index

    } else {
      setSelectedShapeIndex(shapeIndex);
    }
  }
};




const handleMouseDown = (e) => {
  const { offsetX, offsetY } = e.nativeEvent;
  const shapeIndex = findShapeUnderCursor(shapes, offsetX, offsetY);
  if (shapeIndex !== null) {
    const shape = shapes[shapeIndex];
    setDragOffset({ x: offsetX - shape.x, y: offsetY - shape.y });
    setDragging(true);
    setSelectedShapeIndex(shapeIndex);
  }
};



const handleMouseMove = (e) => {
  if (dragging) {
    const { offsetX, offsetY } = e.nativeEvent;
    const shape = shapes[selectedShapeIndex];
    const updatedShape = { ...shape, x: offsetX - dragOffset.x, y: offsetY - dragOffset.y };
    const newShapes = [...shapes];
    newShapes[selectedShapeIndex] = updatedShape;
    setShapes(newShapes);

    // Update the resizing box position directly
    if (shape.type === 'input') {
      resizingBoxRef.current.style.left = `${updatedShape.x}px`;
      resizingBoxRef.current.style.top = `${updatedShape.y}px`;
      resizingBoxRef.current.style.width = `${updatedShape.width}px`;
      resizingBoxRef.current.style.height = `${updatedShape.height}px`;
    }
  }
};



const handleMouseUp = () => {
  setResizing(false);
  setDragging(false);
};

const handleHeightChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newHeight = parseFloat(e.target.value);
    if (!isNaN(newHeight)) {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, height: newHeight } : shape
      );
      setShapes(updatedShapes);
    }
  }
};

const handleWidthChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newWidth = parseFloat(e.target.value);
    if (!isNaN(newWidth)) {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, width: newWidth } : shape
      );
      setShapes(updatedShapes);
    }
  }
};  

const handleResizeMouseDown = (e) => {
  console.log("test");
  const resizingEdgeElement = e.target.closest('[data-resize]');
  console.log(resizingEdgeElement);
  const resizingEdge = resizingEdgeElement ? resizingEdgeElement.dataset.resize : null;

  if (resizingEdge) {
    setResizingEdge(resizingEdge);
    setResizing(true);
    e.stopPropagation();
  }
};

const handleResizeMouseMove = (e) => {
  if (resizing && resizingEdge && selectedShapeIndex !== null) {
    const shape = shapes[selectedShapeIndex];
    const updatedShape = { ...shape };
    const { offsetX, offsetY } = e.nativeEvent;

    if (resizingEdge === 'left') {
      const newWidth = shape.x + shape.width - offsetX;
      updatedShape.x = offsetX;
      updatedShape.width = newWidth;
    } else if (resizingEdge === 'right') {
      updatedShape.width = offsetX - shape.x;
    } else if (resizingEdge === 'top') {
      const newHeight = shape.y + shape.height - offsetY;
      updatedShape.y = offsetY;
      updatedShape.height = newHeight;
    } else if (resizingEdge === 'bottom') {
      updatedShape.height = offsetY - shape.y;
    }

    const newShapes = [...shapes];
    newShapes[selectedShapeIndex] = updatedShape;
    setShapes(newShapes);
  }
};

const handleResizeMouseUp = () => {
  setResizingEdge(null);
  setResizing(false);
};


return (
  <div>
    <Toolbar setShape={setShapeType} />
    <div style={{ position: 'relative', width: '310px', height: '100px', border: '1px solid black', left: '320px', top: '220px' }} onMouseMove={(e) => updateCursor(resizingBoxRef, e)
    }>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseDown={(e) => {
          handleMouseDown(e);
          
        }}
        onMouseMove={(e) => {
          handleMouseMove(e);
          
        }}
        onMouseUp={(e) => {
          handleMouseUp(e);
          
        }}
        width="310"
        height="100"
        style={{
          position: 'absolute',
        }}
      />
      <div
  ref={resizingBoxRef}
  className="resizing-box"
  onMouseDown={handleResizeMouseDown}
  onMouseMove={handleResizeMouseMove}
  onMouseUp={handleResizeMouseUp}
>
  <div className="resize-edge left" data-resize="left"></div>
  <div className="resize-edge right" data-resize="right"></div>
  <div className="resize-edge top" data-resize="top"></div>
  <div className="resize-edge bottom" data-resize="bottom"></div>
</div>


    </div>
    <ElementDetails selectedIndex={selectedShapeIndex} shapes={shapes} onHeightChange={handleHeightChange} onWidthChange={handleWidthChange} />
  </div>
);


}

export default Canvas;
