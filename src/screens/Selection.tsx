import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './utils/Types';

type Props = StackScreenProps<RootStackParamList, 'Selection'>;

const SelectionScreen: React.VFC<Props> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Run');
  };
  return (
    <View style={styles.container}>
      <Button onPress={onPress} title='Start' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SelectionScreen;
