import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  value: number;
  isActive: boolean;
  lastValue: boolean;
  firstValue: boolean;
}

const Button: React.VFC<ButtonProps> = ({
  onPress,
  value,
  isActive,
  firstValue,
  lastValue,
}) => {
  const activeStyle = isActive ? styles.activeButton : null;
  const firstStyle = firstValue ? styles.firstButton : null;
  const lastStyle = lastValue ? styles.lastButton : null;
  const activeTextStyle = isActive ? styles.activeButtonTextStyle : null;
  return (
    <TouchableOpacity
      style={[styles.button, activeStyle, firstStyle, lastStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonTextStyle, activeTextStyle]}>{value}</Text>
    </TouchableOpacity>
  );
};

interface ButtonSliderProps {
  onPress: (value: number) => void;
  activeValue: number;
  values?: number[];
}
const ButtonSlider: React.VFC<ButtonSliderProps> = ({
  onPress,
  activeValue,
  values = [1, 1.5, 2, 2.5, 3, 3.5, 4],
}) => {
  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <Button
          lastValue={index === values.length - 1}
          firstValue={index === 0}
          key={`ButtonSlider: ${value}`}
          isActive={value <= activeValue}
          onPress={() => onPress(value)}
          value={value}
        ></Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    marginRight: 8,
  },
  firstButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  lastButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderRightWidth: 1,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  activeButton: {
    backgroundColor: '#009933',
  },
  activeButtonTextStyle: {
    color: '#FFF',
  },
  button: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 38,
    borderColor: 'black',
    justifyContent: 'center',
    width: 38,
  },
});

export default ButtonSlider;
