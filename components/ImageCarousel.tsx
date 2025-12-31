import { View, FlatList, Image, Pressable, Text, ActivityIndicator } from 'react-native';
import { useRef, useState } from 'react';
import { DogImage } from '@/types/dog';

interface ImageCarouselProps {
    images: DogImage[];
}

const CARD_WIDTH = 320;
const CARD_HEIGHT = 520;
const CARD_BORDER_RADIUS = 16;
const TAP_THRESHOLD = CARD_WIDTH / 2;

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
    const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
        Object.fromEntries(images.map((_, i) => [i, true]))
    );

    const goToNext = () => {
        if (currentIndex < images.length - 1) {
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
        setImageLoading(prev => ({ ...prev, [index]: false }));
    };

    if (images.length === 0) {
        return (
            <View style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: CARD_BORDER_RADIUS,
                backgroundColor: '#f3f4f6',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 40 }}>🐕</Text>
                <Text style={{ color: '#6b7280', marginTop: 8 }}>No images available</Text>
            </View>
        );
    }

    return (
        <View style={{ height: CARD_HEIGHT, position: 'relative' }}>
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.url}-${index}`}
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
                                    <Text style={{ fontSize: 40, marginBottom: 10 }}>🐕</Text>
                                    <Text style={{ color: '#dc2626', fontWeight: '600', fontSize: 16 }}>
                                        Image failed to load
                                    </Text>
                                </View>
                            )}

                            {/* Image */}
                            <Image
                                source={{ uri: item.url }}
                                style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                                resizeMode="cover"
                                onError={() => handleImageError(index, item.url)}
                                onLoad={() => handleImageLoad(index)}
                            />
                        </View>
                    </Pressable>
                )}
            />

            {/* Pagination Dots */}
            {images.length > 1 && (
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
                    {images.map((_, index) => (
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
            )}
        </View>
    );
};

export default ImageCarousel;