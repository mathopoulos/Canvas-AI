import React from 'react';
import '/src/App.css';
import RightTopNavigation from './RightTopNavigation';
import AppNavigation from './AppNavigation';

export default function TopNavigation(props) {
  const { shapes } = props;
  
  return (
    <div className= "topDiv">
      <AppNavigation shapes={shapes}/>
      <RightTopNavigation />
    </div>

  );
}