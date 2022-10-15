import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const packageJson = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8');
let version = '1.0.1';

try {
  const parsed = JSON.parse(packageJson);
  version = parsed.version;
} catch (ex) {}

const settings = {
  entryPoints: ['./src/plugins/multi-image-preview-plugin/index.ts'],
  bundle: true,
  sourcemap: 'linked', // external
  minify: true,
  target: ['es6'],
  outfile: './dist/plugins/tcfu-multi-image-preview.min.js',
  banner: {
    js: `/* 
Tool Cool File Uploader - Multi Image Preview Plugin
Version: ${version}
Documentation: https://github.com/toolcool-org/toolcool-file-uploader
License:    
Author: Tool Cool, toolcool.org@gmail.com>                          
*/`,
  },
};

const args = process.argv.slice(2);
const watch = args.length > 1 && args[1].trim().toLowerCase() === 'watch';

if(watch){
  // ------------- watch ---------------
  settings.watch = {
    onRebuild(error, result) {

      if (error){
        // console.error(error);
      }
      else {
        console.log('Succeeded.');
      }
    },
  };
}

esbuild
  .build(settings)
  .then(result => {
    console.log(watch ? 'Watching...' : 'Done.');
  })
  .catch(() => process.exit(1));
