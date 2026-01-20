import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TermsOfService = () => {
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
                    <Text className="text-2xl font-bold text-gray-800">Terms of Service</Text>
                </View>

                {/* CONTENT */}
                <View className="px-6 py-6">
                    <Text className="text-xs text-gray-400 mb-6">Last Updated: January 19, 2026</Text>

                    {/* Introduction */}
                    <Section title="1. Acceptance of Terms">
                        <Paragraph>
                            By downloading, installing, or using the Fido mobile application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.
                        </Paragraph>
                    </Section>

                    {/* Description of Service */}
                    <Section title="2. Description of Service">
                        <Paragraph>
                            Fido is an educational and informational tool designed to help users explore and learn about different dog breeds. The App provides:
                        </Paragraph>
                        <BulletPoint>Breed information including temperament, size, and characteristics</BulletPoint>
                        <BulletPoint>Images of various dog breeds</BulletPoint>
                        <BulletPoint>A swipe-based interface to save preferred breeds</BulletPoint>
                        <BulletPoint>Local storage of user preferences</BulletPoint>
                    </Section>

                    {/* Informational Purpose */}
                    <Section title="3. Informational Purpose Only">
                        <Paragraph>
                            The App is provided for informational and educational purposes only. Fido is NOT:
                        </Paragraph>
                        <BulletPoint>Professional veterinary advice</BulletPoint>
                        <BulletPoint>Professional breeding advice</BulletPoint>
                        <BulletPoint>A substitute for consultation with qualified professionals</BulletPoint>
                        <BulletPoint>A comprehensive guide for dog ownership decisions</BulletPoint>
                        <Paragraph style={{ marginTop: 12 }}>
                            Users should conduct their own thorough research and consult with veterinarians, professional breeders, animal behaviorists, and local shelters before making any decisions about dog ownership or breed selection.
                        </Paragraph>
                    </Section>

                    {/* User Responsibilities */}
                    <Section title="4. User Responsibilities">
                        <Paragraph>
                            By using the App, you agree to:
                        </Paragraph>
                        <BulletPoint>Use the App for lawful purposes only</BulletPoint>
                        <BulletPoint>Not rely solely on the App for making dog purchasing or adoption decisions</BulletPoint>
                        <BulletPoint>Conduct additional independent research before acquiring any dog breed</BulletPoint>
                        <BulletPoint>Understand that breed characteristics can vary individually</BulletPoint>
                        <BulletPoint>Not redistribute, modify, or reverse engineer the App</BulletPoint>
                        <BulletPoint>Respect all applicable local laws and regulations regarding pet ownership</BulletPoint>
                    </Section>

                    {/* Disclaimers */}
                    <Section title="5. Disclaimer of Warranties">
                        <Paragraph>
                            THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                        </Paragraph>
                        <BulletPoint>Accuracy, completeness, or reliability of information</BulletPoint>
                        <BulletPoint>Fitness for a particular purpose</BulletPoint>
                        <BulletPoint>Non-infringement of third-party rights</BulletPoint>
                        <BulletPoint>Uninterrupted or error-free operation</BulletPoint>
                        <Paragraph style={{ marginTop: 12 }}>
                            We make no guarantees that the information provided is current, accurate, or suitable for your specific circumstances. Dog breed characteristics may vary by region, individual dog, and breeding lines.
                        </Paragraph>
                    </Section>

                    {/* Accuracy of Information */}
                    <Section title="6. Accuracy of Information">
                        <Paragraph>
                            While we strive to provide accurate information, we cannot guarantee that:
                        </Paragraph>
                        <BulletPoint>All breed information is complete or up-to-date</BulletPoint>
                        <BulletPoint>Images accurately represent all variations within a breed</BulletPoint>
                        <BulletPoint>Breed characteristics apply universally to all individual dogs</BulletPoint>
                        <BulletPoint>Regional differences in breed standards are fully captured</BulletPoint>
                        <Paragraph style={{ marginTop: 12 }}>
                            Information in the App is aggregated from various sources and may contain errors or omissions.
                        </Paragraph>
                    </Section>

                    {/* Image Attribution */}
                    <Section title="7. Image Rights and Attribution">
                        <Paragraph>
                            Images displayed in the App are sourced from third-party providers including Unsplash and Pixabay. These images:
                        </Paragraph>
                        <BulletPoint>Are manually selected and may not represent every variation of a breed</BulletPoint>
                        <BulletPoint>Remain the property of their respective photographers</BulletPoint>
                        <BulletPoint>Are used under the respective platforms' licenses</BulletPoint>
                        <BulletPoint>May not be extracted or redistributed by users</BulletPoint>
                        <Paragraph style={{ marginTop: 12 }}>
                            For specific image credits, please see each dog's detail section.
                        </Paragraph>
                    </Section>

                    {/* Limitation of Liability */}
                    <Section title="8. Limitation of Liability">
                        <Paragraph>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
                        </Paragraph>
                        <BulletPoint>Any decisions made based on information provided in the App</BulletPoint>
                        <BulletPoint>Any direct, indirect, incidental, or consequential damages</BulletPoint>
                        <BulletPoint>Loss of data, profits, or business opportunities</BulletPoint>
                        <BulletPoint>Issues arising from dog ownership decisions</BulletPoint>
                        <BulletPoint>Inaccuracies or errors in the content provided</BulletPoint>
                        <Paragraph style={{ marginTop: 12 }}>
                            You use the App at your own risk and are solely responsible for any decisions made based on the information provided.
                        </Paragraph>
                    </Section>

                    {/* Intellectual Property */}
                    <Section title="9. Intellectual Property">
                        <Paragraph>
                            The App, including its design, code, features, and original content (excluding third-party images), is owned by Fido and protected by copyright and other intellectual property laws. You may not:
                        </Paragraph>
                        <BulletPoint>Copy, modify, or distribute the App or its content</BulletPoint>
                        <BulletPoint>Reverse engineer or decompile the App</BulletPoint>
                        <BulletPoint>Remove any copyright or proprietary notices</BulletPoint>
                        <BulletPoint>Use the App's content for commercial purposes without permission</BulletPoint>
                    </Section>

                    {/* User Data */}
                    <Section title="10. User Data">
                        <Paragraph>
                            All user preferences (liked and disliked breeds) are stored locally on your device using AsyncStorage. We do not collect, transmit, or store this data on external servers.
                        </Paragraph>
                    </Section>

                    {/* Third-Party Links */}
                    <Section title="11. Third-Party Content">
                        <Paragraph>
                            The App may contain links to or content from third-party services (such as image providers). We are not responsible for:
                        </Paragraph>
                        <BulletPoint>The accuracy or availability of third-party content</BulletPoint>
                        <BulletPoint>Privacy practices of third-party services</BulletPoint>
                        <BulletPoint>Any damages arising from your use of third-party services</BulletPoint>
                    </Section>

                    {/* Modifications */}
                    <Section title="12. Changes to the App and Terms">
                        <Paragraph>
                            We reserve the right to:
                        </Paragraph>
                        <BulletPoint>Modify, suspend, or discontinue the App at any time</BulletPoint>
                        <BulletPoint>Update these Terms of Service</BulletPoint>
                        <BulletPoint>Add or remove features</BulletPoint>
                        <Paragraph style={{ marginTop: 12 }}>
                            Continued use of the App after changes constitutes acceptance of the modified Terms. We will update the "Last Updated" date at the top of this document when changes are made.
                        </Paragraph>
                    </Section>

                    {/* Termination */}
                    <Section title="13. Termination">
                        <Paragraph>
                            We reserve the right to terminate or restrict your access to the App at any time, without notice, for any reason. You may stop using the App at any time by uninstalling it from your device.
                        </Paragraph>
                    </Section>

                    {/* Governing Law */}
                    <Section title="14. Governing Law">
                        <Paragraph>
                            These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
                        </Paragraph>
                    </Section>

                    {/* Contact */}
                    <Section title="15. Contact Information">
                        <Paragraph>
                            If you have questions about these Terms of Service, please contact us through the App Store listing.
                        </Paragraph>
                    </Section>

                    {/* Severability */}
                    <Section title="16. Severability">
                        <Paragraph>
                            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                        </Paragraph>
                    </Section>

                    {/* Final Note */}
                    <View className="bg-blue-50 rounded-xl p-5 mt-6 mb-4">
                        <Text className="text-blue-900 font-semibold mb-2">Remember</Text>
                        <Text className="text-blue-700 text-sm leading-5">
                            Fido is a tool to help you explore dog breeds, but it should never be your only source of information. Always consult with professionals and do thorough research before making any decisions about dog ownership.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- SUB-COMPONENTS ---

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-3">{title}</Text>
        {children}
    </View>
);

const Paragraph = ({ children, style }: { children: React.ReactNode; style?: any }) => (
    <Text className="text-gray-600 leading-6 mb-3" style={style}>
        {children}
    </Text>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
    <View className="flex-row mb-2 ml-2">
        <Text className="text-gray-600 mr-2">•</Text>
        <Text className="text-gray-600 leading-6 flex-1">{children}</Text>
    </View>
);

export default TermsOfService;