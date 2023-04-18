// Generate HTML for all inputs
export function syncCode() {
  let inputsHTML = '';
  for (const key in form.inputs) {
    if (form.inputs.hasOwnProperty(key)) {
      input = form.inputs[key];
      //inputsHTML += `<label for="${key}">${input.label}</label>\n`;
      inputsHTML += `<input type="${input.type}" id="${key}" name="${key}" style="position:absolute; left:${input.x}px; top:${input.y}px;"`;
      if (input.required) {
        inputsHTML += ' required';
      }
      if (input.value) {
        inputsHTML += ` value="${input.value}"`;
      }
      inputsHTML += '>\n';
      
    }
  }

  // Generate HTML for all texts
  let textsHTML = '';
  for (const key in form.texts) {
    if (form.texts.hasOwnProperty(key)) {
      text = form.texts[key];
      textsHTML += `<p style="font-size:${text.fontSize}px; color:${text.color}; position: absolute; left:${text.x}px; top:${text.y}px">${text.content}</p>\n`;
    }
  }

// Combine generated HTML code for all inputs and texts
const html = `
  <html>
    <head>
      <style>
        div {
          border-radius: 5px;
          background-color: #f2f2f2;
          padding: 20px;
          height: 600px;
          width: 850px; 
          left: 220px; 
          top: 120px; 
        }
      </style>
    </head>
    <body>
      <div>
        <form>
          ${inputsHTML}
          ${textsHTML}
        </form>
      </div>
    </body>
  </html>
`;


const str = html;
const base64 = btoa(str); // Encodes str in base64

const token = "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"; // Replace with your Github personal access token
const owner = "mathopoulos"; // Replace with the repository owner
const repo = "canvas_data"; // Replace with the repository name
const path = "index.html"; // Replace with the file path you want to create/update
const message = "New file created"; // Replace with the commit message
const newContent = html; // Replace with the new file's content

// Get the current file content and its SHA hash
fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  headers: {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const currentContent = atob(data.content);
    const currentSHA = data.sha;

    // Update the file with the new content
    const updatedContent = newContent;
    const updatedContentBase64 = btoa(updatedContent);
    const body = {
      message: message,
      content: updatedContentBase64,
      sha: currentSHA,
    };
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
  
// Get messageDiv and check if it already has a success message
const messageDiv = document.querySelector("#messageDiv");
const successMsg = messageDiv.querySelector("p");

// Only add a new success message if it doesn't exist already
if (!successMsg) {
  const exportSuccessfulMsg = document.createElement("p");
  exportSuccessfulMsg.textContent = "Success!";
  messageDiv.appendChild(exportSuccessfulMsg);
  setTimeout(() => {
    messageDiv.removeChild(exportSuccessfulMsg); // Remove the success message after 5 seconds
  }, 3000);
}

}

