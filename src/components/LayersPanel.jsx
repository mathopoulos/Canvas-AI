import React from 'react';
import Canvas from './Canvas.jsx';
import '/src/App.css';

export default function LayersPanel({ shapes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="layersPanel">
        <label id="layersTitle">Layers</label>
        <div id="layersLine"></div>
        <div id="layersContent">
        {shapes.map((shape, index) => (
          <div key={index} style={{ padding: '10px 5px 5px 20px' }}>{shape.name}</div>
        ))}
          </div>
      </div>
    </div>
  );
}