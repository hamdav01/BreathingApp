import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  width?: number;
}

const CustomButton: React.VFC<Props> = ({
  onPress,
  text,
  width = 100,
  backgroundColor = '#528feb',
  textColor = '#e9edf5',
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={StyleSheet.flatten([styles.button, { backgroundColor, width }])}
      >
        <Text style={StyleSheet.flatten([styles.text, { color: textColor }])}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    minHeight: 40,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e9edf5',
  },
});

export default CustomButton;
