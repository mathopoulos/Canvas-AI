import React from 'react';
import '/src/App.css';
import RightTopNavigation from './RightTopNavigation';
import AppNavigation from './AppNavigation';

export default function TopNavigation() {
  
  return (
    <div className= "topDiv">
      <AppNavigation />
      <RightTopNavigation />
    </div>

  );
}