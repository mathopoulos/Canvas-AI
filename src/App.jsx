import './App.css'
import React, { useEffect, useState } from 'react';
import TopNavigation from '/src/components/TopNavigation.jsx';
import Canvas from '/src/components/Canvas.jsx';


export default function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(setText);
  }, []);

  return (
    <main>
      <TopNavigation />
      <Canvas />

    </main>
  );
}

