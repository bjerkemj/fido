import {View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, Linking} from 'react-native';
import { Dog } from '@/types/dog';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';
import { TemperamentChip } from './TemperamentChip';
import licenses from '@/assets/data/licenses.json';
import { LicenseInfo } from '@/types/license';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface DogDetailContentProps {
    dog: Dog;
    showHeader?: boolean;
}

export const DogDetailContent = ({ dog, showHeader = true }: DogDetailContentProps) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [creditsExpanded, setCreditsExpanded] = useState(false);

    const fullDescription = dog.description || '';

    // Memoize the truncation logic for performance
    const { truncatedDescription, shouldTruncate } = useMemo(() => {
        // Match sentences ending in punctuation
        const sentences = fullDescription.match(/[^.!?]+[.!?]+/g) || [];

        if (sentences.length <= 3) {
            return { truncatedDescription: fullDescription, shouldTruncate: false };
        }

        return {
            truncatedDescription: sentences.slice(0, 3).join('').trim(),
            shouldTruncate: true
        };
    }, [fullDescription]);

    const toggleExpand = () => {
        // Animates the height change of the container
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const getLicenseInfo = (licenseKey: string | null): LicenseInfo | null => {
        if (!licenseKey) return null;
        return (licenses as Record<string, LicenseInfo>)[licenseKey] || null;
    };

    return (
        <>
            {/* Header - Now only contains the Name */}
            {showHeader && (
                <View style={{ marginBottom: 16 }}>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#111827',
                    }}>
                        {dog.name}
                    </Text>
                </View>
            )}

            {/* Temperament - Moved here to be always visible */}
            {dog.temperament && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
                    {dog.temperament.split(',').map((trait) => (
                        <TemperamentChip key={trait.trim()} trait={trait.trim()} />
                    ))}
                </View>
            )}

            {/* Key Stats */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32, marginHorizontal: -4 }}>
                <StatBox
                    label="Weight"
                    value={
                        Math.round(dog.min_weight) === Math.round(dog.max_weight)
                            ? `${Math.round(dog.min_weight)}kg`
                            : `${Math.round(dog.min_weight)}-${Math.round(dog.max_weight)}kg`
                    }
                />
                <StatBox
                    label="Height"
                    value={
                        Math.round(dog.min_height) === Math.round(dog.max_height)
                            ? `${Math.round(dog.min_height)}cm`
                            : `${Math.round(dog.min_height)}-${Math.round(dog.max_height)}cm`
                    }
                />
                <StatBox
                    label="Life"
                    value={
                        dog.min_expectancy === dog.max_expectancy
                            ? `${dog.min_expectancy}y`
                            : `${dog.min_expectancy}-${dog.max_expectancy}y`
                    }
                />
            </View>

            {/* About Section */}
            {fullDescription.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>
                        About
                    </Text>

                    <Text style={{ fontSize: 15, lineHeight: 22, color: '#4B5563' }}>
                        {isDescriptionExpanded ? fullDescription : truncatedDescription}
                        {!isDescriptionExpanded && shouldTruncate && ' '}

                        {/* Nested Text acts as an inline button */}
                        {shouldTruncate && (
                            <Text
                                onPress={toggleExpand}
                                style={{
                                    color: '#3B82F6',
                                    fontWeight: '600',
                                    fontSize: 14,
                                }}
                            >
                                {isDescriptionExpanded ? ' Show less' : 'Show more'}
                            </Text>
                        )}
                    </Text>
                </View>
            )}

            {/* Traits */}
            {(dog.energy_level_category || dog.trainability_category || dog.grooming_frequency_category || dog.shedding_category || dog.demeanor_category) && (
                <>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 }}>
                        Traits
                    </Text>
                    <View style={{ backgroundColor: '#F9FAFB', borderRadius: 24, padding: 8, borderWidth: 1, borderColor: '#F3F4F6' }}>
                        <TraitRow icon="flash-outline" label="Energy" value={dog.energy_level_category} />
                        <TraitRow icon="school-outline" label="Training" value={dog.trainability_category} />
                        <TraitRow icon="cut-outline" label="Grooming" value={dog.grooming_frequency_category} />
                        <TraitRow icon="leaf-outline" label="Shedding" value={dog.shedding_category} />
                        <TraitRow icon="people-outline" label="Demeanor" value={dog.demeanor_category} />
                    </View>
                </>
            )}

            {/* Image Credits */}
            <View style={{ marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
                <TouchableOpacity
                    onPress={() => setCreditsExpanded(!creditsExpanded)}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}
                    activeOpacity={0.7}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="camera-outline" size={16} color="#9CA3AF" />
                        <Text style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 8, fontWeight: '500' }}>
                            Photo Credits ({dog.images.length})
                        </Text>
                    </View>
                    <Ionicons
                        name={creditsExpanded ? "chevron-up" : "chevron-down"}
                        size={16}
                        color="#9CA3AF"
                    />
                </TouchableOpacity>

                {creditsExpanded && (
                    <View style={{ backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12 }}>
                        {dog.images.map((image, index) => {
                            const licenseInfo = getLicenseInfo(image.license);

                            return (
                                <View
                                    key={index}
                                    style={{
                                        paddingVertical: 8,
                                        borderBottomWidth: index < dog.images.length - 1 ? 1 : 0,
                                        borderBottomColor: '#F3F4F6'
                                    }}
                                >
                                    {/* Author and Source */}
                                    <Text style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>
                                        <Text style={{ color: '#9CA3AF' }}>{index + 1}. </Text>
                                        <Text style={{ fontWeight: '600' }}>{image.author}</Text>
                                        {' · '}
                                        <Text style={{ color: '#9CA3AF' }}>{image.source}</Text>
                                    </Text>

                                    {/* License Info */}
                                    {licenseInfo ? (
                                        // License with link (from licenses.json)
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, flexWrap: 'wrap' }}>
                                            <TouchableOpacity
                                                onPress={() => Linking.openURL(licenseInfo.link)}
                                                activeOpacity={0.7}
                                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                            >
                                                <Ionicons name="document-text-outline" size={10} color="#3B82F6" />
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: '#3B82F6',
                                                    marginLeft: 4,
                                                    textDecorationLine: 'underline'
                                                }}>
                                                    {licenseInfo.name}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 4 }}>
                                                · Image may be cropped
                                            </Text>
                                        </View>
                                    ) : image.license ? (
                                        // License without link (like "Public Domain")
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, flexWrap: 'wrap' }}>
                                            <Ionicons name="document-text-outline" size={10} color="#9CA3AF" />
                                            <Text style={{
                                                fontSize: 10,
                                                color: '#6B7280',
                                                marginLeft: 4
                                            }}>
                                                {image.license}
                                            </Text>
                                            <Text style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 4 }}>
                                                · Image may be cropped
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
        </>
    );
};

// Export sub-components for reuse
export const StatBox = ({ label, value }: { label: string; value: string | number }) => (
    <View style={{
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    }}>
        <Text style={{
            fontSize: 10,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#9CA3AF',
            letterSpacing: 1,
            marginBottom: 4,
        }}>
            {label}
        </Text>
        <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#111827',
        }}>
            {value}
        </Text>
    </View>
);

export const TraitRow = ({ icon, label, value }: { icon: any, label: string, value?: string }) => {
    if (!value) return null;
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={icon} size={18} color="#9CA3AF" />
                <Text style={{ marginLeft: 12, color: '#6B7280', fontWeight: '500' }}>
                    {label}
                </Text>
            </View>
            <Text style={{ color: '#111827', fontWeight: 'bold' }}>
                {value}
            </Text>
        </View>
    );
};