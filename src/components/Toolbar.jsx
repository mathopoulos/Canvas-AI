import React from 'react';
import '/src/App.css';


function Toolbar({ setShape }) {
  return (
    <div id = "toolpanel">
      <div id="icons">
      <button onClick={() => setShape('circle')}><img src="images/cursor-icon.svg" alt="box-icon" /></button>
      <button onClick={() => setShape('circle')}><img src="images/hand.svg" alt="box-icon" /></button>
      <img id="lineImageBottom" src="images/line.svg" alt="box-icon" />
      <button onClick={() => setShape('circle')}><img src="images/text.svg" alt="box-icon" /></button>
      <button onClick={() => setShape('circle')}><img src="images/shapes.png" alt="box-icon" /></button>
      <button onClick={() => setShape('circle')}><img src="images/form.png" alt="box-icon" /></button>
      <button onClick={() => setShape('square')}><img src="images/box-icon.png" alt="box-icon" /></button>
      <button onClick={() => setShape('input')}><img src="images/input-search.svg" alt="box-icon" /></button>
      <button onClick={() => setShape('circle')}><img src="images/chevron-up.svg" alt="box-icon" /></button>
</div>
    </div>
  );
}

export default Toolbar;
