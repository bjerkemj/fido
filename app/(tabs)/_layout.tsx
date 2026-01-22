import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

/**
 * FIXED: Animated Label
 * Uses FadeIn with a duration.
 * To avoid the .distance() error, we use a simple horizontal entry.
 */
const AnimatedLabel = ({ color, title }: { color: string; title: string }) => (
    <Animated.Text
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(100)}
        style={{
            color,
            fontSize: 14,
            fontWeight: '700',
            marginLeft: 4
        }}
    >
        {title}
    </Animated.Text>
);

const TabButton = (props: any) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable
            {...props}
            onPressIn={() => (scale.value = withTiming(0.96, { duration: 100 }))}
            onPressOut={() => (scale.value = withTiming(1, { duration: 100 }))}
            style={[{ flex: 1 }, props.style]}
        >
            <Animated.View
                style={[{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }, animatedStyle]}
            >
                {props.children}
            </Animated.View>
        </Pressable>
    );
};

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#3B82F6',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarLabelPosition: 'beside-icon',
                tabBarHideOnKeyboard: true,
                tabBarButton: (props) => <TabButton {...props} />,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                    paddingBottom: Platform.OS === 'ios' ? 25 : 12,
                    paddingTop: 12,
                    height: Platform.OS === 'ios' ? 88 : 65,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Swipe',
                    tabBarIcon: ({ color }) => <Ionicons name="paw" size={22} color={color} />,
                    tabBarLabel: ({ focused, color }) =>
                        focused ? <AnimatedLabel color={color} title="Swipe" /> : null,
                }}
            />
            <Tabs.Screen
                name="match-center"
                options={{
                    title: 'Matches',
                    tabBarIcon: ({ color }) => <Ionicons name="heart" size={22} color={color} />,
                    tabBarLabel: ({ focused, color }) =>
                        focused ? <AnimatedLabel color={color} title="Matches" /> : null,
                }}
            />
        </Tabs>
    );
};

export default _Layout;