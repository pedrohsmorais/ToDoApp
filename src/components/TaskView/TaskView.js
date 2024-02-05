import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn, FadeOut } from 'react-native-reanimated';

const TaskView = ({ item, onToggleDone }) => {
    const opacity = useSharedValue(0);

    opacity.value = withTiming(item.done ? 1 : 0, {
        duration: 200,
  });

    const animatedStyle = useAnimatedStyle(() => {
        return {
        opacity: opacity.value,
        };
    });


    return (
    <Animated.View entering={FadeIn.duration(800)} exiting={FadeOut.duration(100)}>
      <TouchableOpacity style={styles.taskItem} 
        activeOpacity={1} 
        onPress={() => onToggleDone(item.id)}
        >
        <View style={styles.checkbox}>
          <Animated.View style={[ styles.checked, animatedStyle]}>
            {item.done && (
              <Ionicons name="checkmark" size={24} color="black" style={styles.checkIcon} />
            )}
          </Animated.View>
        </View>
        <Text style={styles.checkboxLabel}>{item.description}</Text>
        </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        backgroundColor: '#333',
        height: 60,
        width: '95%',
        borderRadius: 5,
        padding: 10,
        marginTop: 16,
        alignItems: 'center',
      },
      checkboxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      checkbox: {
        width: 30,
        height: 30,
        borderWidth: 1.5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
      },
      checked: {
        width: 30,
        height: 30,
        borderWidth: 1.5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: '#ffd700',
      },
      checkboxLabel: {
        color:'#F5F5F5',
        marginLeft: 8,
        fontSize: 18,
      },
});

export default TaskView;
