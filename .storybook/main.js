
module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    './stories/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/component/**/*.stories.?(ts|tsx|js|jsx)',
    // '../src/component/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-notes',
  ],
  babelOptions: {
    root: '../'
  },
};





  // webpackFinal: async (config, {configType}) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@': path.resolve(__dirname, '../src/'),
  //   };
  //   return config;
  // },



    // webpackFinal: async (config, {configType}) => {
  //   // config.resolve.modules = [
  //   //   ...(config.resolve.modules || []),
  //   //   path.resolve(__dirname, "../"),
  //   // ];
  //   // config.resolve.plugins = [
  //   //   ...config.resolve.plugins,
  //   //   new TsconfigPathsPlugin({
  //   //     configFile: path.resolve(__dirname, '../tsconfig.json'),
  //   //   })
  //   // ];

  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     // '@': path.resolve(__dirname, 'src'),
  //     '@': path.resolve(__dirname, '..', 'src'),
  //     // '@': path.resolve(__dirname, '../src/'),
  //   };

  //   return config;
  // },