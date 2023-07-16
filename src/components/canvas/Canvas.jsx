import React, { useRef, useState, useEffect } from 'react';
import Toolbar from '/src/components/canvas/Toolbar.jsx';
import TopNavigation from '/src/components/navigation/TopNavigation';
import { drawSquare } from '/src/components/drawingComponents/Square.jsx';
import { drawCircle } from '/src/components/drawingComponents/Circle.jsx';
import { drawInput } from '/src/components/drawingComponents/Input.jsx';
import { drawShapes } from '/src/components/drawingComponents/shapeDrawing.jsx';
import { findShapeUnderCursor, createNewShape} from '/src/components/helpers.jsx';
import {getAllInputs, getAllInputsOfComponent} from '/src/components/graphql/queries.jsx';
import ElementDetails from '/src/components/canvas/elementDetails.jsx';
import LayersPanel from '/src/components/canvas/LayersPanel.jsx';
import { updateResizingBox, updateCursor } from '/src/components/helpers.jsx';
import { useCanvasInteraction } from '/src/components/canvas/useCanvasInteraction.jsx';
import { useCanvasUpdate } from '/src/components/canvas/useCanvasUpdate.jsx';
import { ResizingBox, CanvasElement } from '/src/components/canvas/CanvasElements.jsx';



function Canvas() {
  const canvasRef = useRef(null);
  const resizingBoxRef = useRef(null);
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState('input');
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [initialOffsetX, setInitialOffsetX] = useState(null);
  
  const {
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
  handlePlaceholderTextChange
} = useCanvasInteraction(canvasRef, resizingBoxRef, shapes, setShapes, shapeType, setShapeType, selectedShapeIndex, setSelectedShapeIndex, selectedComponent);
  
useEffect(() => {
    if(selectedComponent !== null) {
      getAllInputsOfComponent(selectedComponent).then((response) => {
        const shapesData = response.inputsByComponent;
        setShapes(shapesData);
      });  
    }
}, [selectedComponent]); 

  

useEffect(() => {
  window.addEventListener('mouseup', handleMouseUp);
  return () => {
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, []);

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
  }, [handleDeleteShape]);  


useCanvasUpdate(canvasRef, resizingBoxRef, shapes, selectedShapeIndex);



return (
  <div>
    <TopNavigation shapes={shapes}/>
    <Toolbar setShape={setShapeType} />
    <div style={{ position: 'relative', width: '310px', height: '100px', border: '1px solid grey', borderRadius: '10px', left: '320px', top: '150px' }} onMouseMove={(e) => updateCursor(resizingBoxRef, e)}>
      <CanvasElement
        ref={canvasRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizingBox
        ref={resizingBoxRef}
        onMouseDown={handleResizeMouseDown}
        onMouseMove={handleResizeMouseMove}
        onMouseUp={handleResizeMouseUp}
      />
    </div>
    <LayersPanel 
          shapes={shapes} 
          setShapes={setShapes}
          setSelectedShapeIndex={setSelectedShapeIndex}
      components={components}
  setComponents={setComponents}
      setSelectedComponent={setSelectedComponent}// passing function as prop to LayersPanel component 
        />
    <ElementDetails selectedIndex={selectedShapeIndex} shapes={shapes} onHeightChange={handleHeightChange} onWidthChange={handleWidthChange} onStrokeWidthChange={handleStrokeWidthChange} onStrokeColorChange={handleStrokeColorChange} onBorderRadiusChange={handleBorderRadiusChange} onFillStyleColorChange={handleFillStyleColorChange} onLeftBorderChange={handleLeftBorderChange} onRightBorderChange={handleRightBorderChange} onTopBorderChange={handleTopBorderChange} onBottomBorderChange={handleBottomBorderChange} onPlaceholderTextChange={handlePlaceholderTextChange} />
  </div>
    );
}

export default Canvas;
