import React, { useRef, useEffect } from "react";

export default function Square(props) {
  const { x, y, size, ctx } = props;

  useEffect(() => {
    ctx.fillRect(x, y, size, size);
  }, [ctx, x, y, size]);

  return null;
}