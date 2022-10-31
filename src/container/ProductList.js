import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import Card from '../components/Card';
import {styles} from '../styles/styles';
const ProductList = ({navigation}) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const favSchema = {
    name: 'favourite',
    properties: {
      _id: 'int',
    },
    primaryKey: '_id',
  };
  const fetchList = async () => {
    setLoading(true);
    await axios
      .get(
        'http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1&limit=10&page=1',
      )
      .then(res => {
        setLoading(false);
        setList(res?.data?.data);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchList();
      async function start() {
        await Realm.open({
          path: 'data',
          schema: [favSchema],
        });
      }
      start();
      return setList([]);
    }, []),
  );

  const renderItem = ({item}) => {
    return (
      <Card
        item={item}
        onPress={() =>
          navigation.navigate('Details', {
            id: item.id,
          })
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={styles.indicator}
          color="#6495ED"
        />
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={list}
        />
      )}
    </View>
  );
};

export default ProductList;
