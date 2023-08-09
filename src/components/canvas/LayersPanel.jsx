import React, { useState, useEffect } from 'react';
import Canvas from '/src/components/canvas/Canvas.jsx';
import {
  getAllComponentsNameAndId,
  getComponent,
} from '/src/components/graphql/queries.jsx';
import {
  addNewComponent,
  deleteComponent,
  updateComponent
} from '/src/components/graphql/mutations.jsx';
import '/src/App.css';

// LayersPanel component: Displays a panel with layers and components.
export default function LayersPanel({
  shapes,
  setSelectedShapeIndex,
  setShapes,
  components,
  setComponents,
  setSelectedComponent,
}) {

  // State for layers, active panel, and editing components
  const [layers, setLayers] = useState([]);
  const [activePanel, setActivePanel] = useState('layers'); // 'layers' or 'components'
  const [editComponentId, setEditComponentId] = useState(null);
  const [editComponentName, setEditComponentName] = useState("");

  // Effect to set layers and fetch components from the database
  useEffect(() => {
    setLayers(shapes);

    const fetchComponents = async () => {
      try {
        const response = await getAllComponentsNameAndId();
        setComponents(response.components); // Update the components state in the parent component
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchComponents();
  }, [shapes, setComponents]);

  // Empty effects for components and activePanel (might be placeholders for future logic)
  useEffect(() => { }, [components]);
  useEffect(() => { }, [activePanel]);

  // Function to add a new component to the database and update the state
  const addNewComponentToDBAndState = async (componentName) => {
    try {
      // this addNewComponent is the one defined in your mutations.js file
      const newComponent = await addNewComponent(componentName);
      if (newComponent !== null) {
        setComponents((prevComponents) => [...prevComponents, newComponent]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Drag and drop handlers for layers
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

  // Handlers for showing and hiding the delete icon on hover
  const handleMouseEnter = (event) => {
    const deleteIcon = event.currentTarget.querySelector('#delete');
    deleteIcon.style.display = 'block';
  };

  const handleMouseLeave = (event) => {
    const deleteIcon = event.currentTarget.querySelector('#delete');
    deleteIcon.style.display = 'none';
  };

  // Handler to delete a component
  const handleDeleteComponent = (event, componentId) => {
    event.stopPropagation(); // Stop event propagation to prevent the parent div's onClick event from triggering
    deleteComponent(componentId); // Call your deleteComponent mutation or function here
    // Update the components state accordingly
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== componentId)
    );
  };
  // Handlers for editing component names
  const handleComponentNameDoubleClick = (event, componentId) => {
    setEditComponentId(componentId);
    const component = components.find((component) => component.id === componentId);
    setEditComponentName(component.name);
  };

  const handleComponentNameChange = (event) => {
    setEditComponentName(event.target.value);
  };

  const handleComponentNameBlur = async (event) => {
    const updatedComponent = {
      ...components.find((component) => component.id === editComponentId),
      name: editComponentName,
    };
    try {
      await updateComponent(updatedComponent.id, updatedComponent.name);

      // Update the components state accordingly
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === editComponentId ? updatedComponent : component
        )
      );

      setEditComponentId(null);
      setEditComponentName("");
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };


  // Function to toggle visibility between layers and components
  const toggleVisibility = (type) => {
    setActivePanel(type);
  };

  // Render the LayersPanel with layers and components sections
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div id="layersPanel">
        <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
          <label
            id="layersTitle"
            onClick={() => toggleVisibility('layers')}
            style={{ opacity: activePanel === 'layers' ? 1.0 : 0.3 }}
          >
            Layers
          </label>
          <label
            id="componentsTitle"
            onClick={() => toggleVisibility('components')}
            style={{
              opacity: activePanel === 'components' ? 1.0 : 0.3,
            }}
          >
            Components
          </label>
          <img
            src="images/plus.svg"
            style={{
              width: '20px',
              marginLeft: '10px',
              opacity: 1.0,
              display: activePanel === 'components' ? 'block' : 'none',
            }}
            onClick={() => addNewComponentToDBAndState('Test Component 2')}
          />
        </div>
        <div id="layersLine"></div>
        <div
          id="layers"
          style={{
            padding: '10px 0px 0px 0px',
            display: activePanel === 'layers' ? 'block' : 'none',
          }}
        >
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
                cursor: 'move',
              }}
            >
              <img
                src="images/layerIcon.svg"
                id="#dragIcon"
                style={{ marginRight: '5px' }}
              />{' '}
              {shape.name}
            </div>
          ))}
        </div>
        <div
          id="components"
          style={{
            padding: '10px 0px 0px 0px',
            display: activePanel === 'components' ? 'block' : 'none',
          }}
        >
          {components.map((component) => (
            <div
              key={component.id} // using component id as key
              draggable
              onDragStart={(event) => handleDragStart(event, component.id)}
              onDragOver={(event) => handleDragOver(event, component.id)}
              onDrop={(event) => handleDrop(event, component.id)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedComponent(component.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 5px 5px 20px',
                backgroundColor: 'transparent',
                cursor: 'move',

              }}
            >
              <img
                id="dragIcon"
                src="images/layerIcon.svg"
                style={{ marginRight: '5px' }}
              />{' '}
              {
                editComponentId === component.id ? (
                  <input
                    type="text"
                    value={editComponentName}
                    onChange={handleComponentNameChange}
                    onBlur={handleComponentNameBlur}
                    autoFocus
                  />
                ) : (
                  <span
                    onDoubleClick={(event) =>
                      handleComponentNameDoubleClick(event, component.id)
                    }
                  >
                    {component.name}
                  </span>
                )
                //component.name
              }
              <img
                id="delete"
                onClick={(event) =>
                  handleDeleteComponent(event, component.id)
                }
                src="images/trash.svg"
                style={{ marginRight: '5px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



