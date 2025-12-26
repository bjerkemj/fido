import { View, FlatList, Image, Pressable, Text, ActivityIndicator } from 'react-native';
import { useRef, useState } from 'react';

const IMAGES = [
    'https://images.unsplash.com/photo-1611306133736-56a3b973b2cc?q=80&w=987&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1715033694586-26520baed94b?q=80&w=1770&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1657585685347-cfdc67c96f22?w=900&auto=format&fit=crop'
];

// CONSTANTS - Adjust these to experiment with sizing
const CARD_WIDTH = 320;
const CARD_HEIGHT = 520;
const CARD_BORDER_RADIUS = 16;
const TAP_THRESHOLD = CARD_WIDTH / 2; // Tap left/right of center to navigate

const ImageCarousel = () => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
    const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({
        0: true,
        1: true,
        2: true
    });

    const goToNext = () => {
        if (currentIndex < IMAGES.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
            setCurrentIndex(prevIndex);
        }
    };

    const handleImageError = (index: number, uri: string) => {
        console.log(`Image ${index} failed to load:`, uri);
        setImageErrors(prev => ({ ...prev, [index]: true }));
        setImageLoading(prev => ({ ...prev, [index]: false }));
    };

    const handleImageLoad = (index: number) => {
        console.log(`Image ${index} loaded successfully`);
        setImageLoading(prev => ({ ...prev, [index]: false }));
    };

    return (
        <View style={{ height: CARD_HEIGHT, position: 'relative' }}>
            <FlatList
                ref={flatListRef}
                data={IMAGES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
                    setCurrentIndex(index);
                }}
                renderItem={({ item, index }) => (
                    <Pressable
                        onPress={(e) => {
                            const touchX = e.nativeEvent.locationX;
                            if (touchX < TAP_THRESHOLD) {
                                goToPrev();
                            } else {
                                goToNext();
                            }
                        }}
                        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                    >
                        <View style={{
                            width: CARD_WIDTH,
                            height: CARD_HEIGHT,
                            borderRadius: CARD_BORDER_RADIUS,
                            backgroundColor: '#f3f4f6',
                            overflow: 'hidden'
                        }}>
                            {/* Loading Indicator */}
                            {imageLoading[index] && !imageErrors[index] && (
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1
                                }}>
                                    <ActivityIndicator size="large" color="#3b82f6" />
                                    <Text style={{ marginTop: 10, color: '#6b7280' }}>
                                        Loading image...
                                    </Text>
                                </View>
                            )}

                            {/* Error State */}
                            {imageErrors[index] && (
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fee2e2',
                                    zIndex: 1
                                }}>
                                    <Text style={{
                                        fontSize: 40,
                                        marginBottom: 10
                                    }}>
                                        🐕
                                    </Text>
                                    <Text style={{
                                        color: '#dc2626',
                                        fontWeight: '600',
                                        fontSize: 16
                                    }}>
                                        Image failed to load
                                    </Text>
                                    <Text style={{
                                        color: '#991b1b',
                                        fontSize: 12,
                                        marginTop: 4
                                    }}>
                                        Tap to navigate
                                    </Text>
                                </View>
                            )}

                            {/* Image */}
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT
                                }}
                                resizeMode="cover"
                                onError={() => handleImageError(index, item)}
                                onLoad={() => handleImageLoad(index)}
                            />
                        </View>
                    </Pressable>
                )}
            />

            {/* Pagination Dots */}
            <View style={{
                position: 'absolute',
                bottom: 16,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
            }}>
                {IMAGES.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: currentIndex === index ? 24 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: currentIndex === index ? '#3b82f6' : 'rgba(255, 255, 255, 0.5)'
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default ImageCarousel;