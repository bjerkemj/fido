import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

const PrivacyPolicy = () => {
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
                        <Ionicons name="arrow-back" size={24} color="#374151"/>
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-800">Privacy Policy</Text>
                </View>

                {/* CONTENT */}
                <View className="px-6 py-6">
                    <Text className="text-xs text-gray-400 mb-6">Last Updated: January 22, 2026</Text>

                    {/* Privacy First Notice */}
                    <View className="bg-green-50 rounded-xl p-4 mb-6 border-l-4 border-green-400">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="shield-checkmark" size={20} color="#10b981"/>
                            <Text className="text-green-900 font-semibold ml-2">Privacy First</Text>
                        </View>
                        <Text className="text-green-700 text-sm leading-5">
                            Your privacy matters. All your data stays on your device - we don't collect, store, or
                            transmit any of your personal information or preferences.
                        </Text>
                    </View>

                    {/* Introduction */}
                    <Section title="Our Commitment to Your Privacy">
                        <Paragraph>
                            Fido ("we," "our," or "the App") is committed to protecting your privacy. This Privacy
                            Policy explains how we handle information when you use our mobile application.
                        </Paragraph>
                    </Section>

                    {/* What We Don't Collect */}
                    <Section title="What We DON'T Collect">
                        <Paragraph>
                            We want to be crystal clear: we do not collect, store, transmit, or have access to:
                        </Paragraph>
                        <BulletPoint>Your liked or disliked dog preferences</BulletPoint>
                        <BulletPoint>Your name, email, or any personal identifiers</BulletPoint>
                        <BulletPoint>Your location data</BulletPoint>
                        <BulletPoint>Your browsing history within the app</BulletPoint>
                        <BulletPoint>Any photos or content you view</BulletPoint>
                        <BulletPoint>Device information beyond what's required for the app to function</BulletPoint>
                    </Section>

                    {/* Local Storage */}
                    <Section title="Local Storage Only">
                        <Paragraph>
                            All of your preferences (which dogs you've liked or disliked) are stored locally on your
                            device using AsyncStorage. This means:
                        </Paragraph>
                        <BulletPoint>Your data never leaves your device</BulletPoint>
                        <BulletPoint>We have no access to your preferences</BulletPoint>
                        <BulletPoint>No servers receive or store your data</BulletPoint>
                        <BulletPoint>If you delete the app, all your data is permanently removed</BulletPoint>
                    </Section>

                    {/* Third-Party Services */}
                    <Section title="Third-Party Image Services">
                        <Paragraph>
                            Some breed images are loaded from third‑party services such as Unsplash, Pexels, Pixabay,
                            Flickr, and Wikimedia Commons.
                            These services may collect information about your device and usage through cookies, IP
                            addresses, analytics, and log data according to their own privacy policies.
                            We do not control these third parties’ data practices. Please review their respective
                            privacy policies to understand how they may collect or use your data.
                        </Paragraph>
                        <BulletPoint>
                            <Text style={{textDecorationLine: 'underline', color: '#2563eb'}}
                                  onPress={() => Linking.openURL('https://unsplash.com/privacy')}>
                                Unsplash Privacy Policy
                            </Text>
                        </BulletPoint>
                        <BulletPoint>
                            <Text style={{textDecorationLine: 'underline', color: '#2563eb'}}
                                  onPress={() => Linking.openURL('https://www.pexels.com/privacy-policy/')}>
                                Pexels Privacy Policy
                            </Text>
                        </BulletPoint>
                        <BulletPoint>
                            <Text style={{textDecorationLine: 'underline', color: '#2563eb'}}
                                  onPress={() => Linking.openURL('https://pixabay.com/service/terms/')}>
                                Pixabay Privacy Policy
                            </Text>
                        </BulletPoint>
                        <BulletPoint>
                            <Text style={{textDecorationLine: 'underline', color: '#2563eb'}}
                                  onPress={() => Linking.openURL('https://www.flickr.com/help/privacy')}>
                                Flickr Privacy Policy
                            </Text>
                        </BulletPoint>
                        <BulletPoint>
                            <Text style={{textDecorationLine: 'underline', color: '#2563eb'}}
                                  onPress={() => Linking.openURL('https://foundation.wikimedia.org/wiki/Policy:Privacy_policy')}>
                                Wikimedia Privacy Policy
                            </Text>
                        </BulletPoint>
                    </Section>


                    {/* No Tracking */}
                    <Section title="No Tracking or Analytics">
                        <Paragraph>
                            We do not use any analytics services, tracking tools, or advertising networks. Your usage of
                            the App is completely private.
                        </Paragraph>
                    </Section>

                    {/* No Accounts */}
                    <Section title="No Accounts Required">
                        <Paragraph>
                            Fido does not require you to create an account, log in, or provide any personal information
                            to use the app. You can start exploring dog breeds immediately without sharing any details
                            about yourself.
                        </Paragraph>
                    </Section>

                    {/* Data Security */}
                    <Section title="Data Security">
                        <Paragraph>
                            Since all your data is stored locally on your device and never transmitted to our servers,
                            the security of your data is primarily dependent on your device's security. We recommend:
                        </Paragraph>
                        <BulletPoint>Keeping your device's operating system up to date</BulletPoint>
                        <BulletPoint>Using device encryption if available</BulletPoint>
                        <BulletPoint>Using a secure lock screen</BulletPoint>
                    </Section>

                    {/* Changes to Privacy Policy */}
                    <Section title="Changes to This Privacy Policy">
                        <Paragraph>
                            We may update this Privacy Policy from time to time. Any changes will be reflected by
                            updating the "Last Updated" date at the top of this policy. We encourage you to review this
                            policy periodically.
                        </Paragraph>
                        <Paragraph style={{marginTop: 12}}>
                            If we ever change our practices regarding data collection, we will notify users through the
                            app and obtain consent where required by law.
                        </Paragraph>
                    </Section>

                    {/* Contact */}
                    <Section title="Contact Us">
                        <Paragraph>
                            If you have any questions about this Privacy Policy, please contact us through the App Store
                            listing.
                        </Paragraph>
                    </Section>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- SUB-COMPONENTS ---

const Section = ({title, children}: { title: string; children: React.ReactNode }) => (
    <View className="mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-3">{title}</Text>
        {children}
    </View>
);

const Paragraph = ({children, style}: { children: React.ReactNode; style?: any }) => (
    <Text className="text-gray-600 leading-6 mb-3" style={style}>
        {children}
    </Text>
);

const BulletPoint = ({children}: { children: React.ReactNode }) => (
    <View className="flex-row mb-2 ml-2">
        <Text className="text-gray-600 mr-2">•</Text>
        <Text className="text-gray-600 leading-6 flex-1">{children}</Text>
    </View>
);

export default PrivacyPolicy;