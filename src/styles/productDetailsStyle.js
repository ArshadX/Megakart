import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 300,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: 300,
  },
  pageinationItem: {
    width: 8,
    height: 8,
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
  info: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 20,
  },

  tabBarBuyNow: {
    backgroundColor: '#F56400',
    width: Dimensions.get('window').width - 196,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabBarCart: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 196,
    paddingVertical: 15,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#808080',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
