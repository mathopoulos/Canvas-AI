import React, { useRef, useState, useEffect } from 'react';
import '/src/components/navigation/Switcher.css';


export default function Switcher(props) {
  // Destructure shapes from props
  const {selected} = props;

    // State to track the button click
  const [isDoodleButtonClicked, setDoodleButtonClicked] = useState(false);

    // Function to handle button click
  const handleDoodleButtonClick = () => {
    setDoodleButtonClicked(true);
  }


  // Render the component
  return (
    <div className = "navigation">
      <div className="advancedMenuNavigation">
        <img className ="advancedMenuNavigationIcon" src="/images/view-list.svg" alt="box-icon" style={{ userSelect: 'none' }}  />
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



