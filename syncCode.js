import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import fs from "fs";


export const syncCode = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./shapes.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const shapesData = JSON.parse(data);
          const shapes = shapesData.shapes || [];
          let inputsHTML = '';
          shapes.forEach((shape) => {
            if (shape.type === 'input') {
              inputsHTML += `<input type="text" id="${shape.id}" name="${shape.name}" placeholder="${shape.placeholderText}" style="position:absolute; left:${shape.x}px; top:${shape.y}px; width:${shape.width}px; height:${shape.height}px; border-radius:${shape.borderRadius}px; stroke-width:${shape.strokeWidth}px; border-color:${shape.strokeColor}; background-color:${shape.fillStyleColor}">\n`;
            }
          });

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
                  </form>
                </div>
              </body>
            </html>
          `;

          const str = html;
          const base64 = btoa(str);

          const token = process.env['github_token']; // Replace with your Github personal access token
          const owner = "mathopoulos";
          const repo = "canvas_data";
          const path = "index.html";
          const message = "update file";
          const newContent = html;

          fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const currentSHA = data.sha;
              
              const updatedContentBase64 = btoa(newContent);
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

          resolve();
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
    return "success"
  });
};

export default syncCode;
