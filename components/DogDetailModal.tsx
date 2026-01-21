import { Modal, View, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dog } from '@/types/dog';
import { DogDetailContent } from "@/components/DogDetailContent";

interface DogDetailModalProps {
    visible: boolean;
    dog: Dog;
    onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

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

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
        }).start(() => onClose());
    };

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <TouchableOpacity activeOpacity={1} onPress={handleClose} style={{ flex: 1}} />

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
                        overflow: 'hidden',
                    }}
                >
                    {/* Close Button */}
                    <View style={{
                        paddingTop: 16,
                        paddingHorizontal: 24,
                        paddingBottom: 8,
                        backgroundColor: 'white',
                        zIndex: 10,
                    }}>
                        <TouchableOpacity
                            onPress={handleClose}
                            style={{
                                position: 'absolute',
                                top: 14,
                                right: 16,
                                width: 32,
                                height: 32,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close" size={24} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    {/* Scrollable Content */}
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60, paddingTop: 24 }}
                        showsVerticalScrollIndicator={false}
                        bounces={true}
                    >
                        <DogDetailContent dog={dog} />
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default DogDetailModal;