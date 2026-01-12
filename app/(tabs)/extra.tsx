import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    getLikedDogs,
    getDislikedDogs,
    clearAllPreferences,
} from '@/utils/dogStorage';

export default function StorageDebug() {
    const printResults = async () => {
        try {
            const liked = await getLikedDogs();
            const disliked = await getDislikedDogs();

            console.log('❤️ LIKED DOGS:', liked);
            console.log('❌ DISLIKED DOGS:', disliked);

            Alert.alert(
                'Printed to console',
                `Liked: ${liked.length}\nDisliked: ${disliked.length}`
            );
        } catch (err) {
            console.error('Failed to read dog storage:', err);
        }
    };

    const resetAll = () => {
        Alert.alert(
            'Reset all dog decisions?',
            'This will clear liked and disliked dogs.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await clearAllPreferences();
                        Alert.alert('Done', 'Dog storage cleared.');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
            <Text className="text-2xl font-bold mb-8 text-gray-800">
                Storage Debug
            </Text>

            <TouchableOpacity
                onPress={printResults}
                className="w-full bg-blue-500 py-4 rounded-xl mb-4"
                activeOpacity={0.8}
            >
                <Text className="text-white text-center font-bold text-lg">
                    Print liked & disliked dogs
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={resetAll}
                className="w-full bg-red-500 py-4 rounded-xl"
                activeOpacity={0.8}
            >
                <Text className="text-white text-center font-bold text-lg">
                    Reset dog storage
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
