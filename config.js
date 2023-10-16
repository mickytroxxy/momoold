module.exports = (() => {
  return {
    source: ['./style-dictionary/**/*.json'],
    platforms: {
      'react-native': {
        transformGroup: 'react-native',
        buildPath: './src/style-dictionary-dist/',
        files: [
          {
            destination: 'momoStyle.js',
            format: 'javascript/es6',
          },
        ],
      },
 
    },
  };
})();
