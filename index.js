/**
 * @type {import('postcss').PluginCreator}
 */

const valueParser = require('postcss-value-parser');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const publicDir = `${process.cwd()}/public`;

module.exports = (opts = {}) => {
  let {
    rootDir = publicDir
  } = opts;

  return {
    postcssPlugin: 'postcss-embed-url',
    Declaration (decl, { Rule }) {
      if (decl.value.includes('url') === true) {
        const parsed = valueParser(decl.value);

        parsed.walk((node) => {
          let value = node.value;
          if (value === '/') {
            return;
          }

          if (value.includes('?') === true) {
            value = value.split('?')[0];
          }

          if (fs.existsSync(`${rootDir}${value}`) === true) {
            const filePath = `${rootDir}${value}`;
            const fileExt = filePath.split('.')[1];
            const file_buffer = fs.readFileSync(filePath);

            let mimeType = mime.lookup(fileExt);

            if (mimeType === 'font/woff') {
              mimeType = 'application/woff'
            }

            const b64Content = file_buffer.toString('base64');
            node.value = `data:${mimeType};charset=utf-8;base64,${b64Content}`;
          }

          return node;
        })

        decl.value = decl.value.replace(decl.value, parsed);
      }
    }
  }
}

module.exports.postcss = true
