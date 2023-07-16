import React, { useState, useEffect } from 'react';
import Canvas from '/src/components/canvas/Canvas.jsx';
import {getAllComponentsNameAndId, getComponent} from '/src/components/graphql/queries.jsx';
import '/src/App.css';

export default function LayersPanel({ shapes, setSelectedShapeIndex, setShapes, components, setComponents}) { 
  const [layers, setLayers] = useState([]);
const [activePanel, setActivePanel] = useState('layers'); // 'layers' or 'components'

useEffect(() => {
  setLayers(shapes);
  
const fetchComponents = async () => {
      try {
        const response = await getAllComponentsNameAndId();
        console.log("Response: ", response); // log the entire response
        setComponents(response.components); // Update the components state in the parent component
        console.log("Components: ", components); // log the components state after setting it
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchComponents();
  }, [shapes, setComponents]);

useEffect(() => {
}, [components]);

useEffect(() => {
    console.log(`Active Panel: ${activePanel}`);
  }, [activePanel]);



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


const toggleVisibility = (type) => {
    setActivePanel(type);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="layersPanel">
        <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
        <label id="layersTitle" onClick={() => toggleVisibility('layers')} style={{ opacity: activePanel === 'layers' ? 1.0 : 0.3 }}>
          Layers
        </label>
        <label id="componentsTitle" onClick={() => toggleVisibility('components')} style={{ opacity: 
 activePanel === 'components' ? 1.0 : 0.3 }}>
          Components
        </label>
        <img src="images/plus.svg" style={{width: '20px', marginLeft: '10px', opacity: 1.0, display: activePanel === 'components' ? 'block' : 'none' }} />
        </div>
        <div id="layersLine"></div>
        <div id="layers" style={{ padding: '10px 0px 0px 0px', display: activePanel === 'layers' ? 'block' : 'none' }}>
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
        <div id="components" style={{padding: '10px 0px 0px 0px', display: activePanel === 'components' ? 'block' : 'none' }}>
{components.map((component) => (
          <div
            key={component.id} // using component id as key
            draggable
            onDragStart={(event) => handleDragStart(event, component.id)}
            onDragOver={(event) => handleDragOver(event, component.id)}
            onDrop={(event) => handleDrop(event, component.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 5px 5px 20px',
              backgroundColor: 'transparent',
              cursor: 'move'
            }}
          >
              <img src="images/layerIcon.svg" style={{ marginRight: '5px' }} /> {component.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

