import { Modal, View, TouchableOpacity, Animated, Dimensions, PanResponder, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';
import { Dog } from '@/types/dog';
import { DogDetailContent } from "@/components/DogDetailContent";

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
                        overflow: 'hidden',
                    }}
                >
                    {/* Drag Handle */}
                    <View
                        {...panResponder.panHandlers}
                        style={{
                            paddingTop: 12,
                            paddingBottom: 20,
                            alignItems: 'center',
                            backgroundColor: 'white',
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

                    {/* Scrollable Content */}
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60 }}
                        showsVerticalScrollIndicator={true}
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