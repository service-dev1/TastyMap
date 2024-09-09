module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'eos-last': 'off',
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
