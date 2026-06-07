const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const CONFIGS = [
  {
    srcDir: path.join(ROOT_DIR, 'sections'),
    outputFile: path.join(ROOT_DIR, 'index.html'),
    ext: '.html'
  },
  {
    srcDir: path.join(ROOT_DIR, 'assets', 'css'),
    outputFile: path.join(ROOT_DIR, 'assets', 'css', 'style.css'),
    ext: '.css'
  },
  {
    srcDir: path.join(ROOT_DIR, 'assets', 'js'),
    outputFile: path.join(ROOT_DIR, 'assets', 'js', 'main.js'),
    ext: '.js'
  }
];

function buildConfig(config) {
  const { srcDir, outputFile, ext } = config;
  
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
    console.log(`Created directory: ${srcDir}`);
    return;
  }

  try {
    const files = fs.readdirSync(srcDir)
      .filter(file => file.endsWith(ext) && path.join(srcDir, file) !== outputFile)
      .sort((a, b) => {
        if (a === 'images_data.js') return -1;
        if (b === 'images_data.js') return 1;
        return a.localeCompare(b);
      });

    if (files.length === 0) {
      console.log(`No files found in ${srcDir} matching ${ext}`);
      return;
    }

    let combinedContent = '';
    files.forEach(file => {
      const filePath = path.join(srcDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        if (ext === '.html') {
          combinedContent += `<!-- --- START OF FILE: ${file} --- -->\n`;
          combinedContent += fileContent + `\n<!-- --- END OF FILE: ${file} --- -->\n\n`;
        } else {
          combinedContent += `/* --- START OF FILE: ${file} --- */\n`;
          combinedContent += fileContent + `\n/* --- END OF FILE: ${file} --- */\n\n`;
        }
      }
    });

    fs.writeFileSync(outputFile, combinedContent, 'utf8');
    console.log(`Successfully built: ${outputFile} (${files.length} files compiled)`);
  } catch (error) {
    console.error(`Build failed for ${outputFile}:`, error);
  }
}

function runBuild() {
  console.log('--- STARTING CINEMATIC PORTFOLIO BUILD ---');
  CONFIGS.forEach(buildConfig);
  console.log('--- BUILD COMPLETED SUCCESSFULLY ---\n');
}

const args = process.argv.slice(2);
const isWatch = args.includes('--watch') || args.includes('-w');

runBuild();

if (isWatch) {
  console.log('Watching directories for changes...');
  CONFIGS.forEach(config => {
    if (fs.existsSync(config.srcDir)) {
      fs.watch(config.srcDir, (eventType, filename) => {
        if (filename && filename.endsWith(config.ext)) {
          if (path.join(config.srcDir, filename) === config.outputFile) {
            return;
          }
          console.log(`Change detected in ${filename}. Rebuilding...`);
          buildConfig(config);
        }
      });
    }
  });
}
