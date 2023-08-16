// Function to draw an input field on a canvas
export const drawGroup = (ctx, width, height, x, y, borderRadius, isSelected, strokeWidth, strokeColor, fillStyleColor, borderSides) => {
  // Set the line width and fill style for the input field
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillStyleColor;

    // Begin drawing the input field from the top left, just before the corner
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
  
    // Check and set the color for the top border
    if (borderSides.top) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
  // Draw the top border of the input field
    ctx.lineTo(x + width - borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
    ctx.stroke();

    // Check and set the color for the right border
    ctx.beginPath();
    if (borderSides.right) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
  
  // Draw the right border of the input field
    ctx.moveTo(x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
    ctx.stroke();

    // Check and set the color for the bottom border
    ctx.beginPath();
    if (borderSides.bottom) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
  
  // Draw the bottom border of the input field
    ctx.moveTo(x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
    ctx.stroke();

    // Check and set the color for the left border
    ctx.beginPath();
    if (borderSides.left) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }

  // Draw the left border of the input field
    ctx.moveTo(x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
    ctx.stroke();

    // Fill the input field with the specified fill color
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
    ctx.closePath();
    ctx.fill();


}


