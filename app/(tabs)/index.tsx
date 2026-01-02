import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import ImageCarousel from "@/components/ImageCarousel";
import allDogs from "@/assets/data/dogs.json";
import { Dog } from "@/types/dog";
import { getUnseenDogs, addLikedDog, addDislikedDog } from "@/utils/dogStorage";

export default function Index() {
    const [unseenDogs, setUnseenDogs] = useState<Dog[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Load unseen dogs on mount
    useEffect(() => {
        const loadDogs = async () => {
            const dogsWithImages = (allDogs as Dog[]).filter(dog =>
                Array.isArray(dog.images) && dog.images.length > 0
            );

            const unseen = await getUnseenDogs(dogsWithImages);
            setUnseenDogs(unseen);
            setLoading(false);
        };

        loadDogs();
    }, []);

    const handleLike = async () => {
        const currentDog = unseenDogs[currentIndex];
        await addLikedDog(currentDog.name);
        moveToNext();
    };

    const handleDislike = async () => {
        const currentDog = unseenDogs[currentIndex];
        await addDislikedDog(currentDog.name);
        moveToNext();
    };

    const moveToNext = () => {
        if (currentIndex < unseenDogs.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Loading state
    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text className="mt-4 text-gray-600">Loading dogs...</Text>
            </SafeAreaView>
        );
    }

    // No more dogs to show
    if (currentIndex >= unseenDogs.length) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-2xl font-bold text-gray-800">
                    🎉 All done!
                </Text>
                <Text className="mt-2 text-gray-600">
                    You've seen all {unseenDogs.length} dogs
                </Text>
            </SafeAreaView>
        );
    }

    const currentDog = unseenDogs[currentIndex];
    const images = Array.isArray(currentDog.images) ? currentDog.images : [];

    // Get next 2 dogs for pre-rendering
    const nextDogs = unseenDogs.slice(currentIndex + 1, currentIndex + 3);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* FIXED HEADER */}
            <View className="items-center">
                <Text className="font-bold text-blue-400 text-2xl">fido</Text>
            </View>

            {/* FLEXIBLE MIDDLE - Takes remaining space */}
            <View className="flex-1 items-center justify-center px-4">
                {/* Current dog carousel - visible */}
                <ImageCarousel
                    key={currentDog.name}
                    images={images}
                />

                {/* Pre-render next dogs off-screen */}
                <View style={{ position: 'absolute', left: -10000, top: 0 }}>
                    {nextDogs.map((dog) => {
                        const dogImages = Array.isArray(dog.images) ? dog.images : [];
                        return (
                            <ImageCarousel
                                key={dog.name}
                                images={dogImages}
                            />
                        );
                    })}
                </View>
            </View>

            {/* FIXED FOOTER */}
            <View className="px-6">
                {/* Dog Name */}
                <View className="mb-1">
                    <Text className="font-bold text-gray-600 text-2xl">
                        {currentDog.name}
                    </Text>
                </View>

                {/* Temperament and View More */}
                <View className="flex-row justify-between items-center mb-4">
                    {currentDog.temperament ? (
                        <Text className="text-gray-500 text-sm flex-1 mr-2">
                            {currentDog.temperament}
                        </Text>
                    ) : (
                        <View className="flex-1" />
                    )}

                    <TouchableOpacity
                        className="bg-gray-100 px-3 py-1.5 rounded-full"
                        activeOpacity={0.6}
                    >
                        <Text className="text-blue-500 font-semibold text-sm">
                            View more
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View className="flex-row items-center justify-center gap-8">
                    {/* DISLIKE BUTTON */}
                    <TouchableOpacity
                        className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border-4 border-red-500"
                        activeOpacity={0.7}
                        onPress={handleDislike}
                    >
                        <Image
                            source={icons.dislike}
                            className="w-16 h-16"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* LIKE BUTTON */}
                    <TouchableOpacity
                        className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg border-4 border-green-500"
                        activeOpacity={0.7}
                        onPress={handleLike}
                    >
                        <Image
                            source={icons.like}
                            className="w-16 h-16"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}