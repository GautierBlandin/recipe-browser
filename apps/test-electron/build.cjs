const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Get the project root directory (where the build script is located)
const projectRoot = __dirname;

// Ensure build directory exists
const buildDir = path.resolve(projectRoot, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Main build process
(async () => {
  try {
    // Build TypeScript files with absolute paths
    await esbuild.build({
      entryPoints: [path.resolve(projectRoot, 'src/main.ts')],
      outdir: buildDir,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      sourcemap: true,
      loader: { '.ts': 'ts' },
      outExtension: { '.js': '.js' },
      external: ['electron'],
    });

    // Copy index.html to build directory
    const sourceHtmlPath = path.resolve(projectRoot, 'src/index.html');
    const destHtmlPath = path.resolve(buildDir, 'index.html');
    fs.copyFileSync(sourceHtmlPath, destHtmlPath);
    console.log('Copied index.html to build directory');

    // Read the original package.json with absolute path
    const packageJsonPath = path.resolve(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Modify the entrypoint to point to the correct location
    packageJson.main = 'main.js'; // This will be the output file in the build directory

    // Write the modified package.json to the build directory
    fs.writeFileSync(
      path.join(buildDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
})();
