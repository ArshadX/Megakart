import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from '../components/Heart';
import {styles} from '../styles/productDetailsStyle';

const ProductDetails = ({route}) => {
  const {id} = route.params;
  const [data, setData] = useState([]);
  const [isFav, setFav] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${id}`,
      )
      .then(res => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });

    async function start() {
      const realm = await Realm.open({
        path: 'data',
      });
      const task = realm.objectForPrimaryKey('favourite', id);
      if (task !== null) {
        setFav(true);
      }
    }
    start();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={styles.indicator}
          color="#6495ED"
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              showPagination
              data={data.product_images}
              renderItem={({item}) => (
                <Image source={{uri: item.image}} style={styles.image} />
              )}
              paginationStyleItem={styles.pageinationItem}
            />
            <Heart id={data.id} isFav={isFav} setFav={setFav} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.text}>{data.producer}</Text>
            <Text style={styles.text}>{data.description}</Text>
            <Text style={styles.textPrice}>
              <Icon name="currency-rupee" size={15} color="#000" />
              {data.cost}
            </Text>
            <AirbnbRating
              count={5}
              defaultRating={data.rating}
              size={20}
              showRating={false}
              isDisabled={true}
            />
          </View>
          <View style={styles.tabBar}>
            <Pressable
              style={styles.tabBarCart}
              android_ripple={{radius: 130, color: '#808080'}}>
              <Text style={styles.text}>ADD TO CART</Text>
            </Pressable>
            <Pressable
              style={styles.tabBarBuyNow}
              android_ripple={{radius: 130, color: '#FF2E00'}}>
              <Text style={styles.text}>BUY NOW</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
