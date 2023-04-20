import React, { useRef, useEffect } from "react";
import '/src/App.css';


export default function DrawingCanvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [props.width, props.height]);

  return (
    <div>
      <canvas id ="drawing-canvas" ref={canvasRef} width={props.width} height={props.height}></canvas>
    </div>
  );
}