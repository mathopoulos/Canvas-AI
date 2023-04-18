import './App.css'
import React, { useEffect, useState } from 'react';
import MyComponent from '/src/components/MyComponent.jsx';


export default function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(setText);
  }, []);

  return (
    <main>
      <MyComponent />
    </main>
  );
}

