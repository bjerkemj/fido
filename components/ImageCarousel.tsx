import { View, FlatList, Image, Pressable } from 'react-native';
import { useRef, useState } from 'react';

const IMAGES = [
    'https://images.unsplash.com/photo-1611306133736-56a3b973b2cc?q=80&w=987&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1715033694586-26520baed94b?q=80&w=1770&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1657585685347-cfdc67c96f22?w=900&auto=format&fit=crop'
];

const ImageCarousel = () => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
        <View className="h-[450px] relative">
            <FlatList
                ref={flatListRef}
                data={IMAGES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / 300);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <Pressable onPress={(e) => {
                        const touchX = e.nativeEvent.locationX;
                        if (touchX < 150) {
                            goToPrev();
                        } else {
                            goToNext();
                        }
                    }}>
                        <Image
                            source={{ uri: item }}
                            className="w-[300px] h-[450px] rounded-3xl"
                            resizeMode="cover"
                        />
                    </Pressable>
                )}
            />
        </View>
    );
};

export default ImageCarousel;