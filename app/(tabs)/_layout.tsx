import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text } from 'react-native';

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#3B82F6',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarLabelPosition: 'beside-icon',
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
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="paw" size={22} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (
                            <Text
                                style={{
                                    color,
                                    fontSize: 14,
                                    fontWeight: '700',
                                    marginLeft: 4,
                                }}
                            >
                                Swipe
                            </Text>
                        ) : null,
                }}
            />

            <Tabs.Screen
                name="match-center"
                options={{
                    title: 'Matches',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="heart" size={22} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (
                            <Text
                                style={{
                                    color,
                                    fontSize: 14,
                                    fontWeight: '700',
                                    marginLeft: 4,
                                }}
                            >
                                Matches
                            </Text>
                        ) : null,
                }}
            />

            <Tabs.Screen
                name="extra"
                options={{
                    title: 'More',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ellipsis-horizontal" size={22} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (
                            <Text
                                style={{
                                    color,
                                    fontSize: 14,
                                    fontWeight: '700',
                                    marginLeft: 4,
                                }}
                            >
                                More
                            </Text>
                        ) : null,
                }}
            />
        </Tabs>
    );
};

export default _Layout;