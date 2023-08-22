import React from 'react';
import '/src/components/navigation/Switcher.css';

export default function Switcher(props) {
  // Destructure shapes from props
  const {selected} = props;


  // Render the component
  return (
    <div>
      <div className="switcher">
        <div className="doodle-button">Doodle</div>
        <div className="high-fidelity-button">High Fidelity</div>
        <div className="functional-button">Functional</div>
      </div>
      </div>
    )
}



