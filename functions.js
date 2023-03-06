// Call `fs` module
const fs = require('fs');


// Function that takes in folder path and regex to search for
async function findAndReplace(folderPath, regex) {
  const files = await fs.promises.readdir(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      // Recurse into subdirectory
      await findAndReplace(filePath, regex);
    } else {
      // Replace URL in file
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      const newContent = fileContent.replace(regex, 'new-url');
      await fs.promises.writeFile(filePath, newContent);
    }
  }
}


/**
 * Call function for folder 
 * findAndReplace('/path/to/admin/folder', /"\/assets/g, '"https://development.nanproperties.com/assets/');

 */

findAndReplace('/_utils', /"\/assets/g, '"https://development.nanproperties.com/assets/');
findAndReplace('/cms', /"\/assets/g, '"https://development.nanproperties.com/assets/');
findAndReplace('/theme', /"\/assets/g, '"https://development.nanproperties.com/assets/');