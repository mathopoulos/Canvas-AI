// CanvasElements.jsx
import React from 'react';

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
