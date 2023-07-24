// Importing necessary React module
import React from 'react';

// ResizingBox component: Represents a box with edges that can be dragged to resize an element.
// Uses React's forwardRef to get a reference to the DOM element.
export const ResizingBox = React.forwardRef(({ onMouseDown, onMouseMove, onMouseUp }, ref) => (
  <div
    ref={ref}
    className="resizing-box"
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
  >
    <div className="resize-edge left" data-resize="left"></div>
    <div className="resize-edge right" data-resize="right"></div>
    <div className="resize-edge top" data-resize="top"></div>
    <div className="resize-edge bottom" data-resize="bottom"></div>
  </div>
));

// CanvasElement component: Represents the main canvas where shapes are drawn.
// Uses React's forwardRef to get a reference to the canvas DOM element.
export const CanvasElement = React.forwardRef(({ onClick, onMouseDown, onMouseMove, onMouseUp }, ref) => (
  <canvas
    ref={ref}
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    width="310"
    height="100"
    style={{
      position: 'absolute',
    }}
  />
));
