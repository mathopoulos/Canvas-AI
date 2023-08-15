import { useState, useEffect } from 'react';
import { findShapeUnderCursor, isCursorOverCanvasBorder } from '/src/components/helpers.jsx';
import { createNewShape } from '/src/components/helpers.jsx';
import {getAllInputsOfComponent, getAllButtonsOfComponent, getAllTextsOfComponent} from '/src/components/graphql/queries.jsx';
import { addNewComponent, addNewInput, updateInputHeight, updateInputWidth, updateInputStrokeWidth, updateInputStrokeColor, updateInputFillStyleColor, updateInputBorderSides, updateInputBorderRadius, updateInputPosition, updateInputSize, deleteInput, updateInputPlaceholderText, addNewButton, deleteButton, updateButtonHeight, updateButtonSize, updateButtonPosition, updateButtonWidth, updateButtonStrokeWidth, updateButtonStrokeColor, updateButtonFillStyleColor, updateButtonBorderSides, updateButtonBorderRadius, updateButtonText, updateInputPlaceholderTextFont, updateInputPlaceholderTextSize, updateTextPosition, addNewText, deleteText, updateTextPlaceholderText, updateTextPlaceholderTextFont, updateTextPlaceholderTextSize, updateTextPlaceholderTextStyle, updateCanvasHeight, updateCanvasTop,updateCanvasWidth} from '/src/components/graphql/mutations.jsx';



