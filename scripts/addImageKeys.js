const fs = require('fs');
const path = require('path');

// Read the laptops.js file
const filePath = path.join(__dirname, '..', 'src', 'products', 'laptops.js');
let content = fs.readFileSync(filePath, 'utf8');

// Brand counters
const brandCounters = {
  ASUS: 0,
  DELL: 0,
  FUJITSU: 0,
  HP: 0,
  LENOVO: 0
};

// Find all laptop objects in the arrays
const laptopArrays = [
  'laptopsVersatile',
  'laptopsGraphics',
  'laptopsGraphicsGen8',
  'laptopsGraphicsHighEnd',
  'laptopsNewWithWarranty'
];

laptopArrays.forEach(arrayName => {
  // Skip if the array is not found in the file
  if (!content.includes(`const ${arrayName} = [`)) return;
  
  // Find all objects in the array
  const arrayStart = content.indexOf(`const ${arrayName} = [`) + `const ${arrayName} = [`.length;
  const arrayEnd = content.indexOf('];', arrayStart) + 2;
  let arrayContent = content.substring(arrayStart, arrayEnd);
  
  // Process each object in the array
  let updatedArrayContent = arrayContent.replace(/{\s*([^}]*?brand:\s*["']([^"']+)["'],[^}]*?)(?=,?\s*[{\n])/g, (match, p1, brand) => {
    // Skip if brand is not in our counters or already has an image
    if (!brandCounters.hasOwnProperty(brand) || match.includes('image:')) {
      return match;
    }
    
    // Increment the counter for this brand
    brandCounters[brand]++;
    const counter = brandCounters[brand];
    
    // Add the image property after the brand property
    return `{\n      brand: '${brand}',\n      image: "/${brand}/${brand}${counter}.webp",` + 
      p1.replace(/brand:\s*["']([^"']+)["'],\s*/, '');
  });
  
  // Update the content with the modified array
  content = content.substring(0, arrayStart) + updatedArrayContent + content.substring(arrayEnd);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Image keys added successfully!');
console.log('Brand counters:', brandCounters);
