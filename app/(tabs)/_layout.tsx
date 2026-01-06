import { View, Text } from 'react-native';
import React from 'react';
import {Tabs} from "expo-router";

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                }} />
            <Tabs.Screen
                name='match-center'
                options={{
                    title: 'Match Center',
                    headerShown: false,
                }} />
            <Tabs.Screen
                name='extra'
                options={{
                    title: 'Extra',
                    headerShown: false,
                }} />
        </Tabs>

    )
}

export default _Layout;