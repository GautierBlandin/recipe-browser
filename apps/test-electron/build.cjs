const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Ensure build directory exists
const buildDir = path.resolve(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Main build process
(async () => {
  try {
    // Build TypeScript files
    await esbuild.build({
      entryPoints: ['src/main.ts'],
      outdir: 'build',
      bundle: true,
      platform: 'node',
      format: 'cjs',
      sourcemap: true,
      loader: { '.ts': 'ts' },
      outExtension: { '.js': '.js' },
    });

    // Read the original package.json
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

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
