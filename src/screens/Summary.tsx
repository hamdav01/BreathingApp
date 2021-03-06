import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import shortid from 'shortid';
import CustomButton from '../components/Button';
import { getTodaysDate } from './utils/Date';
import { calculateAverage } from './utils/Number';
import { storeObjectData } from './utils/Storage';
import { RootStackParamList } from './utils/Types';

type Props = StackScreenProps<RootStackParamList, 'Summary'>;

export const SummaryScreen: React.VFC<Props> = ({ route, navigation }) => {
  const [saving, setIsSaving] = useState(false);
  const roundsData = route?.params?.rounds;
  const average = calculateAverage(roundsData);
  const onOk = async () => {
    setIsSaving(true);
    const date = getTodaysDate();
    try {
      await storeObjectData(date, { average, roundsData });
      navigation.navigate('Selection');
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        {[calculateAverage(roundsData), ...roundsData].map((value, index) => (
          <View
            style={[styles.tableRow, index % 2 ? styles.odd : styles.even]}
            key={shortid.generate()}
          >
            <Text style={styles.text}>
              {index === 0 ? 'Average:' : `Round: ${index}`}
            </Text>
            <Text style={styles.text}>{value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={saving}
          onPress={onOk}
          text='Done'
          backgroundColor='#009933'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  odd: {
    backgroundColor: '#ededed',
  },
  text: {
    fontSize: 24,
    fontWeight: '400',
  },
  even: {
    backgroundColor: '#F5F5F5',
  },
  tableRow: {
    padding: 10,
    borderRadius: 2,
    width: 300,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  table: {
    marginTop: 12,
    alignItems: 'center',
  },
  buttonContainer: {
    bottom: 20,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
});

export default SummaryScreen;