// Custom hook to handle interactions with the canvas and its shapes
export const useCanvasInteraction = (canvasRef, resizingBoxRef, shapes, setShapes, shapeType, setShapeType, selectedShapeIndex, setSelectedShapeIndex, selectedComponent, canvasSelected, setCanvasSelected, canvasHeight, setCanvasHeight, canvasTop, setCanvasTop, canvasLeft, setCanvasLeft, canvasWidth, setCanvasWidth) => {
  const [resizingEdge, setResizingEdge] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [topBorder, setTopBorder] = useState(false);
  const [bottomBorder, setBottomBorder] = useState(false);
    const [leftBorder, setLeftBorder] = useState(false);
    const [rightBorder, setRightBorder] = useState(false);
  const [dragStartY, setDragStartY] = useState(null);
  const [dragStartX, setDragStartX] = useState(null);


  // Handle canvas click events
  const handleClick = (e) => {
  if (!dragging & shapeType !=null) {
    const { offsetX, offsetY } = e.nativeEvent;
    const shapeIndex = findShapeUnderCursor(shapes, offsetX, offsetY);
    const isOverCanvas = isCursorOverCanvasBorder(canvasRef, e);
    const containsTrue = Object.values(isOverCanvas).some(Boolean);
    if (shapeIndex === null && !containsTrue) {
      const newShape = createNewShape(shapeType, offsetX, offsetY);

      // Define properties based on the shape type
      if (shapeType === 'square') {
        newShape.size = 50;
      } else if (shapeType === 'circle') {
        newShape.radius = 25;
      } else if (shapeType === 'input') {
        newShape.type = 'input';
        newShape.width = 200;
        newShape.height = 50;
        newShape.borderRadius = 1;
        newShape.strokeWidth = 3;
        newShape.strokeColor = "#545454";
        newShape.fillStyleColor = "#FFFFFF";
        newShape.borderSides = {top: true, right: true, bottom: true, left: true};
        newShape.placeholderText ="Placeholder";
        newShape.placeholderTextFont = "Arial";
        newShape.placeholderTextFillStyle = "#545454";
        newShape.placeholderTextSize = 14;
        addNewInput(selectedComponent, newShape)
        getAllInputsOfComponent()
      } else if (shapeType === 'button') {
        newShape.type = 'button';
        newShape.width = 100;
        newShape.height = 40;
        newShape.borderRadius = 1;
        newShape.strokeWidth = 3;
        newShape.strokeColor = "#545454";
        newShape.fillStyleColor = "#808080";
        newShape.borderSides = {top: true, right: true, bottom: true, left: true};
        newShape.placeholderText ="Button";
        addNewButton(selectedComponent, newShape)
        getAllButtonsOfComponent()
      } else if (shapeType ==='text') {
        newShape.placeholderText ="Input Text";
        newShape.type = "text";
        newShape.placeholderTextFillStyle = "#545454";
        newShape.placeholderTextSize = 14;
        newShape.height = 50;
        newShape.width = 200;
        newShape.group = ""
        addNewText(selectedComponent, newShape);
        getAllTextsOfComponent()
      }

      setShapes([...shapes, newShape]);
      setSelectedShapeIndex(null); 
      setShapeType(null); // Add this line to reset the selected shape index

    } else {
      setSelectedShapeIndex(shapeIndex);
    }
  }
};

// Handle mouse down events on the canvas
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

// Handle mouse move events on the canvas
const handleMouseMove = (e) => {
  const isOverCanvas = isCursorOverCanvasBorder(canvasRef, e);
    const containsTrue = Object.values(isOverCanvas).some(Boolean);
      if (containsTrue) {
      document.body.style.cursor = 'ew-resize'
    } else {document.body.style.cursor = 'pointer'}
  if (dragging) {
    const { offsetX, offsetY } = e.nativeEvent;
    const shape = shapes[selectedShapeIndex];
    const updatedShape = { ...shape, x: offsetX - dragOffset.x, y: offsetY - dragOffset.y };
    const newShapes = [...shapes];
    newShapes[selectedShapeIndex] = updatedShape;
    requestAnimationFrame(() => {
      setShapes(newShapes);
      let changedShape = newShapes[selectedShapeIndex];
      if (changedShape.type === 'input') {
      updateInputPosition(changedShape.id, changedShape.x, changedShape.y);}
      else if (changedShape.type === 'button') {
        updateButtonPosition(changedShape.id, changedShape.x, changedShape.y);
      } else if (changedShape.type === 'text') {
        updateTextPosition(changedShape.id, changedShape.x, changedShape.y);}

      // Update the resizing box position directly for 'input' type
      if (shape.type === 'input') {
        resizingBoxRef.current.style.left = `${updatedShape.x}px`;
        resizingBoxRef.current.style.top = `${updatedShape.y}px`;
        resizingBoxRef.current.style.width = `${updatedShape.width}px`;
        resizingBoxRef.current.style.height = `${updatedShape.height}px`;
      } else if(shape.type === 'text') {
        resizingBoxRef.current.style.left = `${updatedShape.x}px`;
        resizingBoxRef.current.style.top = `${updatedShape.y}px`;
        resizingBoxRef.current.style.width = `${updatedShape.width}px`;
        resizingBoxRef.current.style.height = `${updatedShape.height}px`;
      }
    });
  }
};

// Handle mouse up events on the canvas
const handleMouseUp = () => {
  setResizing(false);
  setDragging(false);
};

  // Handle height change for a shape
const handleHeightChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newHeight = parseFloat(e.target.value);
    if (!isNaN(newHeight)) {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, height: newHeight } : shape
      );
      setShapes(updatedShapes);
      let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputHeight(updatedShape.id, updatedShape.height);} 
      else if (updatedShape.type === 'button') {
        updateButtonHeight(updatedShape.id, updatedShape.height);
      }

    }
  }
};

  // Handle width change for a shape
const handleWidthChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newWidth = parseFloat(e.target.value);
    if (!isNaN(newWidth)) {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, width: newWidth } : shape
      );
      setShapes(updatedShapes);
      let updatedShape = updatedShapes[selectedShapeIndex];
            if (updatedShape.type === 'input') {
      updateInputWidth(updatedShape.id, updatedShape.height);} 
      else if (updatedShape.type === 'button') {
        updateButtonWidth(updatedShape.id, updatedShape.height);
      }
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
      let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputStrokeWidth(updatedShape.id, updatedShape.strokeWidth);}
      else if (updatedShape.type === 'button') {
        updateButtonStrokeWidth(updatedShape.id, updatedShape.strokeWidth);}

    }
  }
};    

const handleStrokeColorChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newColor = e.target.value;
    if (newColor!== "") {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, strokeColor: newColor } : shape
      );
      setShapes(updatedShapes);
      let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputStrokeColor(updatedShape.id, updatedShape.strokeColor);}
      else if (updatedShape.type === 'button') {
        updateButtonStrokeColor(updatedShape.id, updatedShape.strokeColor);}
    }
  }
};    

const handleFillStyleColorChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newColor = e.target.value;
    if (newColor!== "") {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, fillStyleColor: newColor } : shape
      );
      setShapes(updatedShapes);
      let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputFillStyleColor(updatedShape.id, updatedShape.fillStyleColor);}
      else if (updatedShape.type === 'button') {
        updateButtonFillStyleColor(updatedShape.id, updatedShape.fillStyleColor);}
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
      let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputBorderSides(updatedShape.id, updatedShape.borderSides);}
      else if (updatedShape.type === 'button') {
        updateButtonBorderSides(updatedShape.id, updatedShape.borderSides);}
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
        let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputBorderSides(updatedShape.id, updatedShape.borderSides);}
      else if (updatedShape.type === 'button') {
        updateButtonBorderSides(updatedShape.id, updatedShape.borderSides);}
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
        let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputBorderSides(updatedShape.id, updatedShape.borderSides);}
      else if (updatedShape.type === 'button') {
        updateButtonBorderSides(updatedShape.id, updatedShape.borderSides);}
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
        let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputBorderSides(updatedShape.id, updatedShape.borderSides);}
      else if (updatedShape.type === 'button') {
        updateButtonBorderSides(updatedShape.id, updatedShape.borderSides);}
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
      let updatedShape = updatedShapes[selectedShapeIndex];
      if (updatedShape.type === 'input') {
      updateInputBorderRadius(updatedShape.id, updatedShape.borderRadius);}
      else if (updatedShape.type === 'button') {
        updateButtonBorderRadius(updatedShape.id, updatedShape.borderRadius);}
    }
    }
};    

const handleResizeMouseDown = (e) => {
    const resizingEdgeElement = e.target.closest('[data-resize]');
    const resizingEdge = resizingEdgeElement ? resizingEdgeElement.dataset.resize : null;

    if (resizingEdge) {
        setResizingEdge(resizingEdge);
        setResizing(true);
        e.stopPropagation();
    }

    const isOverCanvas = isCursorOverCanvasBorder(canvasRef, e);

    if (isOverCanvas.bottomBorder) {
      if (dragStartY === null) {
            setDragStartY(e.pageY);
        }
        setBottomBorder(true);}
   else if (isOverCanvas.rightBorder) {
      if (dragStartX === null) {
            setDragStartX(e.pageX);
        }
        setRightBorder(true);}
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
    let changedShape = newShapes[selectedShapeIndex]
  if (changedShape.type === 'input') {
    updateInputSize(changedShape.id, changedShape.height, changedShape.width);
  }
  else if (changedShape.type === 'button') {
    updateButtonSize(changedShape.id, changedShape.height, changedShape.width);
};}

if (bottomBorder) {
  console.log("test")
  const { pageY } = e;
  const deltaY = pageY - dragStartY;
  setCanvasHeight(prevHeight => prevHeight + deltaY);
  console.log("deltaY:", deltaY);
  updateCanvasHeight("56d78396-6f2d-4dbd-b332-848967e6760d", canvasHeight);
  setDragStartY(pageY);

} 
    // Right border resizing
    else if (rightBorder) {
      console.log("right border")
        const { pageX } = e;
        let deltaX = pageX - dragStartX;
        setCanvasWidth(prevWidth => prevWidth + deltaX); 
        updateCanvasWidth("56d78396-6f2d-4dbd-b332-848967e6760d", canvasWidth);
        setDragStartX(pageX);
    }
}



