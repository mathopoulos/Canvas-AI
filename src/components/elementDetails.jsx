import React from 'react';
import Canvas from './Canvas.jsx';
import '/src/App.css';

const SizeSection = ({ selectedShape, onHeightChange, onWidthChange }) => (
  <div className="section">
    <label id="positionTitle">Size</label>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="height">Height</label>
      <div id="xInputWrapper">
        <input 
          type="text" 
          id="height" 
          name="xValue" 
          value={selectedShape ? selectedShape.height : ''} 
          onChange={onHeightChange} />
      </div>
    </div>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="width">Width</label>
      <div id="xInputWrapper">
        <input type="text" id="width" name="xValue" value={selectedShape ? selectedShape.width : ''}
          onChange={onWidthChange} />
      </div>
    </div>
  </div>
);

const BorderSection = ({ selectedShape, onStrokeWidthChange, onStrokeColorChange, onBorderRadiusChange, onLeftBorderChange, onRightBorderChange, onTopBorderChange, onBottomBorderChange }) => (
  <div className="section2">
    <label id="positionTitle">Border</label>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="strokeWidth">Stroke</label>
      <div id="xInputWrapper">
        <input 
          type="text" 
          id="strokeWidth" 
          name="xValue" 
          value={selectedShape ? selectedShape.strokeWidth : ''} 
          onChange={onStrokeWidthChange} />
      </div>
    </div>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="colorPicker">Color</label>
      <div id="xInputWrapper">
        <input 
          type="color" 
          id="colorPicker" 
          value={selectedShape ? selectedShape.strokeColor : ''} 
          onChange={onStrokeColorChange} />
      </div>
    </div>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="borderRadius">Radius</label>
      <div id="xInputWrapper">
        <input 
          type="text" 
          id="borderRadius" 
          name="xValue" 
          value={selectedShape ? selectedShape.borderRadius : ''} 
          onChange={onBorderRadiusChange} />
      </div>
    </div>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="borderSides">Sides</label>
      <div id="sideIcons">
        <button id="toolpanelButtons2" onClick={() => onLeftBorderChange()}><img id="toolpanelButtons3" src="images/Left.svg" alt="box-icon" /></button>
        <button id="toolpanelButtons2" onClick={() => onRightBorderChange()}><img id="toolpanelButtons3" src="images/Right.svg" alt="box-icon" /></button>
      </div>
      <div id="sideIcons2">
        <button id="toolpanelButtons2" onClick={() => onTopBorderChange()} ><img id="toolpanelButtons3" src="images/Top.svg" alt="box-icon" /></button>
        <button id="toolpanelButtons2" onClick={() => onBottomBorderChange()}><img id="toolpanelButtons3" src="images/Bottom.svg" alt="box-icon" /></button>
     
      </div>
    </div>
  </div>
);

const BackgroundSection = ({ selectedShape, onFillStyleColorChange }) => (
  <div className="section3">
    <label id="positionTitle">Background</label>
    <div id="xInputDiv">
      <label id = "xLabel" htmlFor="colorPicker">Color</label>
      <div id="xInputWrapper">
        <input 
          type="color" 
          id="colorPicker" 
          value={selectedShape ? selectedShape.fillStyleColor : ''} 
          onChange={onFillStyleColorChange} />
      </div>
    </div>
  </div>
);

function ElementDetails({ selectedIndex, shapes, ...rest }) {
  const selectedShape = selectedIndex !== null ? shapes[selectedIndex] : null;

  return (
    <div id="colorPickerPanel">
      <div id="searchArea">
        <input type="text" id="search" value="Search" />
      </div>
      <SizeSection selectedShape={selectedShape} {...rest} />
      <BorderSection selectedShape={selectedShape} {...rest} />
      <BackgroundSection selectedShape={selectedShape} {...rest} />
    </div>
  );
}

export default ElementDetails;
