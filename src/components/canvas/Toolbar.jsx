import React from 'react';
import '/src/App.css';

// Toolbar component: Displays a set of tools/icons that allow the user to select different shapes.
function Toolbar({ setShape }) {
  
  return (
    <div id = "toolpanel">
      <div id="icons">
      <button className="toolpanelButtons" onClick={() => setShape('circle')}  ><img src="images/cursor-icon.svg" alt="box-icon" /></button>
      <button className="toolpanelButtons" onClick={() => setShape('circle')}><img src="images/hand.svg" alt="box-icon" /></button>
      <img className="lineImageBottom" src="images/line.svg" alt="box-icon" />
      <button className="toolpanelButtons" onClick={() => setShape('text')}><img src="images/text.svg" alt="box-icon" /></button>
      <button className="toolpanelButtons" onClick={() => setShape('button')}><img src="images/form.png" alt="box-icon" /></button>
      <button className="toolpanelButtons" onClick={() => setShape('input')}><img src="images/input-search.svg" alt="box-icon" /></button>
        <button className="toolpanelButtons" onClick={() => setShape('group')}><img src="images/groups.svg" alt="box-icon" /></button>
      <button className="toolpanelButtons" id='chevron' onClick={() => setShape('circle')}><img src="images/chevron-up.svg" alt="box-icon" /></button>
</div>
    </div>
  );
}

export default Toolbar;
