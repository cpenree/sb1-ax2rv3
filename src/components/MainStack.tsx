import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from './auth/LoginScreen';
import { HomeScreen } from './home/HomeScreen';
import { GameDetailsScreen } from './games/GameDetailsScreen';
import { CircleScreen } from './circles/CircleScreen';
import { ChatScreen } from './chat/ChatScreen';
import { CreateEventScreen } from './events/CreateEventScreen';
import { ProfileScreen } from './profile/ProfileScreen';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2563eb',
                },
                headerTintColor: '#ffffff',
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Nexium' }}
            />
            <StackNavigator.Screen
                name="GameDetails"
                component={GameDetailsScreen}
                options={{ title: 'Game Details' }}
            />
            <StackNavigator.Screen
                name="Circle"
                component={CircleScreen}
                options={{ title: 'Gaming Circle' }}
            />
            <StackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={{ title: 'Circle Chat' }}
            />
            <StackNavigator.Screen
                name="CreateEvent"
                component={CreateEventScreen}
                options={{ title: 'Create Event' }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);