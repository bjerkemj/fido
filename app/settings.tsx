import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
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
                    <Text className="text-2xl font-bold text-gray-800">Settings & Info</Text>
                </View>

                {/* SECTIONS */}
                <View className="px-6 py-6">
                    {/* Helpful Resources */}
                    <SettingsSection title="Helpful Resources">
                        <SettingsItem
                            icon="checkmark-circle-outline"
                            label="New Owner Checklist"
                            onPress={() => router.push('/settings/new-owner-checklist')}
                        />
                    </SettingsSection>

                    {/* About & Legal */}
                    <SettingsSection title="About & Legal">
                        <SettingsItem
                            icon="information-circle-outline"
                            label="Disclaimers"
                            onPress={() => router.push('/settings/disclaimers')}
                        />
                        <SettingsItem
                            icon="shield-outline"
                            label="Privacy Policy"
                            onPress={() => router.push('/settings/privacy')}
                        />
                        <SettingsItem
                            icon="document-text-outline"
                            label="Terms of Service"
                            onPress={() => router.push('/settings/terms')}
                        />
                    </SettingsSection>

                    {/* App Info */}
                    <View className="mt-8 items-center">
                        <Text className="text-gray-400 text-xs">Fido App v1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- SUB-COMPONENTS ---

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View className="mb-6">
        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-1">
            {title}
        </Text>
        <View className="bg-gray-50 rounded-2xl overflow-hidden">
            {children}
        </View>
    </View>
);

const SettingsItem = ({
                          icon,
                          label,
                          onPress
                      }: {
    icon: keyof typeof Ionicons.glyphMap,
    label: string,
    onPress: () => void
}) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
        activeOpacity={0.7}
    >
        <View className="flex-row items-center flex-1">
            <Ionicons name={icon} size={22} color="#9ca3af" />
            <Text className="text-gray-700 text-base ml-3">{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </TouchableOpacity>
);

export default Settings;