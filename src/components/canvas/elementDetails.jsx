import React, { useState, useEffect } from 'react';
import Canvas from '/src/components/canvas/Canvas.jsx';
import '/src/App.css';

// SizeSection component: Displays input fields to adjust the size of a shape.
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

// PlaceholderTextSection component: Displays input field to adjust the placeholder text of a shape.
const PlaceholderTextSection = ({ selectedShape, onPlaceholderTextChange, onPlaceholderTextFontChange, onPlaceholdertextSizeChange, onPlaceholderTextStyleChange}) => (
  <div className="section4">
    <label id="positionTitle">Placeholder</label>
    <div id="xInputDiv">
      <label id="placeholderTextLabel" htmlFor="placeholderText">Text</label>
      <div id="xInputWrapper">
        <input
          type="text"
          id="placeholderText"
          name="xValue"
          value={selectedShape ? selectedShape.placeholderText : ''}
          onChange={onPlaceholderTextChange} />
      </div>
    </div>
    <div id="xInputDiv">
      <label id="placeholderTextLabel" htmlFor="placeholderText">Font</label>
<div id="xInputWrapper">
  <select name="fontSelection" id="placeholderText" onChange={onPlaceholderTextFontChange} value={selectedShape ? selectedShape.placeholderTextFont : ''}>
    <option value="ariel">Ariel</option>
    <option value="times new roman">Times New Roman</option>
  </select>
      </div>
    </div>
    <div id="xInputDiv">
      <label id="placeholderTextLabel" htmlFor="placeholderText">Size</label>
      <div id="xInputWrapper">
        <input
          type="number"
          id="placeholderText"
          name="xValue"
          value={selectedShape ? selectedShape.placeholderTextSize : ''}
          onChange={onPlaceholdertextSizeChange} />
      </div>
    </div>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="colorPicker">Color</label>
      <div id="xInputWrapper">
        <input
          type="color"
          id="colorPicker"
          value={selectedShape ? selectedShape.placeholderTextFillStyle : ''}
          onChange={onPlaceholderTextStyleChange} />
      </div>
    </div>
  </div>
);

// BorderSection component: Displays input fields and buttons to adjust the border properties of a shape.
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
          value={selectedShape ? selectedShape.strokeWidth : ''} onChange={onStrokeWidthChange} />
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

// BackgroundSection component: Displays input field to adjust the background color of a shape.
const BackgroundSection = ({ selectedShape, onFillStyleColorChange }) => (
  <div className="section3">
    <label id="positionTitle">Background</label>
    <div id="xInputDiv">
      <label id="xLabel" htmlFor="colorPicker">Color</label>
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


// ElementDetails component: Displays a panel with various sections to adjust properties of a selected shape.
function ElementDetails({ selectedIndex, shapes, ...rest }) {
  const [selectedSections, setSelectedSections] = useState([]);
  const [filter, setFilter] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const selectedShape = selectedIndex !== null ? shapes[selectedIndex] : null;

  const options = [
    { value: 'size', label: 'Size' },
    { value: 'border', label: 'Border' },
    { value: 'background', label: 'Background' },
    { value: 'placeholder', label: 'Placeholder' },
  ];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    setSelectedSections(prev => {
      if (prev.includes(value)) {
        return prev.filter(section => section !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div id="colorPickerPanel">
      <div className="dropdown">
        <input
          type="text"
          className="dropdown-input"
          placeholder="Search"
          value={filter}
          onChange={handleFilterChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
        />
        {dropdownVisible && (
          <div className="dropdown-content" onMouseDown={e => e.preventDefault()}>
            {filteredOptions.map(option => (
              <label key={option.value} className="dropdown-item">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedSections.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>
      {selectedSections.includes('size') && <SizeSection selectedShape={selectedShape} {...rest} />}
      {selectedSections.includes('border') && <BorderSection selectedShape={selectedShape} {...rest} />}
      {selectedSections.includes('background') && <BackgroundSection selectedShape={selectedShape} {...rest} />}
      {selectedSections.includes('placeholder') && <PlaceholderTextSection selectedShape={selectedShape} {...rest} />}
    </div>
  );
}

export default ElementDetails;