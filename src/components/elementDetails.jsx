import React from 'react';
import Canvas from './Canvas.jsx';

import '/src/App.css';

function ElementDetails({ selectedIndex, shapes , onHeightChange, onWidthChange}) {
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
        <div>
          <input type="color" id="colorPicker" defaultValue="black" />
        </div>
      </div>
    </div>
  );
}

export default ElementDetails;
