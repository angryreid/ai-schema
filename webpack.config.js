// webpack.config.js

const { ConcatSource } = require('webpack-sources');

class ReplaceStringPlugin {
  constructor(options) {
    // Define your options here, e.g., regex pattern and replacement string
    this.options = options || {};
  }

  apply(compiler) {
    // Register the plugin to the "emit" hook, which is triggered during the build process
    compiler.hooks.emit.tapAsync('ReplaceStringPlugin', (compilation, callback) => {
      // Iterate through all compiled assets
      compilation.assets = Object.keys(compilation.assets).reduce((result, filename) => {
        // Get the asset's source code
        const assetSource = compilation.assets[filename].source();

        // Replace the string using the provided regular expression and replacement string
        const modifiedSource = assetSource.replace(this.options.regex, this.options.replacement);

        // Update the asset with the modified source
        result[filename] = new ConcatSource(modifiedSource);

        return result;
      }, {});

      // Continue with the build process
      callback();
    });
  }
}


const path = require('path');

module.exports = {
  // Your custom webpack configuration goes here
  plugins: [
    new ReplaceStringPlugin({
      regex: /c/g,
      replacement: 'your-replacement-string',
    }),
  ],
};
