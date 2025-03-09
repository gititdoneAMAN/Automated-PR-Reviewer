const fs = require('fs');
const path = require('path');

function getPromptTemplate(file) {
  const filePath = path.join(__dirname, file);
  const data = fs.readFileSync(filePath, 'utf-8');
  return data;
}

module.exports = getPromptTemplate;
