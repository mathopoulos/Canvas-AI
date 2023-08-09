// Function to draw an input field on a canvas
export const drawText = (ctx, x, y, height, placeholderText, placeholderTextFont, placeholderTextFillStyle, placeholderTextSize) => {
  
    // Set the font properties and draw the placeholder text in the center of the input field
    ctx.font = `${placeholderTextSize}px ${placeholderTextFont}`;
    ctx.fillStyle = placeholderTextFillStyle;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(placeholderText, x + 10, y + height / 2);


  
}