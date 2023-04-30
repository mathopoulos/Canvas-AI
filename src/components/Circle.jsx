export const drawCircle = (ctx, x, y, radius) => {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
};
