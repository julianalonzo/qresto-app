import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FeaturedCard from '../components/FeaturedCard';
import restaurant from '../mocks/restaurant';
import * as theme from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function Restaurant({ name, address, coverPhoto, foods }) {
  const [scrollYState] = useState(
    new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
    )
  );

  const scrollY = Animated.add(
    scrollYState,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
  );

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp'
  });

  const headerOverlayOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0.25, 0.5],
    extrapolate: 'clamp'
  });

  const headerTextScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.6],
    extrapolate: 'clamp'
  });

  const headerTextTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp'
  });

  const headerSubtitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, -1],
    extrapolate: 'clamp'
  });

  const featuredItems = foods.filter(food => food.featured);
  const categories = [...new Set(foods.map(item => item.category))];

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.251)"
      />
      <Animated.ScrollView
        style={styles.body}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollYState
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        contentInset={{ top: HEADER_MAX_HEIGHT }}
        contentOffset={{ y: -HEADER_MAX_HEIGHT }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fill}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <View style={styles.fill}>
            <ScrollView
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToAlignment="center"
            >
              {featuredItems.map(item => (
                <FeaturedCard key={item.id} {...item} />
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.fill}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity key={category} activeOpacity={0.5}>
                <Text
                  style={[
                    styles.categoryTitle,
                    {
                      color: index > 0 ? theme.colors.gray : theme.colors.black
                    }
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }]
          }
        ]}
      >
        <Image
          source={{
            uri: coverPhoto
          }}
          style={styles.coverPhoto}
        />
        <Animated.View
          style={[styles.overlay, { opacity: headerOverlayOpacity }]}
        />
        <Animated.View
          style={[
            styles.headerTextContainer,
            {
              transform: [
                { scale: headerTextScale },
                { translateY: headerTextTranslate }
              ]
            }
          ]}
        >
          <Text style={styles.title}>{name}</Text>
          <Animated.Text
            style={[styles.subtitle, { opacity: headerSubtitleOpacity }]}
          >
            {address}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  fill: {
    flex: 0
  },
  body: {
    flex: 1,
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 24
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    height: HEADER_MAX_HEIGHT,
    width: SCREEN_WIDTH
  },
  coverPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black
  },
  headerTextContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 68 : 78,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: theme.sizes.title,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold
  },
  subtitle: {
    fontSize: theme.sizes.caption,
    color: theme.colors.white
  },
  sectionTitle: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.sizes.subHeader,
    paddingHorizontal: theme.sizes.padding
  },
  categoryTitle: {
    fontSize: theme.sizes.subHeader - 6,
    color: theme.colors.black,
    fontWeight: theme.fontWeights.bold,
    marginHorizontal: theme.sizes.margin,
    paddingVertical: 8
  }
});

Restaurant.navigationOptions = props => {
  return {
    header: () => null
  };
};

Restaurant.defaultProps = {
  ...restaurant
};

export default Restaurant;
