import { useState, useEffect } from 'react';
import { findShapeUnderCursor } from './helpers.jsx';
import { createNewShape } from './helpers.jsx';

export const useCanvasInteraction = (canvasRef, resizingBoxRef, shapes, setShapes, shapeType, setShapeType, selectedShapeIndex, setSelectedShapeIndex) => {
  const [resizingEdge, setResizingEdge] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
  if (!dragging & shapeType !=null) {
    const { offsetX, offsetY } = e.nativeEvent;
    const shapeIndex = findShapeUnderCursor(shapes, offsetX, offsetY);
    if (shapeIndex === null) {
      
      const newShape = createNewShape(shapeType, offsetX, offsetY);


      if (shapeType === 'square') {
        newShape.size = 50;
      } else if (shapeType === 'circle') {
        newShape.radius = 25;
      } else if (shapeType === 'input') {
        newShape.width = 200;
        newShape.height = 50;
        newShape.borderRadius = 1;
        newShape.strokeWidth = 3;
        newShape.strokeColor = "#545454";
        newShape.fillStyleColor = "#FFFFFF";
        newShape.borderSides = {top: true, right: true, bottom: true, left: true};
        newShape.placeholderText ="Placeholder";
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

    requestAnimationFrame(() => {
      setShapes(newShapes);

      // Update the resizing box position directly
      if (shape.type === 'input') {
        resizingBoxRef.current.style.left = `${updatedShape.x}px`;
        resizingBoxRef.current.style.top = `${updatedShape.y}px`;
        resizingBoxRef.current.style.width = `${updatedShape.width}px`;
        resizingBoxRef.current.style.height = `${updatedShape.height}px`;
      }
    });
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

const handleStrokeWidthChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newWidth = parseFloat(e.target.value);
    if (!isNaN(newWidth)) {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, strokeWidth: newWidth } : shape
      );
      setShapes(updatedShapes);
    }
  }
};    

const handleStrokeColorChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newColor = e.target.value;
    console.log(newColor);
    if (newColor!== "") {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, strokeColor: newColor } : shape
      );
      console.log(updatedShapes);
      setShapes(updatedShapes);
    }
  }
};    

const handleFillStyleColorChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newColor = e.target.value;
    console.log(newColor);
    if (newColor!== "") {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, fillStyleColor: newColor } : shape
      );
      console.log(updatedShapes);
      setShapes(updatedShapes);
    }
  }
}; 

const handleLeftBorderChange = (e) => {
    if (selectedShapeIndex !== null) {
        const updatedShapes = shapes.map((shape, index) =>
            index === selectedShapeIndex 
                ? { ...shape, borderSides: { ...shape.borderSides, left: !shape.borderSides.left } } 
                : shape
        );
        setShapes(updatedShapes);
    }
};
  
const handleRightBorderChange = (e) => {
    if (selectedShapeIndex !== null) {
        const updatedShapes = shapes.map((shape, index) =>
            index === selectedShapeIndex 
                ? { ...shape, borderSides: { ...shape.borderSides, right: !shape.borderSides.right } } 
                : shape
        );
        setShapes(updatedShapes);
    }
};

const handleTopBorderChange = (e) => {
    if (selectedShapeIndex !== null) {
        const updatedShapes = shapes.map((shape, index) =>
            index === selectedShapeIndex 
                ? { ...shape, borderSides: { ...shape.borderSides, top: !shape.borderSides.top } } 
                : shape
        );
        setShapes(updatedShapes);
    }
};
  
const handleBottomBorderChange = (e) => {
    if (selectedShapeIndex !== null) {
        const updatedShapes = shapes.map((shape, index) =>
            index === selectedShapeIndex 
                ? { ...shape, borderSides: { ...shape.borderSides, bottom: !shape.borderSides.bottom } } 
                : shape
        );
        setShapes(updatedShapes);
    }
};
  

const handleBorderRadiusChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newBorderRadius = parseFloat(e.target.value);
    if (!isNaN(newBorderRadius)) {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, borderRadius: newBorderRadius } : shape
      );
      setShapes(updatedShapes);
    }
  }
};    

const handleResizeMouseDown = (e) => {
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
    const { pageX, pageY } = e;

    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();

    const offsetX = pageX - canvasRect.left;
    const offsetY = pageY - canvasRect.top;

    if (resizingEdge === 'left') {
      const deltaX = offsetX - shape.x;
      const newWidth = shape.width - deltaX;
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

const handleDeleteShape = () => {
  if (selectedShapeIndex !== null) {
    const updatedShapes = shapes.filter((shape, index) => index !== selectedShapeIndex);
    setShapes(updatedShapes);
    setSelectedShapeIndex(null); // Deselect the shape after deleting
  }
};  

const handlePlaceholderTextChange = (e) => {
  const updatedShapes = shapes.map((shape, index) =>
    index === selectedShapeIndex ? { ...shape, placeholderText: e.target.value } : shape
  );
  setShapes(updatedShapes);
};
    

useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);  

//change to 'Delete'  
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && document.activeElement.tagName !== 'INPUT') {
      handleDeleteShape();
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  // Clean up the event listener when the component is unmounted
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  }
}, [handleDeleteShape]); // add handleDeleteShape to the dependency array



return {
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleResizeMouseDown,
    handleResizeMouseMove,
    handleResizeMouseUp,
    handleHeightChange,
    handleWidthChange,
    handleStrokeWidthChange,
    handleStrokeColorChange, 
    handleBorderRadiusChange, 
    handleFillStyleColorChange,
    handleLeftBorderChange, 
    handleRightBorderChange, 
    handleTopBorderChange, 
    handleBottomBorderChange, 
    handleDeleteShape,
    handlePlaceholderTextChange,
    
  
  };
};