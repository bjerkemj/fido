import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import ImageCarousel from "@/components/ImageCarousel";
import allDogs from "@/assets/data/dogs.json";
import { Dog, DogImage } from "@/types/dog";
import { getUnseenDogs, addLikedDog, addDislikedDog } from "@/utils/dogStorage";

export default function Index() {
    const [unseenDogs, setUnseenDogs] = useState<Dog[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Load unseen dogs on mount
    useEffect(() => {
        const loadDogs = async () => {
            // Filter to only dogs with images
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

    return (
        <SafeAreaView className="flex-1 bg-white items-center">
            <View className="items-center w-full">
                {/* TOP TEXT */}
                <View className="mt-1">
                    <Text className="font-bold text-blue-400 text-2xl">fido</Text>
                </View>

                {/* CARD SECTION */}
                <View className="items-center mt-4">
                    <View className="w-[320px]">
                        {/* Pass images to carousel - key forces remount on dog change */}
                        <ImageCarousel
                            key={currentDog.name}
                            images={images}
                        />

                        <View className="flex-row justify-between items-center mt-3">
                            <Text className="font-bold text-gray-600 text-2xl">
                                {currentDog.name}
                            </Text>

                            <TouchableOpacity
                                className="bg-gray-100 px-3 py-1.5 rounded-full"
                                activeOpacity={0.6}
                            >
                                <Text className="text-blue-500 font-semibold text-sm">
                                    View more
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Optional: Show temperament */}
                        {currentDog.temperament && (
                            <Text className="text-gray-500 text-sm mt-2">
                                {currentDog.temperament}
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            {/* BUTTONS */}
            <View className="absolute bottom-7 flex-row items-center justify-center w-full gap-8">
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

        </SafeAreaView>
    );
}