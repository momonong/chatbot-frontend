const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '#minpath': require.resolve('path-browserify'),
    },
  },
};
