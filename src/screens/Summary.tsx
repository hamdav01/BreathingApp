import { StackScreenProps } from '@react-navigation/stack';
import { length, sum, divide, add } from 'ramda';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import shortid from 'shortid';
import CustomButton from '../components/Button';
import { getTodaysDate } from './utils/Date';
import { calculateAverage } from './utils/Number';
import { getStoredObjectData, storeObjectData } from './utils/Storage';
import { RootStackParamList } from './utils/Types';

type Props = StackScreenProps<RootStackParamList, 'Summary'>;

export const SummaryScreen: React.VFC<Props> = ({ route, navigation }) => {
  const [saving, setIsSaving] = useState(false);
  const roundsData = route?.params?.rounds ?? [1, 2, 3, 10, 11];
  const average = calculateAverage(roundsData);
  const onOk = async () => {
    setIsSaving(true);
    const date = getTodaysDate();
    console.log('date : ', date);
    try {
      await storeObjectData(date, { average, roundsData });
      const t = await getStoredObjectData(date);
      console.log('t: ', t);
      navigation.navigate('Selection');
    } catch (e) {
    } finally {
      setIsSaving(false);
    }
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
    backgroundColor: 'd3d3d3',
  },
  text: {
    fontSize: 24,
    fontWeight: '400',
  },
  even: {
    backgroundColor: '#FFF',
  },
  tableRow: {
    padding: 10,
    borderRadius: 2,
    width: 400,
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
