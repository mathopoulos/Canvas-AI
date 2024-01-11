// Import necessary modules and components
import React from 'react';
import '/src/App.css';
import RightTopNavigation from './RightTopNavigation';
import AppNavigation from './AppNavigation';
import Switcher from './Switcher';

// Define the TopNavigation functional component
export default function TopNavigation(props) {
  // Destructure the shapes prop
  const { shapes } = props;
  const {setMode} = props;

  // Render the component
  return (
    <div className= "topDiv">
      <Switcher setMode={setMode}/>
      <RightTopNavigation />
    </div>

  );
}