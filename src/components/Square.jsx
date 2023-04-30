export const drawSquare = (ctx, x, y, size) => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
};
