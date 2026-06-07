const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const imagesDataFile = path.join(ROOT_DIR, 'assets', 'js', 'images_data.js');
const imagesDir = path.join(ROOT_DIR, 'assets', 'images');

// Config files mapping
const folderMetadata = {};
let existingShowreelUrl = "https://www.youtube.com/embed/coYw-Nirh_U?autoplay=1&mute=0";

// 1. Try to load existing data to preserve custom displayNames and categories
if (fs.existsSync(imagesDataFile)) {
  try {
    const content = fs.readFileSync(imagesDataFile, 'utf8');
    
    // Local variables for eval
    let IMAGES_DATA = [];
    let PORTRAIT_IMAGES = [];
    let PARTNER_LOGOS = [];
    let SHOWREEL_URL = "";

    const cleanContent = content
      .replace(/const IMAGES_DATA/g, 'IMAGES_DATA')
      .replace(/const PORTRAIT_IMAGES/g, 'PORTRAIT_IMAGES')
      .replace(/const PARTNER_LOGOS/g, 'PARTNER_LOGOS')
      .replace(/const SHOWREEL_URL/g, 'SHOWREEL_URL');
      
    eval(cleanContent);
    
    if (SHOWREEL_URL) {
      existingShowreelUrl = SHOWREEL_URL;
    }

    IMAGES_DATA.forEach(album => {
      folderMetadata[album.folderName] = {
        displayName: album.displayName,
        category: album.category
      };
    });
    console.log(`Parsed ${Object.keys(folderMetadata).length} existing folder configs from images_data.js`);
  } catch (e) {
    console.log('Could not parse existing images_data.js (using defaults):', e.message);
  }
}

// Helper to check if file is an image or local video
const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.webm', '.mov'];
function isMediaFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return allowedExts.includes(ext);
}

// Helper to format title (e.g. "Hoi_nghi_apec" -> "Hội nghị apec")
function formatFolderTitle(folderName) {
  return folderName
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

// 2. Scan folders
const newImagesData = [];
const newPortraitImages = [];
const newPartnerLogos = [];

if (fs.existsSync(imagesDir)) {
  const items = fs.readdirSync(imagesDir);
  
  items.forEach(itemName => {
    const itemPath = path.join(imagesDir, itemName);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Reserved directories
      if (itemName === 'chan_dung') {
        const files = fs.readdirSync(itemPath).filter(f => isMediaFile(f)).sort();
        files.forEach(f => newPortraitImages.push(`assets/images/chan_dung/${f}`));
      } else if (itemName === 'don_vi_tung_cong_tac') {
        const files = fs.readdirSync(itemPath).filter(f => isMediaFile(f)).sort();
        files.forEach(f => newPartnerLogos.push(`assets/images/don_vi_tung_cong_tac/${f}`));
      } else if (itemName === 'bo sung') {
        const subItems = fs.readdirSync(itemPath);
        subItems.forEach(subName => {
          const subPath = path.join(itemPath, subName);
          if (fs.statSync(subPath).isDirectory()) {
            const files = fs.readdirSync(subPath).filter(f => isMediaFile(f)).sort();
            if (files.length > 0) {
              const folderKey = `bo sung/${subName}`;
              const relativePaths = files.map(f => `assets/images/bo sung/${subName}/${f}`);
              
              let displayName = formatFolderTitle(subName);
              let category = 'others';
              
              if (folderMetadata[folderKey]) {
                displayName = folderMetadata[folderKey].displayName;
                category = folderMetadata[folderKey].category;
              }
              
              newImagesData.push({
                folderName: folderKey,
                displayName: displayName,
                category: category,
                images: relativePaths
              });
            }
          }
        });
      } else {
        // Standard event album directory
        const files = fs.readdirSync(itemPath).filter(f => isMediaFile(f)).sort();
        if (files.length > 0) {
          const relativePaths = files.map(f => `assets/images/${itemName}/${f}`);
          
          // Look up metadata or generate
          let displayName = formatFolderTitle(itemName);
          let category = 'others';
          
          if (folderMetadata[itemName]) {
            displayName = folderMetadata[itemName].displayName;
            category = folderMetadata[itemName].category;
          } else {
            // Basic automatic categorization based on keywords
            const lowerName = itemName.toLowerCase();
            if (lowerName.includes('gala') || lowerName.includes('corporate') || lowerName.includes('kickoff') || lowerName.includes('summit')) {
              category = 'corporate';
            } else if (lowerName.includes('festival') || lowerName.includes('van_hoa') || lowerName.includes('music') || lowerName.includes('nhac')) {
              category = 'cultural';
            } else if (lowerName.includes('sports') || lowerName.includes('basketball') || lowerName.includes('bong_ro') || lowerName.includes('golf')) {
              category = 'sports';
            } else if (lowerName.includes('wedding') || lowerName.includes('cuoi')) {
              category = 'weddings';
            }
          }
          
          newImagesData.push({
            folderName: itemName,
            displayName: displayName,
            category: category,
            images: relativePaths
          });
        }
      }
    }
  });
}

// 3. Write images_data.js
const outputContent = `// Auto-generated file containing image resources from local directory
const SHOWREEL_URL = "${existingShowreelUrl}";

const IMAGES_DATA = ${JSON.stringify(newImagesData, null, 2)};

const PORTRAIT_IMAGES = ${JSON.stringify(newPortraitImages, null, 2)};

const PARTNER_LOGOS = ${JSON.stringify(newPartnerLogos, null, 2)};
`;

// Ensure parent directory exists before writing
const targetDir = path.dirname(imagesDataFile);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(imagesDataFile, outputContent, 'utf8');
console.log(`Successfully synchronized media! Wrote ${newImagesData.length} albums, ${newPortraitImages.length} portraits, and ${newPartnerLogos.length} logos to assets/js/images_data.js`);
