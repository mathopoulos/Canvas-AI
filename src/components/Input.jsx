export const drawInput = (ctx, width, height, x, y, borderRadius, isSelected, strokeWidth, strokeColor, fillStyleColor, borderSides, placeholderText) => {
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillStyleColor;

    // Start the path at the top left, just before the corner
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    console.log(strokeColor);
    // Top border
    if (borderSides.top) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
    ctx.lineTo(x + width - borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
    ctx.stroke();

    // Right border
    ctx.beginPath();
    if (borderSides.right) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
    ctx.moveTo(x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
    ctx.stroke();

    // Bottom border
    ctx.beginPath();
    if (borderSides.bottom) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
    ctx.moveTo(x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
    ctx.stroke();

    // Left border
    ctx.beginPath();
    if (borderSides.left) {
        ctx.strokeStyle = strokeColor;
    } else {
        ctx.strokeStyle = fillStyleColor;
    }
    ctx.moveTo(x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
    ctx.stroke();

    // Fill
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

    // Draws placeholder text defined for input 
    ctx.font = "14px Helvetica";
    ctx.fillStyle = "grey";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(placeholderText, x + 10, y + height / 2);
}