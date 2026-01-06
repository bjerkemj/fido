import { View, Text, ScrollView } from 'react-native';
import { Dog } from '@/types/dog';
import { Ionicons } from '@expo/vector-icons';

interface DogDetailContentProps {
    dog: Dog;
    showHeader?: boolean; // Optional: some contexts might handle header differently
}

export const DogDetailContent = ({ dog, showHeader = true }: DogDetailContentProps) => {
    return (
        <>
            {/* Header */}
            {showHeader && (
                <View style={{ marginBottom: 16 }}>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 8,
                    }}>
                        {dog.name}
                    </Text>
                    {dog.temperament && (
                        <Text style={{
                            fontSize: 16,
                            color: '#3B82F6',
                            fontWeight: '500',
                            fontStyle: 'italic',
                        }}>
                            {dog.temperament}
                        </Text>
                    )}
                </View>
            )}

            {/* Key Stats - Horizontal Grid */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 32,
                marginHorizontal: -4,
            }}>
                <StatBox label="Weight" value={`${Math.round(dog.min_weight)}-${Math.round(dog.max_weight)}kg`} />
                <StatBox label="Height" value={`${Math.round(dog.min_height)}-${Math.round(dog.max_height)}cm`} />
                <StatBox label="Life" value={`${dog.min_expectancy}-${dog.max_expectancy}y`} />
            </View>

            {/* About Section */}
            {dog.description && (
                <View style={{ marginBottom: 32 }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 8,
                    }}>
                        About
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        lineHeight: 22,
                        color: '#4B5563',
                    }}>
                        {dog.description}
                    </Text>
                </View>
            )}

            {/* Traits */}
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 16,
            }}>
                Traits
            </Text>
            <View style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 24,
                padding: 8,
                borderWidth: 1,
                borderColor: '#F3F4F6',
            }}>
                <TraitRow icon="flash-outline" label="Energy" value={dog.energy_level_category} />
                <TraitRow icon="school-outline" label="Training" value={dog.trainability_category} />
                <TraitRow icon="cut-outline" label="Grooming" value={dog.grooming_frequency_category} />
                <TraitRow icon="leaf-outline" label="Shedding" value={dog.shedding_category} />
                <TraitRow icon="people-outline" label="Demeanor" value={dog.demeanor_category} />
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