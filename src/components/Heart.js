import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Realm from 'realm';

const Heart = ({id, isFav, setFav}) => {
  const removehandle = async () => {
    const realm = await Realm.open({
      path: 'data',
    });
    task = realm.objectForPrimaryKey('favourite', id);
    realm.write(() => {
      // Delete the task from the realm.
      realm.delete(task);
      // Discard the reference.
      task = null;
      setFav(false);
    });
  };
  const addFav = async () => {
    const realm = await Realm.open({
      path: 'data',
    });
    task = realm.objectForPrimaryKey('favourite', id);
    realm.write(() => {
      realm.create('favourite', {_id: id});
      setFav(true);
    });
  };

  return (
    <View style={styles.container}>
      {isFav ? (
        <Icon
          name="cards-heart"
          color="#ff0000"
          size={30}
          onPress={removehandle}
        />
      ) : (
        <Icon
          name="cards-heart-outline"
          color="#808080"
          size={30}
          onPress={addFav}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 60,
    padding: 6,
    marginRight: 10,
    marginTop: 10,
  },
});
export default Heart;
