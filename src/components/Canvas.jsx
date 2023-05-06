import React, { useRef, useState, useEffect } from 'react';
import Toolbar from './Toolbar.jsx';
import { drawSquare } from './Square.jsx';
import { drawCircle } from './Circle.jsx';
import { drawInput } from './Input.jsx';
import { findShapeUnderCursor } from './helpers.jsx';
import ElementDetails from '/src/components/elementDetails.jsx';
import { updateResizingBox } from './helpers.jsx';



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
  if (e.target.dataset.resize) {
    setResizingEdge(e.target.dataset.resize);
    e.stopPropagation(); // Prevent triggering the canvas event
  }
};

const handleResizeMouseMove = (e) => {
  const resizingBox = resizingBoxRef.current;
  const { x, y, width, height } = resizingBox.getBoundingClientRect();
  const buffer = 3;
  const isOnRightEdge = Math.abs(e.clientX - (x + width)) < buffer;
  const isOnLeftEdge = Math.abs(e.clientX - x) < buffer;
  const isOnTopEdge = Math.abs(e.clientY - y) < buffer;
  const isOnBottomEdge = Math.abs(e.clientY - (y + height)) < buffer;

  if (resizing) {
    const deltaX = e.clientX - initialMousePosition.current.x;
    const deltaY = e.clientY - initialMousePosition.current.y;

    setShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      const shape = newShapes[selectedShapeIndex];
      shape.width += deltaX;
      shape.height += deltaY;
      return newShapes;
    });

    initialMousePosition.current = { x: e.clientX, y: e.clientY };
    updateResizingBox(resizingBoxRef, selectedShapeIndex, shapes);
  } else {
    if (isOnRightEdge || isOnLeftEdge) {
      resizingBox.style.cursor = 'ew-resize';
    } else if (isOnTopEdge || isOnBottomEdge) {
      resizingBox.style.cursor = 'ns-resize';
    } else {
      resizingBox.style.cursor = 'default';
    }
  }
};




const handleResizeMouseUp = () => {
  setResizingEdge(null);
};

  




return (
  <div>
    <Toolbar setShape={setShapeType} />
    <div style={{ position: 'relative', width: '310px', height: '100px', border: '1px solid black', left: '320px', top: '220px' }}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseDown={(e) => {
          handleMouseDown(e);
          handleResizeMouseDown(e);
        }}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleResizeMouseMove(e);
        }}
        onMouseUp={(e) => {
          handleMouseUp(e);
          handleResizeMouseUp(e);
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
      </div>
    </div>
    <ElementDetails selectedIndex={selectedShapeIndex} shapes={shapes} onHeightChange={handleHeightChange} onWidthChange={handleWidthChange} />
  </div>
);


}

export default Canvas;