const handleResizeMouseUp = () => {
  setResizingEdge(null);
  setResizing(false);
  setTopBorder(false)
  setBottomBorder(false)
  setRightBorder(false)
  setDragStartY(null)
  setDragStartX(null)
};

const handleDeleteShape = () => {
  if (selectedShapeIndex !== null) {
    let deletedShape = shapes[selectedShapeIndex];
    const updatedShapes = shapes.filter((shape, index) => index !== selectedShapeIndex);
    if(deletedShape.type === "input") {deleteInput(deletedShape.id);}
    else if (deletedShape.type === "button") {
      deleteButton(deletedShape.id);
    } else if (deletedShape.type === "text") {
      deleteText(deletedShape.id);
    }
    setShapes(updatedShapes) 
    setSelectedShapeIndex(null); // Deselect the shape after deleting
    
  }
};  

const handlePlaceholderTextChange = (e) => {
  const updatedShapes = shapes.map((shape, index) =>
    index === selectedShapeIndex ? { ...shape, placeholderText: e.target.value } : shape
  );
  setShapes(updatedShapes);
  let updatedShape = updatedShapes[selectedShapeIndex];
  if (updatedShape.type === 'input') {
  updateInputPlaceholderText(updatedShape.id, updatedShape.placeholderText);}
  else if (updatedShape.type === 'button') {
    updateButtonText(updatedShape.id, updatedShape.placeholderText);
} else if (updatedShape.type === 'text') {
    updateTextPlaceholderText(updatedShape.id, updatedShape.placeholderText);

}
};

const handlePlaceholderTextFontChange = (e) => {
  const updatedShapes = shapes.map((shape, index) =>
    index === selectedShapeIndex ? { ...shape, placeholderTextFont: e.target.value } : shape
  );
  setShapes(updatedShapes);
  let updatedShape = updatedShapes[selectedShapeIndex];
  if (updatedShape.type === 'input') {
    updateInputPlaceholderTextFont(updatedShape.id, updatedShape.placeholderTextFont);
  } else if (updatedShape.type === 'button') {
    updateButtonText(updatedShape.id, updatedShape.placeholderTextFont);
  } else if (updatedShape.type === 'text') {
    updateTextPlaceholderTextFont(updatedShape.id, updatedShape.placeholderTextFont);
  }
}; 

const handlePlaceholderTextSizeChange = (e) => {
  const newSize = parseInt(e.target.value, 10);
  const updatedShapes = shapes.map((shape, index) =>
    index === selectedShapeIndex ? { ...shape, placeholderTextSize: newSize } : shape
  );
  setShapes(updatedShapes);
  let updatedShape = updatedShapes[selectedShapeIndex];
  if (updatedShape.type === 'input') {
    updateInputPlaceholderTextSize(updatedShape.id, updatedShape.placeholderTextSize);
  } else if (updatedShape.type === 'button') {
    updateButtonText(updatedShape.id, updatedShape.placeholderTextSize);
  } else if (updatedShape.type === 'text') {
    updateTextPlaceholderTextSize(updatedShape.id, updatedShape.placeholderTextSize);}
};   
  
const handlePlaceholderTextStyleChange = (e) => {
  if (selectedShapeIndex !== null) {
    const newColor = e.target.value;
    if (newColor!== "") {
      const updatedShapes = shapes.map((shape, index) =>
        index === selectedShapeIndex ? { ...shape, placeholderTextFillStyle: newColor } : shape
      );
      setShapes(updatedShapes);
      let updatedShape = updatedShapes[selectedShapeIndex];
 if (updatedShape.type === 'text') {
    updateTextPlaceholderTextStyle(updatedShape.id, updatedShape.placeholderTextFillStyle);}
    }
  }
};     
  
    

// Add global mouse up event listener  
useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);  

// Add global keydown event listener to handle shape deletion
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


// Return all the handler functions
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
    handlePlaceholderTextFontChange, 
    handlePlaceholderTextSizeChange,
    handlePlaceholderTextStyleChange
    
  
  };
};