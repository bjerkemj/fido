import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Disclaimers = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-800">Disclaimers</Text>
                </View>

                {/* CONTENT */}
                <View className="px-6 py-6">
                    {/* Important Notice Banner */}
                    <View className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 mb-6">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="alert-circle" size={20} color="#f59e0b" />
                            <Text className="text-amber-800 font-bold ml-2">Important Notice</Text>
                        </View>
                        <Text className="text-amber-700 text-sm leading-5">
                            Please read these disclaimers carefully before making any decisions based on the information provided in this app.
                        </Text>
                    </View>

                    {/* Do Your Own Research */}
                    <DisclaimerSection
                        icon="search-outline"
                        title="Do Your Own Research"
                        iconColor="#3b82f6"
                    >
                        <Text className="text-gray-600 leading-6">
                            Don't base your purchase entirely on the information in this app. Always conduct thorough research from multiple reliable sources before making any decisions about dog ownership or purchasing a specific breed.
                        </Text>
                    </DisclaimerSection>

                    {/* Information Accuracy */}
                    <DisclaimerSection
                        icon="information-circle-outline"
                        title="Information Accuracy"
                        iconColor="#8b5cf6"
                    >
                        <Text className="text-gray-600 leading-6 mb-3">
                            While we strive to provide accurate information, the data presented in this app may contain errors or inaccuracies. Dog breed characteristics can vary, and information may not be up to date.
                        </Text>
                        <Text className="text-gray-600 leading-6">
                            We strongly recommend consulting with veterinarians, professional breeders, and breed-specific organizations for the most accurate and current information.
                        </Text>
                    </DisclaimerSection>

                    {/* Regional Differences */}
                    <DisclaimerSection
                        icon="globe-outline"
                        title="Regional Differences"
                        iconColor="#10b981"
                    >
                        <Text className="text-gray-600 leading-6">
                            Dog breed standards, availability, and characteristics may vary significantly by region and country. Local regulations, breed standards, and typical traits may differ from the information provided in this app.
                        </Text>
                    </DisclaimerSection>

                    {/* Image Disclaimer */}
                    <DisclaimerSection
                        icon="image-outline"
                        title="Image Accuracy"
                        iconColor="#f59e0b"
                    >
                        <Text className="text-gray-600 leading-6">
                            All images in this app have been manually selected by humans and may not always accurately represent the breed shown. Images are intended for illustrative purposes only and may not reflect the full range of appearance within a breed.
                        </Text>
                    </DisclaimerSection>

                    {/* Final Note */}
                    <View className="bg-blue-50 rounded-xl p-5 mt-4">
                        <Text className="text-blue-900 font-semibold mb-2">Our Commitment</Text>
                        <Text className="text-blue-700 text-sm leading-5">
                            Fido is designed to help you explore and learn about different dog breeds. We encourage you to use this app as a starting point for your research, not as your only source of information.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- SUB-COMPONENT ---

const DisclaimerSection = ({
                               icon,
                               title,
                               iconColor,
                               children
                           }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    iconColor: string;
    children: React.ReactNode;
}) => (
    <View className="mb-6">
        <View className="flex-row items-center mb-3">
            <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${iconColor}15` }}
            >
                <Ionicons name={icon} size={20} color={iconColor} />
            </View>
            <Text className="text-lg font-bold text-gray-800 ml-3">{title}</Text>
        </View>
        <View className="ml-1">
            {children}
        </View>
    </View>
);

export default Disclaimers;