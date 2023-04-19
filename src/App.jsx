import './App.css'
import React, { useEffect, useState } from 'react';
import TopNavigation from '/src/components/TopNavigation.jsx';


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
    </main>
  );
}

