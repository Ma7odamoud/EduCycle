const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load existing keys (basic regex approach to avoid dealing with ES module import in raw node)
const translationsContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'translations.js'), 'utf-8');
const enSection = translationsContent.substring(translationsContent.indexOf('en: {'), translationsContent.indexOf('ar: {'));
const existingKeys = new Set();
const keyRegex = /([a-zA-Z0-9_]+)\s*:/g;
let match;
while ((match = keyRegex.exec(enSection)) !== null) {
  existingKeys.add(match[1]);
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

try {
  const usedKeys = new Set();
  const files = getAllFiles(path.join(__dirname, 'src'));
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const regex = /t\(['"]([^'"]+)['"]\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      usedKeys.add(match[1]);
    }
  }

  const missingKeys = [...usedKeys].filter(k => !existingKeys.has(k) && k !== 'language_key_placeholder');
  
  if (missingKeys.length > 0) {
    console.log("MISSING KEYS:");
    missingKeys.forEach(k => console.log(k));
  } else {
    console.log("No missing keys found.");
  }
} catch (e) {
  console.error("Error:", e.message);
}
