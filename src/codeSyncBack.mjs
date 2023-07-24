// Variable to store the current HTML content for comparison purposes
let currentHtml = ""; 

//function that reads the html file from output.html
function readOutputHtml() {
  return fetch('./output.html')
    .then(response => response.text())
    .catch(error => console.error(error));
}

// Define the function that updates the inputs
async function updateInputs() {
  const parser = new DOMParser();
  const htmlString = await readOutputHtml();

  //only update the inputs if the HTML has changed
  if (htmlString !== currentHtml){
    currentHtml = htmlString;

  const htmlDoc = parser.parseFromString(htmlString, 'text/html');

  // Loop through each input element in the updated HTML
  const inputElements = htmlDoc.getElementsByTagName('input');
  for (let i = 0; i < inputElements.length; i++) {
    const inputId = inputElements[i].id;
    if (inputs[inputId]) {
      // Update the corresponding input object's y value using the input element's offsetTop property
      inputs[inputId].y = parseInt(inputElements[i].style.top);
      inputs[inputId].x = parseInt(inputElements[i].style.left);
      inputs[inputId].type = parseInt(inputElements[i].type);
      console.log("success");
    }
  }

  clearCanvas();
  rerenderObjects();
}}

// Call the function initially
updateInputs();

// Call the function every 1 second
setInterval(updateInputs, 500);

