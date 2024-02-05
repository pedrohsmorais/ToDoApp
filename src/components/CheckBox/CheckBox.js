import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const CheckBox = ({ item, selectedItems}) => {
  const opacity = useSharedValue(0);

  opacity.value = withTiming(selectedItems.includes(item.id) ? 1 : 0, {
    duration: 200,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
      <View style={styles.checkbox}>
        <Animated.View style={[styles.checked, animatedStyle]}>
          {selectedItems.includes(item.id) && (
            <Ionicons name="checkmark" size={24} color="black" style={styles.checkIcon} />
          )}
        </Animated.View>
      </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#FF1040',
  },
  checkIcon: {
    marginLeft: 1,
  },
});

export default CheckBox;
