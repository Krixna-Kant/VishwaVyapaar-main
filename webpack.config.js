// webpack.config.js
const path = require('path');

module.exports = {
  // Your existing config
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false, 
      "os": require.resolve("os-browserify/browser"),
    },
  },
  // Other configurations...
};