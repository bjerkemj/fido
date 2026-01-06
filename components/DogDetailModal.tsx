import { Modal, View, Text, TouchableOpacity, Animated, Dimensions, PanResponder, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';
import { Dog } from '@/types/dog';

interface DogDetailModalProps {
    visible: boolean;
    dog: Dog;
    onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DRAG_THRESHOLD = 100;

const DogDetailModal = ({ visible, dog, onClose }: DogDetailModalProps) => {
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(SCREEN_HEIGHT);
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 20,
                stiffness: 90,
            }).start();
        }
    }, [visible]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                // Only allow dragging down
                if (gestureState.dy > 0) {
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > DRAG_THRESHOLD) {
                    Animated.timing(slideAnim, {
                        toValue: SCREEN_HEIGHT,
                        duration: 250,
                        useNativeDriver: true,
                    }).start(() => onClose());
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if (!visible) return null;

    // Helper to render stat rows
    const StatRow = ({ label, value }: { label: string; value: string | number }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
        }}>
            <Text style={{ fontSize: 15, color: '#6B7280', fontWeight: '500' }}>{label}</Text>
            <Text style={{ fontSize: 15, color: '#111827', fontWeight: '600' }}>{value}</Text>
        </View>
    );

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <TouchableOpacity activeOpacity={1} onPress={onClose} style={{ flex: 1 }} />

                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: SCREEN_HEIGHT * 0.85,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        transform: [{ translateY: slideAnim }],
                        overflow: 'hidden', // Keeps content inside rounded corners
                    }}
                >
                    {/* --- THE DRAG HANDLE (Only this part triggers the slide) --- */}
                    <View
                        {...panResponder.panHandlers}
                        style={{
                            paddingTop: 12,
                            paddingBottom: 20,
                            alignItems: 'center',
                            backgroundColor: 'white', // Ensure it has a background to catch touches
                            zIndex: 10,
                        }}
                    >
                        <View style={{
                            width: 40,
                            height: 5,
                            backgroundColor: '#D1D5DB',
                            borderRadius: 10,
                        }} />
                    </View>

                    {/* --- THE SCROLLABLE CONTENT (Independent of PanResponder) --- */}
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60 }}
                        showsVerticalScrollIndicator={true} // Set to true to help users see they can scroll
                        bounces={true}
                    >

                        {/* Header */}

                        <View style={{ marginBottom: 24 }}>

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

                                }}>

                                    {dog.temperament}

                                </Text>

                            )}

                        </View>


                        {/* Description */}

                        {dog.description && (

                            <View style={{ marginBottom: 24 }}>

                                <Text style={{

                                    fontSize: 18,

                                    fontWeight: '600',

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


                        {/* Key Stats */}

                        <View style={{ marginBottom: 24 }}>

                            <Text style={{

                                fontSize: 18,

                                fontWeight: '600',

                                color: '#111827',

                                marginBottom: 12,

                            }}>

                                Key Stats

                            </Text>

                            <View style={{

                                backgroundColor: '#F9FAFB',

                                borderRadius: 12,

                                padding: 16,

                            }}>

                                <StatRow label="Group" value={dog.group} />

                                <StatRow

                                    label="Height"

                                    value={`${Math.round(dog.min_height)}-${Math.round(dog.max_height)} cm`}

                                />

                                <StatRow

                                    label="Weight"

                                    value={`${Math.round(dog.min_weight)}-${Math.round(dog.max_weight)} kg`}

                                />

                                <StatRow

                                    label="Life Span"

                                    value={`${dog.min_expectancy}-${dog.max_expectancy} years`}

                                />

                            </View>

                        </View>


                        {/* Characteristics */}

                        <View style={{ marginBottom: 24 }}>

                            <Text style={{

                                fontSize: 18,

                                fontWeight: '600',

                                color: '#111827',

                                marginBottom: 12,

                            }}>

                                Characteristics

                            </Text>

                            <View style={{

                                backgroundColor: '#F9FAFB',

                                borderRadius: 12,

                                padding: 16,

                            }}>

                                {dog.energy_level_category && (

                                    <StatRow label="Energy Level" value={dog.energy_level_category} />

                                )}

                                {dog.trainability_category && (

                                    <StatRow label="Trainability" value={dog.trainability_category} />

                                )}

                                {dog.grooming_frequency_category && (

                                    <StatRow label="Grooming" value={dog.grooming_frequency_category} />

                                )}

                                {dog.shedding_category && (

                                    <StatRow label="Shedding" value={dog.shedding_category} />

                                )}

                                {dog.demeanor_category && (

                                    <StatRow label="Demeanor" value={dog.demeanor_category} />

                                )}

                            </View>

                        </View>

                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default DogDetailModal;