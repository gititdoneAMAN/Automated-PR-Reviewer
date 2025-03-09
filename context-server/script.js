const fs = require('fs');
const path = require('path');
const { produce, consume, shutdown } = require('./kafka');

async function init() {
  console.log('Starting Context Building Process');

  const repositoryPath = path.join(__dirname, 'repository');
  const repositoryContents = fs.readdirSync(repositoryPath, {
    recursive: true,
  });

  console.log(repositoryContents);

  for (const file of repositoryContents) {
    const filePath = path.join(repositoryPath, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      console.log('Skipping Directory');
      continue;
    }
    if (file.startsWith('.git')) {
      continue;
    }
    if (file.includes('node_modules')) {
      continue;
    }
    if (file.includes('public')) {
      continue;
    }
    if (file === 'package-lock.json') {
      continue;
    }

    console.log(`Processing File: ${file}`);
    const fileName = file;
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const data = {
      fileName,
      fileContent,
    };

    await produce(JSON.stringify(data));
  }
  console.log('Context Build Complete');
  await consume();
  // await shutdown();
}

init();
