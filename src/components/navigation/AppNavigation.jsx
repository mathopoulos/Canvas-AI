// Import necessary modules and components
import React from 'react';
import '/src/App.css';
import {syncCodeFunction} from '/src/components/helpers.jsx';

// Define the AppNavigation functional component
export default function AppNavigation(props) {
  // Destructure shapes from props
  const { shapes } = props;

  // Define the event handler for the export button click
  const handleExportClick = (event) => {
    event.preventDefault(); // Prevent default behavior of the event

    syncCodeFunction();} // Call the function to synchronize code

  // Render the component
  return (
      <div className="titleDiv">
        <img id="titleImage" src="/images/view-list.svg" alt="box-icon" style={{ userSelect: 'none' }}  />
        <img id="lineImage" src="/images/line.svg" alt="box-icon" style={{ userSelect: 'none' }} />
        <h3 id="title">Component Builder</h3>
        <div className="dropdown-top">
          <button className="dropbtn-top"><img id="downImage" src="/images/down.svg" alt="box-icon" /></button>
          <div className="topNav-dropdown-content">
            <div id="exportButton" onClick={handleExportClick} >Export Code</div>
          </div>
        </div>
      </div>
  );
}


