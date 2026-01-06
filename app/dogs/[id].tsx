import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import allDogs from '@/assets/data/dogs.json';
import { Dog } from '@/types/dog';
import ImageCarousel from '@/components/ImageCarousel';
import {moveDogToCategory} from '@/utils/dogStorage';
import { Ionicons } from '@expo/vector-icons';

export default function DogDetailScreen() {
    const { id, currentCategory } = useLocalSearchParams();
    const router = useRouter();

    const dog = allDogs.find(d => d.name === id) as Dog;
    const isLiked = currentCategory === 'liked';

    if (!dog) return <Text>Dog not found</Text>;

    const handleMove = () => {
        const nextAction = isLiked ? "disliked" : "liked"; // Lowercase to match our type

        Alert.alert(
            "Change Category?",
            `Are you sure you want to move ${dog.name} to your ${isLiked ? 'Disliked' : 'Liked'} list?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Move",
                    style: "destructive",
                    onPress: async () => {
                        // Call our new robust function
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

            {/* HEADER (Standardized with Modal Style) */}
            <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-3xl font-bold text-gray-800 ml-2 flex-1" numberOfLines={1}>
                    {dog.name}
                </Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* CENTERED CAROUSEL */}
                <View className="items-center justify-center w-full py-6">
                    <ImageCarousel images={dog.images} />
                </View>

                <View className="px-6 pb-10">
                    {dog.group && (
                        <View className="bg-blue-50 self-start px-3 py-1 rounded-full mb-2">
                            <Text className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                                {dog.group} Group
                            </Text>
                        </View>
                    )}

                    <Text className="text-blue-500 font-semibold mb-6 italic">
                        {dog.temperament}
                    </Text>

                    {/* KEY STATS (Horizontal Grid from Modal) */}
                    <View className="flex-row justify-between mb-8 -mx-1">
                        <StatBox label="Weight" value={`${Math.round(dog.min_weight)}-${Math.round(dog.max_weight)}kg`} />
                        <StatBox label="Height" value={`${Math.round(dog.min_height)}-${Math.round(dog.max_height)}cm`} />
                        <StatBox label="Life" value={`${dog.min_expectancy}-${dog.max_expectancy}y`} />
                    </View>

                    {/* About Section */}
                    {dog.description && (
                        <View className="mb-8">
                            <Text className="text-lg font-bold text-gray-900 mb-2">About</Text>
                            <Text className="text-gray-600 leading-6 text-base">
                                {dog.description}
                            </Text>
                        </View>
                    )}

                    {/* Traits List (Standardized with Modal Style) */}
                    <Text className="text-lg font-bold text-gray-900 mb-4">Traits</Text>
                    <View className="bg-gray-50 rounded-3xl p-2 border border-gray-100">
                        <TraitRow icon="flash-outline" label="Energy" value={dog.energy_level_category} />
                        <TraitRow icon="school-outline" label="Training" value={dog.trainability_category} />
                        <TraitRow icon="cut-outline" label="Grooming" value={dog.grooming_frequency_category} />
                        <TraitRow icon="leaf-outline" label="Shedding" value={dog.shedding_category} />
                    </View>
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

// Reusable Sub-components (Keep these at the bottom of the file)
const StatBox = ({ label, value }: { label: string; value: string | number }) => (
    <View className="bg-gray-50 rounded-2xl p-4 flex-1 mx-1 items-center justify-center border border-gray-100">
        <Text className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">{label}</Text>
        <Text className="text-sm font-bold text-gray-800">{value}</Text>
    </View>
);

const TraitRow = ({ icon, label, value }: { icon: any, label: string, value?: string }) => {
    if (!value) return null;
    return (
        <View className="flex-row items-center justify-between p-4 border-b border-white/50 last:border-b-0">
            <View className="flex-row items-center">
                <Ionicons name={icon} size={18} color="#9CA3AF" />
                <Text className="ml-3 text-gray-600 font-medium">{label}</Text>
            </View>
            <Text className="text-gray-900 font-bold">{value}</Text>
        </View>
    );
};