import React from 'react';
import Canvas from './Canvas.jsx';
import '/src/App.css';

function ElementDetails({ selectedIndex, shapes , onHeightChange, onWidthChange, onStrokeWidthChange, onStrokeColorChange, onBorderRadiusChange, onFillStyleColorChange, onLeftBorderChange, onRightBorderChange, onTopBorderChange, onBottomBorderChange}) {
  const selectedShape = selectedIndex !== null ? shapes[selectedIndex] : null;
  
  return (
    <div id="colorPickerPanel">
      <div id="searchArea">
        <input type="text" id="search" value="Search" />
      </div>
      <div className="section">
        <label id="positionTitle">Size</label>
        <div id="xInputDiv">
          <label id = "xLabel" htmlFor="height">Height</label>
          <div id="xInputWrapper">
            <input 
              type="text" 
              id="height" 
              name="xValue" 
              value={selectedShape ? selectedShape.height : ''} 
              onChange={onHeightChange}/>
          </div>
        </div>
        <div id="xInputDiv">
          <label id = "xLabel" htmlFor="width">Width</label>
          <div id="xInputWrapper">
            <input type="text" id="width" name="xValue" value={selectedShape ? selectedShape.width : ''}
              onChange={onWidthChange}/>
          </div>
        </div>
      </div>
      <div className="section2">
        <label id="positionTitle">Border</label>
        <div id="xInputDiv">
          <label id = "xLabel" htmlFor="height">Stroke</label>
          <div id="xInputWrapper">
            <input 
              type="text" 
              id="strokeWidth" 
              name="xValue" 
              value={selectedShape ? selectedShape.strokeWidth : ''} 
              onChange={onStrokeWidthChange}/>
          </div>
        </div>
        <div id="xInputDiv">
          <label id = "xLabel" htmlFor="width">Color</label>
          <div id="xInputWrapper">
            <input 
              type="color" 
              id="colorPicker" 
              value={selectedShape ? selectedShape.strokeColor : ''} 
              onChange={onStrokeColorChange} />
          </div>
        </div>
                <div id="xInputDiv">
          <label id = "xLabel" htmlFor="height">Radius</label>
          <div id="xInputWrapper">
            <input 
              type="text" 
              id="strokeWidth" 
              name="xValue" 
              value={selectedShape ? selectedShape.borderRadius : ''} 
              onChange={onBorderRadiusChange}/>
          </div>
        </div>
        <div id="xInputDiv">
          <label id = "xLabel" htmlFor="height">Sides</label>
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
            <div className="section3">
        <label id="positionTitle">Background</label>
        <div id="xInputDiv">
          <label id = "xLabel" htmlFor="width">Color</label>
          <div id="xInputWrapper">
            <input 
              type="color" 
              id="colorPicker" 
              value={selectedShape ? selectedShape.fillStyleColor : ''} 
              onChange={onFillStyleColorChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElementDetails;

