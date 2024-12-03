import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.nexium',
  appPath: 'src',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    maxLogcatObjectSize: 2048,
    discardUncaughtJsExceptions: true
  },
  ios: {
    discardUncaughtJsExceptions: true,
    SPMPackages: []
  },
  webpackConfigPath: 'webpack.config.js',
  useLibs: true,
  cssParser: 'postcss'
} as NativeScriptConfig;