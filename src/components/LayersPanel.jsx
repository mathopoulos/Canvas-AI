import React, { useState, useEffect } from 'react';
import Canvas from './Canvas.jsx';
import '/src/App.css';

export default function LayersPanel({ shapes, setSelectedShapeIndex }) { // added setSelectedShapeIndex as prop
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    setLayers(shapes);
  }, [shapes]);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('text/plain');
    const updatedLayers = [...layers];
    const [draggedLayer] = updatedLayers.splice(draggedIndex, 1);
    updatedLayers.splice(index, 0, draggedLayer);
    setLayers(updatedLayers);

    setSelectedShapeIndex(index); // set the selectedShapeIndex to the dropped index
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="layersPanel">
        <label id="layersTitle">Layers</label>
        <div id="layersLine"></div>
        <div id="layers" style={{ padding: '10px 0px 0px 0px' }}>
          {layers.map((shape, index) => (
            <div
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDrop={(event) => handleDrop(event, index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 5px 5px 20px',
                backgroundColor: 'transparent',
                cursor: 'move'
              }}
            >
              <img src="images/layerIcon.svg" style={{ marginRight: '5px' }} /> {shape.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}