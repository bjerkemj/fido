import React, { useState, useCallback } from 'react'; // Added useCallback
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from "expo-router"; // Added useFocusEffect
import { getLikedDogs, getDislikedDogs } from '@/utils/dogStorage';
import allDogs from '@/assets/data/dogs.json';
import { Dog } from '@/types/dog';
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get('window').width;

const MatchCenter = () => {
    const [likedList, setLikedList] = useState<Dog[]>([]);
    const [dislikedList, setDislikedList] = useState<Dog[]>([]);
    const router = useRouter();

    // Re-fetch data every time the user navigates back to this screen
    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                const likedNames = await getLikedDogs();
                const dislikedNames = await getDislikedDogs();

                const likedData = allDogs.filter(d => likedNames.includes(d.name)) as Dog[];
                const dislikedData = allDogs.filter(d => dislikedNames.includes(d.name)) as Dog[];

                setLikedList(likedData);
                setDislikedList(dislikedData);
            };

            loadData();
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* In HEADER section */}
                <View className="px-6 py-4 flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="text-3xl font-extrabold text-gray-800">Match Center</Text>
                        <Text className="text-gray-500">Manage your pack</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/settings')}
                        className="p-2"
                        activeOpacity={0.6}
                    >
                        <Ionicons name="settings-outline" size={26} color="#9ca3af" />
                    </TouchableOpacity>
                </View>

                {/* SECTIONS */}
                <DogSection
                    title="Liked Dogs"
                    dogs={likedList}
                    accentColor="#4ade80"
                    count={likedList.length}
                    onPressMore={() => router.push('/dog-list/liked')}
                />

                <View className="mt-6">
                    <DogSection
                        title="Disliked Dogs"
                        dogs={dislikedList}
                        accentColor="#f87171"
                        count={dislikedList.length}
                        onPressMore={() => router.push('/dog-list/disliked')}
                    />
                </View>

                {/* COMING SECTION */}
                <View className="mx-6 mb-8 p-6 rounded-3xl bg-blue-50 border-2 border-blue-100 flex-row items-center justify-between">
                    {/* Left side: text */}
                    <View className="flex-1 mr-4">
                        <Text className="text-blue-600 font-bold text-lg">Exciting Updates Ahead!</Text>
                        <Text className="text-blue-400 text-sm">
                            We’re working on new features just for you. Got ideas or feedback? We’d love to hear them!
                        </Text>
                    </View>

                    {/* Right side: optional icon */}
                    <View>
                        <Text className="text-blue-300 font-bold text-xl">🚀</Text>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

// --- SUB-COMPONENT ---
const DogSection = ({ title, dogs, accentColor, count, onPressMore }: { title: string, dogs: Dog[], accentColor: string, count: number, onPressMore: () => void }) => {
    const displayCount = Math.min(dogs.length, 6);
    const displayDogs = dogs.slice(0, displayCount);
    const remainingCount = dogs.length - displayCount;

    // Determine layout based on count
    const getLayout = () => {
        if (dogs.length === 0) return 'empty';
        if (dogs.length === 1) return 'single';
        if (dogs.length === 2) return 'double';
        return 'grid';
    };

    const layout = getLayout();

    return (
        <View className="w-full">
            <View className="flex-row justify-between items-center px-6 mb-4">
                <View className="flex-row items-center">
                    <View style={{ backgroundColor: accentColor }} className="w-2 h-8 rounded-full mr-3" />
                    <Text className="text-xl font-bold text-gray-800">{title}</Text>
                    <Text className="ml-2 text-gray-400 font-medium">({count})</Text>
                </View>
                {dogs.length > 0 && (
                    <TouchableOpacity onPress={onPressMore}>
                        <Text style={{ color: '#60a5fa' }} className="font-bold">View all</Text>
                    </TouchableOpacity>
                )}
            </View>

            {layout === 'empty' && (
                <View className="mx-6 py-10 items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <Text className="text-gray-400 italic">No dogs here yet...</Text>
                </View>
            )}

            {layout === 'single' && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPressMore}
                    className="px-6 items-center"
                >
                    <Image
                        source={{ uri: dogs[0].images[0]?.url }}
                        style={{ width: SCREEN_WIDTH - 48, height: 200 }}
                        className="rounded-2xl bg-gray-100"
                    />
                    <Text className="text-base font-bold text-gray-600 mt-3">
                        {dogs[0].name}
                    </Text>
                </TouchableOpacity>
            )}

            {layout === 'double' && (
                <View className="px-6 flex-row justify-between">
                    {dogs.map((dog) => (
                        <TouchableOpacity
                            key={dog.name}
                            activeOpacity={0.9}
                            onPress={onPressMore}
                            className="items-center"
                        >
                            <Image
                                source={{ uri: dog.images[0]?.url }}
                                style={{ width: (SCREEN_WIDTH - 64) / 2, height: 140 }}
                                className="rounded-2xl bg-gray-100"
                            />
                            <Text numberOfLines={1} className="text-sm font-bold text-gray-600 mt-2" style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                                {dog.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {layout === 'grid' && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPressMore}
                    className="px-6"
                >
                    <View className="flex-row flex-wrap justify-between">
                        {displayDogs.slice(0, 5).map((dog) => (
                            <View key={dog.name} className="mb-4">
                                <Image
                                    source={{ uri: dog.images[0]?.url }}
                                    style={{ width: (SCREEN_WIDTH - 64) / 3, height: 100 }}
                                    className="rounded-2xl bg-gray-100"
                                />
                                <Text numberOfLines={1} className="text-[10px] font-bold text-gray-500 mt-1 w-20 text-center">
                                    {dog.name}
                                </Text>
                            </View>
                        ))}

                        {remainingCount > 0 && (
                            <View className="mb-4 items-center justify-center bg-gray-100 rounded-2xl" style={{ width: (SCREEN_WIDTH - 64) / 3, height: 100 }}>
                                <Text className="text-2xl font-bold text-gray-400">+{remainingCount}</Text>
                                <Text className="text-xs text-gray-500 mt-1">more</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default MatchCenter;