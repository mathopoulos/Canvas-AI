// Importing required styles for the App component
import './App.css'

// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';
import TopNavigation from '/src/components/navigation/TopNavigation.jsx';
import Canvas from '/src/components/canvas/Canvas.jsx';


// Main App component
export default function App() {
  // State to hold text fetched from the API
  const [text, setText] = useState('');

  // useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    // Fetching data from the '/api' endpoint
    fetch('/api')
      .then(res => res.text()) // Parsing the response to text
      .then(setText); // Setting the fetched text to the state
  }, []); // Empty dependency array ensures this useEffect runs only once, similar to componentDidMount

  return (
    <main>
      <Canvas />

    </main>
  );
}

