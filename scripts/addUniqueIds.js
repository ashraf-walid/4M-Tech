const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'products', 'laptops.js');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    // Regular expression to find all object literals
    // This is a bit naive and might fail on complex structures, but for this specific file it should work.
    let idCounter = 1;
    const updatedData = data.replace(/{\s*brand:/g, () => {
        const newObjStart = `{\n    id: ${idCounter++},\n    brand:`;
        return newObjStart;
    }).replace(/model: (.*?),\s*image: (.*?),/g, 'model: $1,'); // Remove duplicate image key

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file: ${err}`);
            return;
        }
        console.log('Successfully added unique IDs and fixed duplicate keys in laptops.js');
    });
});
