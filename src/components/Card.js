import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from './Heart';
const Card = ({item, onPress}) => {
  const [isFav, setFav] = useState(false);
  useEffect(() => {
    async function start() {
      const realm = await Realm.open({
        path: 'data',
      });
      const task = realm.objectForPrimaryKey('favourite', item.id);
      if (task !== null) {
        setFav(true);
      }
    }
    start();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.product_images}} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>{item.producer}</Text>
          <Text style={styles.textPrice}>
            <Icon name="currency-rupee" size={15} color="#000" /> {item.cost}
          </Text>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={20}
            showRating={false}
            isDisabled={true}
          />
        </View>
        <Heart id={item.id} isFav={isFav} setFav={setFav} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    borderRadius: 2,
    marginVertical: 1,
  },
  content: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#808080',
  },
  textPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    marginHorizontal: 10,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Card;
