import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { firebase } from '@nativescript/firebase-core';
import { MainStack } from './components/MainStack';

// Initialize Firebase
firebase.initializeApp({
  // Your Firebase config will be automatically injected in the StackBlitz environment
});

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

ReactNativeScript.start(React.createElement(MainStack, {}, null));