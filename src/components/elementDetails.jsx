import React from 'react';
import '/src/App.css';

function ElementDetails() {
  return (
    <div id="colorPickerPanel">
      <div id="searchArea">
        <input type="text" id="search" value="Search" />
      </div>
      <div className="section">
        <label id="positionTitle">Size</label>
        <div id="xInputDiv">
          <label htmlFor="height">Height</label>
          <div id="xInputWrapper">
            <input type="text" id="height" name="xValue" />
          </div>
        </div>
        <div id="xInputDiv">
          <label htmlFor="width">Width</label>
          <div id="xInputWrapper">
            <input type="text" id="width" name="xValue" />
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
