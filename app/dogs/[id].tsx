import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import allDogs from '@/assets/data/dogs.json';
import { Dog } from '@/types/dog';
import ImageCarousel from '@/components/ImageCarousel';
import { moveDogToCategory } from '@/utils/dogStorage';
import { Ionicons } from '@expo/vector-icons';
import { DogDetailContent } from "@/components/DogDetailContent";

export default function DogDetailScreen() {
    const { id, currentCategory } = useLocalSearchParams();
    const router = useRouter();

    const dog = allDogs.find(d => d.name === id) as Dog;
    const isLiked = currentCategory === 'liked';

    if (!dog) return <Text>Dog not found</Text>;

    const images = Array.isArray(dog.images) ? dog.images : [];

    const handleMove = () => {
        const nextAction = isLiked ? "disliked" : "liked";

        Alert.alert(
            "Change Category?",
            `Are you sure you want to move ${dog.name} to your ${isLiked ? 'Disliked' : 'Liked'} list?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Move",
                    style: "destructive",
                    onPress: async () => {
                        await moveDogToCategory(dog.name, nextAction);
                        router.back();
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* HEADER */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-3xl font-bold text-gray-800 ml-2 flex-1" numberOfLines={1}>
                    {dog.name}
                </Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* IMAGE CAROUSEL - Centered */}
                <View className="items-center justify-center w-full py-6">
                    <ImageCarousel images={images} />
                </View>

                {/* DOG DETAILS - With proper padding */}
                <View className="px-6">
                    <DogDetailContent dog={dog} showHeader={false} />
                </View>
            </ScrollView>

            {/* ACTION BUTTON */}
            <View className="px-6 py-4 border-t border-gray-100">
                <TouchableOpacity
                    onPress={handleMove}
                    style={{ backgroundColor: isLiked ? '#f87171' : '#4ade80' }}
                    className="py-4 rounded-2xl items-center shadow-sm"
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-bold text-lg">
                        Move to {isLiked ? 'Disliked' : 'Liked'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}