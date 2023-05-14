import React, { useRef, useState, useEffect } from 'react';
import Toolbar from './Toolbar.jsx';
import { drawSquare } from './Square.jsx';
import { drawCircle } from './Circle.jsx';
import { drawInput } from './Input.jsx';
import { drawShapes } from './shapeDrawing.jsx';
import { findShapeUnderCursor, createNewShape } from './helpers.jsx';
import ElementDetails from '/src/components/elementDetails.jsx';
import LayersPanel from './LayersPanel.jsx';
import { updateResizingBox, updateCursor } from './helpers.jsx';
import { useCanvasInteraction } from './useCanvasInteraction.jsx';
import { useCanvasUpdate } from './useCanvasUpdate.jsx';
import { ResizingBox, CanvasElement } from './CanvasElements.jsx';



function Canvas() {
  const canvasRef = useRef(null);
  const resizingBoxRef = useRef(null);
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
  handleDeleteShape  
} = useCanvasInteraction(canvasRef, resizingBoxRef, shapes, setShapes, shapeType, setShapeType, selectedShapeIndex, setSelectedShapeIndex);


useEffect(() => {
  window.addEventListener('mouseup', handleMouseUp);
  return () => {
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, []);

useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
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
    <Toolbar setShape={setShapeType} />
    <div style={{ position: 'relative', width: '310px', height: '100px', border: '1px solid grey', borderRadius: '10px', left: '320px', top: '145px' }} onMouseMove={(e) => updateCursor(resizingBoxRef, e)}>
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
          setSelectedShapeIndex={setSelectedShapeIndex}  // passing function as prop to LayersPanel component 
        />
    <ElementDetails selectedIndex={selectedShapeIndex} shapes={shapes} onHeightChange={handleHeightChange} onWidthChange={handleWidthChange} onStrokeWidthChange={handleStrokeWidthChange} onStrokeColorChange={handleStrokeColorChange} onBorderRadiusChange={handleBorderRadiusChange} onFillStyleColorChange={handleFillStyleColorChange} onLeftBorderChange={handleLeftBorderChange} onRightBorderChange={handleRightBorderChange} onTopBorderChange={handleTopBorderChange} onBottomBorderChange={handleBottomBorderChange}/>
    
  </div>
    );
}

export default Canvas;
