// Importing necessary modules and components
import React, { useRef, useState, useEffect } from 'react';
import Toolbar from '/src/components/canvas/Toolbar.jsx';
import TopNavigation from '/src/components/navigation/TopNavigation';

// Drawing components for different shapes
import { drawSquare } from '/src/components/drawingComponents/Square.jsx';
import { drawCircle } from '/src/components/drawingComponents/Circle.jsx';
import { drawInput } from '/src/components/drawingComponents/Input.jsx';
import { drawShapes } from '/src/components/drawingComponents/shapeDrawing.jsx';

// Helper functions for canvas interactions
import { findShapeUnderCursor, createNewShape } from '/src/components/helpers.jsx';

// GraphQL queries to fetch data
import {getAllInputsOfComponent, getAllButtonsOfComponent, getAllTextsOfComponent, getGroupsOfComponent } from '/src/components/graphql/queries.jsx';

// Components for displaying details and layers
import ElementDetails from '/src/components/canvas/elementDetails.jsx';
import LayersPanel from '/src/components/canvas/LayersPanel.jsx';
import { updateResizingBox, updateCursor } from '/src/components/helpers.jsx';

// Custom hooks for canvas interactions and updates
import { useCanvasInteraction } from '/src/components/canvas/useCanvasInteraction.jsx';
import { useCanvasUpdate } from '/src/components/canvas/useCanvasUpdate.jsx';

// Components representing different elements on the canvas
import { ResizingBox, CanvasElement } from '/src/components/canvas/CanvasElements.jsx';

import {getCanvas} from '/src/components/graphql/queries.jsx';
import {FocusedButton} from '/src/components/canvas/hoversState.jsx';


function Canvas() {
  // References to canvas and resizing box elements
  const canvasRef = useRef(null);
  const resizingBoxRef = useRef(null);

  // State variables for managing shapes, components, and interactions
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [canvasSelected, setCanvasSelected] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState('input');
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(300);
  const [canvasWidth, setCanvasWidth] = useState(510);
  const[canvasTop, setCanvasTop] = useState(150);
  const[canvasLeft, setCanvasLeft] = useState(320);
  const [initialOffsetX, setInitialOffsetX] = useState(null);

  // Destructuring methods from custom hook for canvas interactions
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
    handlePlaceholderTextChange, 
    handlePlaceholderTextFontChange,
    handlePlaceholderTextSizeChange,
    handlePlaceholderTextStyleChange,
    handleCanvasResize
  } = useCanvasInteraction(canvasRef, resizingBoxRef, shapes, setShapes, shapeType, setShapeType, selectedShapeIndex, setSelectedShapeIndex, selectedComponent, canvasSelected, setCanvasSelected, canvasHeight, setCanvasHeight, canvasTop, setCanvasTop, canvasLeft, setCanvasLeft, canvasWidth, setCanvasWidth);

  useEffect(() => {
    async function fetchCanvas() {
        const canvasData = await getCanvas("56d78396-6f2d-4dbd-b332-848967e6760d");
      console.log(canvasData);
        if (canvasData) {
            setCanvasHeight(canvasData.height);
            setCanvasTop(canvasData.top);
            setCanvasLeft(canvasData.left);
            setCanvasWidth(canvasData.width);
        }
    }
    fetchCanvas();
}, []);


  // Fetching shapes data when a component is selected  
useEffect(() => {
    if (selectedComponent !== null) {
      Promise.all([
        getAllInputsOfComponent(selectedComponent),
        getAllButtonsOfComponent(selectedComponent),
        getAllTextsOfComponent(selectedComponent),
        getGroupsOfComponent(selectedComponent),
      ]).then(([inputsResponse, buttonsResponse, textsResponse, groupsResponse]) => {
        const inputsData = inputsResponse.inputsByComponent;
        const buttonsData = buttonsResponse.buttonsByComponent;
        const textsData = textsResponse.textsByComponent;
        const groupsData = groupsResponse.groupsByComponent;
        const shapesData = [...inputsData, ...buttonsData, 
 ...textsData,...groupsData];
        setShapes(shapesData);
        console.log(shapesData);
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
    window.addEventListener('mouseup', handleResizeMouseUp);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleDeleteShape]);


  useCanvasUpdate(canvasRef, resizingBoxRef, shapes, selectedShapeIndex, canvasHeight, canvasWidth);



  return (
    <div>
      <TopNavigation shapes={shapes} />
      <Toolbar setShape={setShapeType} />
      <div style={{ position: 'relative', width: `${canvasWidth}px`, height: `${canvasHeight}px`, border: '1px solid grey', borderRadius: '10px', left: '320px', top: `${canvasTop}px` }} onMouseMove={(e) => {
    updateCursor(resizingBoxRef, e);
    handleResizeMouseMove(e);
  }}
  onMouseDown={handleResizeMouseDown}
  onMouseUp={handleResizeMouseUp}>
        <FocusedButton canvasHeight={canvasHeight} canvasWidth={canvasWidth} canvasTop={canvasTop} canvasLeft={canvasLeft} />

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
      <ElementDetails selectedIndex={selectedShapeIndex} shapes={shapes} onHeightChange={handleHeightChange} onWidthChange={handleWidthChange} onStrokeWidthChange={handleStrokeWidthChange} onStrokeColorChange={handleStrokeColorChange} onBorderRadiusChange={handleBorderRadiusChange} onFillStyleColorChange={handleFillStyleColorChange} onLeftBorderChange={handleLeftBorderChange} onRightBorderChange={handleRightBorderChange} onTopBorderChange={handleTopBorderChange} onBottomBorderChange={handleBottomBorderChange} onPlaceholderTextChange={handlePlaceholderTextChange} onPlaceholderTextFontChange={handlePlaceholderTextFontChange} onPlaceholdertextSizeChange = {handlePlaceholderTextSizeChange} onPlaceholderTextStyleChange = {handlePlaceholderTextStyleChange} onCanvasResize={handleCanvasResize}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}/>
    </div>
  );
}

export default Canvas;
