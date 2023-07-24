// Import necessary modules and components
import React from 'react';
import '/src/App.css';
import RightTopNavigation from './RightTopNavigation';
import AppNavigation from './AppNavigation';

// Define the TopNavigation functional component
export default function TopNavigation(props) {
  // Destructure the shapes prop
  const { shapes } = props;

  // Render the component
  return (
    <div className= "topDiv">
      <AppNavigation shapes={shapes}/>
      <RightTopNavigation />
    </div>

  );
}