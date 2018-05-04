const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const nodeResolve = require('rollup-plugin-node-resolve-and-alias');
const parcel = require('parcel-bundler');
const path = require('path');
const bs = require('browser-sync').create();
const postcss = require('rollup-plugin-postcss');
const replace = require('rollup-plugin-replace');
const typescript = require('rollup-plugin-typescript2');
const cssnext = require('postcss-cssnext');
const babel = require('rollup-plugin-babel');

/**
 * config
 */

//  * 编译模式: dev | test | prod
const mode = process.env.NODE_ENV || 'dev';

// ##################################################

let bsInited = false;

// rollup build
const inputOpts = {
  input: ['./src/sve-app.js'],
  external: [
    'react', 'react-dom'
  ],
  plugins: [
    nodeResolve({
      include: ['./node_modules/**'],
      jsnext: true,
      extensions: ['.js', '.json', '.sve', '.jsx', '.ts', 'tsx'],
      alias: {
        model: path.resolve(__dirname, 'src/model')
      }
    }),
    postcss({
      extensions: ['.css'],
      extract: './src/assets/main.bundle.css',
      plugins: [cssnext()]
    }),
    svelte({
      extensions: ['.sve'],
      include: './src/**/*.sve',
      share: true,
      css: function(css) {
        css.write('./src/assets/svelte.bundle.css', false);
      }
    }),
    typescript({
      typescript: require('typescript')
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      __ENV__: JSON.stringify(mode),
      __API__: JSON.stringify(process.env.API || mode),
      __VER__: JSON.stringify(require('./package.json').version)
    })
  ],
  experimentalCodeSplitting: true,
  experimentalDynamicImport: true
};

const outputOpts = {
  dir: './src/build-es',
  format: 'es'
};

async function rollUpBuild() {
  try {
    const bundles = await rollup.rollup(inputOpts);
    bundles.write(outputOpts);
  } catch (e) {
    console.log('打包错误:', e.message);
  }
}
rollup
  .watch({
    ...inputOpts,
    output: [outputOpts],
    include: ['./src/**/*.sve']
  })
  .on('event', async event => {
    if (event.code === 'START') {
      console.log('开始打包...');
      rollUpBuild();
    }
    if (event.code === 'END') {
      // Rollup分片打包完毕，开始Parcel打包
      try {
        let parcelBundler = new parcel(path.resolve(__dirname, 'index.html'), {
          watch: false,
          minify: true,
          cacheDir: '/Volumes/SD/cache'
        });
        await parcelBundler.bundle();
        if (bsInited) {
          bs.reload();
        } else {
          bs.init({
            server: './dist',
            ui: false,
            files: ['*.js', '*.css', '*.html']
          });
          bsInited = true;
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
