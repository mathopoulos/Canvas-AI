import React, { useState, useEffect } from 'react';
import Canvas from '/src/components/canvas/Canvas.jsx';
import '/src/App.css';

export default function LayersPanel({ shapes, setSelectedShapeIndex, setShapes }) { 
  const [layers, setLayers] = useState([]);
  const [showLayers, setShowLayers] = useState(true); // state to track the visibility of layers
  const [showComponents, setShowComponents] = useState(false); // state to track the visibility of components

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
    const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
    const updatedLayers = [...layers];
    const [draggedLayer] = updatedLayers.splice(draggedIndex, 1);
    updatedLayers.splice(index, 0, draggedLayer);
    setLayers(updatedLayers);
    setShapes(updatedLayers);

    setSelectedShapeIndex(index);
  };

  // function to toggle visibility of layers and components
  const toggleVisibility = (type) => {
    if (type === 'layers') {
      console.log(showLayers);
      console.log(showComponents);
      setShowLayers(true);
      setShowComponents(false);
    } else if (type === 'components') {
      console.log(showLayers);
      console.log(showComponents);
      setShowLayers(false);
      setShowComponents(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="layersPanel">
        <label id="layersTitle" onClick={() => toggleVisibility('layers')} style={{ opacity: showLayers ? 1.0 : 0.3 }}>
          Layers
        </label>
        <label id="componentsTitle" onClick={() => toggleVisibility('components')} style={{ opacity: showComponents ? 1.0 : 0.3 }}>
          Components
        </label>
        <div id="layersLine"></div>
        <div id="layers" style={{ padding: '10px 0px 0px 0px', display: showLayers ? 'flex' : 'none' }}>
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
        <div id="components" style={{ padding: '10px 0px 0px 0px', display: showComponents ? 'flex' : 'none' }}>

        </div>
      </div>
    </div>
  );
}
