import { View, Text } from 'react-native';
import { getTemperamentColor } from '@/constants/temperaments';

export const TemperamentChip = ({ trait }: { trait: string }) => {
    const color = getTemperamentColor(trait);
    return (
        <View style={{
            backgroundColor: `${color}15`,
            borderColor: color,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            marginRight: 6,
            marginBottom: 6,
        }}>
            <Text style={{ color: color, fontSize: 12, fontWeight: '600' }}>
                {trait}
            </Text>
        </View>
    );
};