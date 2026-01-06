import React, {useCallback, useEffect, useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Stack, useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLikedDogs, getDislikedDogs } from '@/utils/dogStorage';
import allDogs from '@/assets/data/dogs.json';
import { Dog } from '@/types/dog';
import { Ionicons } from '@expo/vector-icons'; // Built into Expo

const SCREEN_WIDTH = Dimensions.get('window').width;
const COLUMN_COUNT = 2;
const GAP = 12;
const ITEM_WIDTH = (SCREEN_WIDTH - (GAP * 3)) / COLUMN_COUNT;

const ExpandedDogList = () => {
    const { type } = useLocalSearchParams();
    const router = useRouter();
    const [dogs, setDogs] = useState<Dog[]>([]);

    const isLikedView = type === 'liked';

    // We use the full strength colors here for the background
    const accentColor = isLikedView ? '#4ade80' : '#f87171';
    const headerTitle = isLikedView ? 'Liked Dogs' : 'Disliked Dogs';

    useFocusEffect(
        useCallback(() => {
            const loadDogs = async () => {
                const names = isLikedView ? await getLikedDogs() : await getDislikedDogs();
                const filtered = allDogs.filter(d => names.includes(d.name)) as Dog[];
                const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
                setDogs(sorted);
            };

            loadDogs();
        }, [isLikedView]) // Re-run if we switch between liked/disliked
    );

    useEffect(() => {
        const loadDogs = async () => {
            const names = isLikedView ? await getLikedDogs() : await getDislikedDogs();
            const filtered = allDogs.filter(d => names.includes(d.name)) as Dog[];
            const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
            setDogs(sorted);
        };
        loadDogs();
    }, [type]);

    return (
        // We set the SafeAreaView background to match the header color
        // to prevent a white bar at the very top of the screen
        <SafeAreaView style={{ flex: 1, backgroundColor: accentColor }} edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* FULL COLOR HEADER */}
            <View
                style={{ backgroundColor: accentColor }}
                className="px-6 py-1 flex-row items-center justify-between"
            >
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <Text className="text-xl font-bold text-white">
                    {headerTitle}
                </Text>

                {/* Spacer to keep title centered */}
                <View style={{ width: 40 }} />
            </View>

            {/* MAIN CONTENT AREA */}
            <View className="flex-1 bg-white">
                <FlatList
                    data={dogs}
                    keyExtractor={(item) => item.name}
                    numColumns={COLUMN_COUNT}
                    contentContainerStyle={{ padding: GAP }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="mb-4 bg-white rounded-3xl shadow-sm border border-gray-100"
                            style={{ width: ITEM_WIDTH }}
                            onPress={() => router.push({
                                // 1. Use the EXACT name of the file in your file tree
                                pathname: "/dogs/[id]",
                                // 2. Pass the "id" (the name) and the "category" in the params
                                params: {
                                    id: item.name,
                                    currentCategory: type
                                }
                            })}
                        >
                            <Image
                                source={{ uri: item.images[0]?.url }}
                                style={{ width: '100%', height: ITEM_WIDTH }}
                                className="rounded-t-3xl bg-gray-50"
                            />
                            <View className="p-3">
                                <Text
                                    numberOfLines={2}
                                    className="font-bold text-gray-800 text-sm leading-5"
                                >
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default ExpandedDogList;