const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir)
  .filter(file => 
    file.endsWith('.png') || 
    file.endsWith('.jpg') || 
    file.endsWith('.jpeg') || 
    file.endsWith('.webp')
  );

console.log(`Found ${imageFiles.length} images to optimize`);

// Process each image
(async () => {
  for (const file of imageFiles) {
    if (file.startsWith('optimized-') || file === 'optimized') continue;
    
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, '.webp'));
    
    try {
      const fileStats = fs.statSync(inputPath);
      const fileSizeInMB = fileStats.size / (1024 * 1024);
      
      // Optimize based on file size
      if (fileSizeInMB > 1) {
        console.log(`Optimizing large image (${fileSizeInMB.toFixed(2)}MB): ${file}`);
        
        await sharp(inputPath)
          .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(outputPath);
      } else if (fileSizeInMB > 0.3) {
        console.log(`Optimizing medium image (${fileSizeInMB.toFixed(2)}MB): ${file}`);
        
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
      } else {
        console.log(`Optimizing small image (${fileSizeInMB.toFixed(2)}MB): ${file}`);
        
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
      }
      
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSizeInMB = optimizedStats.size / (1024 * 1024);
      const savings = ((1 - (optimizedSizeInMB / fileSizeInMB)) * 100).toFixed(2);
      
      console.log(`✅ Reduced ${file} from ${fileSizeInMB.toFixed(2)}MB to ${optimizedSizeInMB.toFixed(2)}MB (${savings}% savings)\n`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log('Image optimization complete!');
})(); 