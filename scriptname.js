const fs = require('fs');
const path = require('path');

// Set the paths for the name list text file and the directory to delete files from
const nameListFile = 'names.txt';
const deleteDir = '/Users/kylelloyd/Documents/NFTGEN/build/json';

// Read the name list text file and delete the corresponding files in the directory
fs.readFile(nameListFile, 'utf8', (err, data) => {
  if (err) throw err;
  const names = data.split('\n').filter(name => name.trim() !== '');
  names.forEach(name => {
    const filePath = path.join(deleteDir, name);
    fs.unlink(filePath, err => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log(`File not found: ${name}`);
        } else {
          throw err;
        }
      } else {
        console.log(`Deleted file: ${name}`);
      }
    });
  });
});
