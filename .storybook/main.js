const path = require('path')

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
      },
    },
    { name: 'storybook/addon-docs', options: { configureJSX: true } },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?modules', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
