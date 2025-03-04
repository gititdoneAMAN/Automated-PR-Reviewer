const fs = require('fs');
const path = require('path');

async function init() {
  console.log('Starting Context Building Process');

  const repositoryPath = path.join(__dirname, 'repository');
  const repositoryContents = fs.readdirSync(repositoryPath, {
    recursive: true,
  });

  console.log(repositoryContents);

  let content = ' ';

  for (const file of repositoryContents) {
    const filePath = path.join(repositoryPath, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      console.log('Skipping Directory');
      continue;
    }
    if (file.startsWith('.git')) {
      continue;
    }
    if (file === 'package-lock.json') {
      continue;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    content += fileContent;
  }
  console.log('Context Build Complete');
  console.log(content);
}

init();
