import React, { useRef, useState, useEffect } from 'react';
import Toolbar from './Toolbar.jsx';
import { drawSquare } from './Square.jsx';
import { drawCircle } from './Circle.jsx';
import { drawInput } from './Input.jsx';
import { findShapeUnderCursor } from './helpers.jsx';
import ElementDetails from '/src/components/elementDetails.jsx';



function Canvas() {
  const canvasRef = useRef(null);
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

  for (const shape of shapes) {
    if (shape.type === 'square') {
      drawSquare(context, shape.x, shape.y, shape.size);
    } else if (shape.type === 'circle') {
      drawCircle(context, shape.x, shape.y, shape.radius);
    } else if (shape.type === 'input') {
      drawInput(context, shape.width, shape.height, shape.x, shape.y, 5);
    }
  }
}, [shapes]);


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




  return (
    <div>
      <Toolbar setShape={setShapeType} />
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width="310"
        height="100"
        style={{
          border: '1px solid black',
          position: 'absolute',
          left: '320px',
          top: '220px'
        }}
      />
      <ElementDetails selectedIndex={selectedShapeIndex} shapes={shapes} onHeightChange={handleHeightChange} onWidthChange={handleWidthChange} />
    </div>
  );
}

export default Canvas;
