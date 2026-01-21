import { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Fredoka_500Medium } from '@expo-google-fonts/fredoka';
import ImageCarousel from "@/components/ImageCarousel";
import DogDetailModal from "@/components/DogDetailModal";
import allDogs from "@/assets/data/dogs.json";
import { Dog } from "@/types/dog";
import { getUnseenDogsRandomized, addLikedDog, addDislikedDog } from "@/utils/dogStorage";
import {router} from "expo-router";

export default function Index() {
    const [unseenDogs, setUnseenDogs] = useState<Dog[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // Load fonts
    const [fontsLoaded] = useFonts({
        Fredoka_500Medium,
    });

    useEffect(() => {
        const loadDogs = async () => {
            const dogsWithImages = (allDogs as Dog[]).filter(dog =>
                Array.isArray(dog.images) && dog.images.length > 0
            );

            const unseen = await getUnseenDogsRandomized(dogsWithImages);
            setUnseenDogs(unseen);
            setLoading(false);
        };

        loadDogs();
    }, []);

    // Prefetch images for the next 3 dogs
    useEffect(() => {
        const prefetchNext = async () => {
            const nextDogs = unseenDogs.slice(currentIndex + 2, currentIndex + 5);

            for (const dog of nextDogs) {
                if (Array.isArray(dog.images)) {
                    for (const image of dog.images.slice(0, 2)) {
                        Image.prefetch(image.url).catch(() => {});
                    }
                }
            }
        };

        if (unseenDogs.length > 0) {
            prefetchNext();
        }
    }, [currentIndex, unseenDogs]);

    const handleLike = async () => {
        const currentDog = unseenDogs[currentIndex];
        await addLikedDog(currentDog.name);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handleDislike = async () => {
        const currentDog = unseenDogs[currentIndex];
        await addDislikedDog(currentDog.name);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    // Show loading while fonts or data loads
    if (!fontsLoaded || loading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text className="mt-4 text-gray-600">Loading dogs...</Text>
            </SafeAreaView>
        );
    }

    if (currentIndex >= unseenDogs.length) {
        return (
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View className="items-center mb-8">
                        <Text className="text-3xl font-extrabold text-gray-800">All done!</Text>
                        <Text className="text-gray-500 text-center mt-2">
                            You've gone through all the dogs available.
                        </Text>
                    </View>

                    {/* Action sections */}
                    <TouchableOpacity
                        className="mb-6 p-5 rounded-3xl bg-green-50 border-2 border-green-100 flex-row items-center justify-between shadow-sm"
                        activeOpacity={0.8}
                        onPress={() => router.push('/dog-list/liked')}
                    >
                        <View className="flex-1 mr-4">
                            <Text className="text-green-600 font-bold text-lg">Check out your liked dogs</Text>
                            <Text className="text-green-500 text-sm mt-1">
                                Narrow down your favorites and find your perfect companion!
                            </Text>
                        </View>
                        <View className="bg-green-100 p-3 rounded-full">
                            <Ionicons name="arrow-forward" size={24} color="#22c55e" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mb-6 p-5 rounded-3xl bg-blue-50 border-2 border-blue-100 flex-row items-center justify-between shadow-sm"
                        activeOpacity={0.8}
                        onPress={() => router.push('/new-owner-checklist')}
                    >
                        <View className="flex-1 mr-4">
                            <Text className="text-blue-600 font-bold text-lg">Go to New Owner Checklist</Text>
                            <Text className="text-blue-500 text-sm mt-1">
                                Prepare yourself with everything you need before bringing your dog home!
                            </Text>
                        </View>
                        <View className="bg-blue-100 p-3 rounded-full">
                            <Ionicons name="arrow-forward" size={24} color="#3b82f6" />
                        </View>
                    </TouchableOpacity>

                    {/* Optional fun message at the bottom */}
                    <View className="mt-8 items-center">
                        <Text className="text-gray-400 text-sm text-center">
                            🐾 Take your time exploring and preparing—your future dog will thank you!
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );

    }

    const currentDog = unseenDogs[currentIndex];
    const nextDog1 = unseenDogs[currentIndex + 1];
    const nextDog2 = unseenDogs[currentIndex + 2];

    const currentImages = Array.isArray(currentDog?.images) ? currentDog.images : [];
    const nextImages1 = nextDog1 && Array.isArray(nextDog1.images) ? nextDog1.images : [];
    const nextImages2 = nextDog2 && Array.isArray(nextDog2.images) ? nextDog2.images : [];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* HEADER */}
            <View className="items-center">
                <Text style={{ fontFamily: 'Fredoka_500Medium', fontSize: 32, color: '#60a5fa' }}>
                    fido
                </Text>
            </View>

            {/* MIDDLE */}
            <View className="flex-1 items-center justify-center px-4">
                {/* Current dog - visible */}
                <ImageCarousel key={currentDog.name} images={currentImages} />

                {/* Pre-mount NEXT 2 dogs - hidden but mounted */}
                <View style={{ position: 'absolute', left: -10000, top: 0 }}>
                    {nextDog1 && nextImages1.length > 0 && (
                        <ImageCarousel key={nextDog1.name} images={nextImages1} />
                    )}
                    {nextDog2 && nextImages2.length > 0 && (
                        <ImageCarousel key={nextDog2.name} images={nextImages2} />
                    )}
                </View>
            </View>

            {/* FOOTER */}
            <View className="px-6">
                <View className="mb-1">
                    <Text className="font-bold text-gray-600 text-2xl">
                        {currentDog.name}
                    </Text>
                </View>

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
                        onPress={() => setModalVisible(true)}
                    >
                        <Text className="text-blue-500 font-semibold text-sm">
                            View more
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View className="flex-row items-center justify-center gap-28 pb-5">
                    <TouchableOpacity
                        className="w-16 h-16 bg-red-400 rounded-full items-center justify-center shadow"
                        activeOpacity={0.7}
                        onPress={handleDislike}
                    >
                        <Ionicons name="close" size={36} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-16 h-16 bg-green-400 rounded-full items-center justify-center shadow"
                        activeOpacity={0.7}
                        onPress={handleLike}
                    >
                        <Ionicons name="heart" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <DogDetailModal
                visible={modalVisible}
                dog={currentDog}
                onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
}