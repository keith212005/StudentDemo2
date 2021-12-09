module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: [
          {'@src': './src/'},
          {'@api': './src/services/api/index'},
          {'@models': './src/services/models'},
          {'@utils': './src/utils/'},
          {'@assets': './src/assets/'},
          {'@event-emitter': './src/services/event-emitter'},
          {'@local-storage': './src/services/local-storage'},
          {'@actions': './src/actions'},
          {'@api': './src/api'},
          {'@components': './src/components'},
          {'@constants': './src/constants'},
          {'@languages': './src/languages'},
          {'@navigator': './src/navigator'},
          {'@reducers': './src/reducers'},
          {'@resources': './src/resources'},
          {'@screens': './src/screens'},
          {'@services': './src/services'},
          {'@storage': './src/storage'},
          {'@utils': './src/utils'},
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
