import React, { useRef, useState, useEffect } from 'react';
import '/src/components/navigation/Switcher.css';


export default function Switcher(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const handleComponentSwitcherClick = () => {
    setShowDropdown(!showDropdown);
  }

  // State to track the button click
  const [isDoodleButtonClicked, setDoodleButtonClicked] = useState(false);

  // Function to handle button click
  const handleDoodleButtonClick = () => {
    setDoodleButtonClicked(true);
  }


  // Render the component
  return (
    <div className="navigation">
      <div className="advancedMenuNavigation">
        <img className="advancedMenuNavigationIcon" src="/images/view-list.svg" alt="box-icon" style={{ userSelect: 'none' }} />
        <div className="componentSwitcher" onClick={handleComponentSwitcherClick}> First Name <img className="downIcon" src="/images/down.svg" alt="box-icon" /> </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-menu-header">
            <div className="dropdown-menu-content">
              Components
            </div>
            <img className="plusIcon" src="/images/plus.svg" alt="box-icon" /> </div>
            <div className="layersLine"></div>
            {items.map((item, index) => (
              <div className="dropdown-menu-items" key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="images/layerIcon.svg"
                  id="#dragIcon"
                  style={{ marginRight: '5px' }}
                />{item}</div>
            ))}
          </div>
        )}
      </div>
      <div className="modeSwitcher">
        <div className={isDoodleButtonClicked ? 'doodle-button-clicked' : 'doodle-button'}
          onClick={handleDoodleButtonClick}>Doodle</div>
        <div className="high-fidelity-button">High Fidelity</div>
        <div className="functional-button">Functional</div>
      </div>
    </div>
  )
}



