import React from 'react';
import Canvas from './Canvas.jsx';
import '/src/App.css';

export default function LayersPanel({ shapes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="layersPanel">
        <label id="layersTitle">Layers</label>
        <div id="layersLine"></div>
        <div id="layers" style={{padding:'10px 0px 0px 0px' }}>
        {shapes.map((shape, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", padding: '10px 5px 5px 20px' }}>
            <img src="images/layerIcon.svg" style={{ marginRight: "5px" }} /> {shape.name}
          </div>
        ))}
          </div>
      </div>
    </div>
  );
}