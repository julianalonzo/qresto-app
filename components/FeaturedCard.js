import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_IMAGE_HEIGHT = 180;

function FeaturedCard({ id, name, image, category, price }) {
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{category}</Text>
        </View>
        <View style={{ flex: 0, justifyContent: 'flex-end' }}>
          <Text style={[styles.title, { color: '#2c7a7b' }]}>${price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: SCREEN_WIDTH,
    padding: 24
  },
  imageContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 10,
    zIndex: 5
  },
  image: {
    width: '90%',
    height: CARD_IMAGE_HEIGHT,
    alignSelf: 'center',
    borderRadius: 10
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: CARD_IMAGE_HEIGHT - 50,
    marginTop: (CARD_IMAGE_HEIGHT - 60) * -1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.0,
    elevation: 1
  },
  title: {
    fontSize: 18,
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '500'
  }
});

export default FeaturedCard;
