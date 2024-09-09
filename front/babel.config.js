module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
    // ['transform-remove-console', {exclude: ['error', 'warn']}],
  ],
};
