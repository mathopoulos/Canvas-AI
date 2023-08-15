import React, { useState, useEffect } from 'react';

export function FocusedButton({ canvasHeight, canvasWidth, canvasTop, canvasLeft }) {
    // Initial top calculation
    let topTest = canvasTop + canvasHeight + 70;
      
    // Initial left calculation
  
    let leftTest = canvasLeft + 10;

    // State declarations
    const [top, setTop] = useState(topTest);
    const [left, setLeft] = useState(leftTest);
    const [width, setWidth] = useState(canvasWidth);
    const [isHovered, setIsHovered] = useState(false);

    // Define the common styles without width
    const commonStyles = {
        zIndex: 30,
        position: 'fixed',
        height: '100px',
        fontFamily: 'sans-serif',
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: 'rgba(128, 128, 128, 0.05)',
        color: 'grey',
    };

    // Define hover styles separately
    const hoverStyles = {
        backgroundColor: 'rgba(131, 43, 219, 0.5)',
        color: '#832BDB',
    };

    // Recalculate top and width based on canvas values
    useEffect(() => {
        const newTop = canvasTop + canvasHeight + 70;
        setTop(newTop);
        setWidth(canvasWidth);
    }, [canvasHeight, canvasWidth, canvasTop]);

    return (
        <button
            style={{
                ...commonStyles,
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                ...(isHovered ? hoverStyles : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="images/plus.svg" alt="box-icon" id="plusImage" style={{ userSelect: 'none' }} />
        </button>
    );
}
