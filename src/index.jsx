// Import necessary modules from React and ReactDOM libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import the main App component
import App from './App'

// Create a root DOM node for React and render the App component inside it
// Using React's Concurrent Mode with createRoot
// React.StrictMode is a wrapper to highlight potential problems in the app during development
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)