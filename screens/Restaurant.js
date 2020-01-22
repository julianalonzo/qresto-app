import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 60;
const scrollY = new Animated.Value(0);
const headerHeight = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
  extrapolate: 'clamp'
});
const headerImageBlurRadius = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [0, 10],
  extrapolate: 'clamp'
});
const headerTitleMarginTop = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [HEADER_EXPANDED_HEIGHT / 3, 24],
  extrapolate: 'clamp'
});
const headerTitleFontSize = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [24, 18],
  extrapolate: 'clamp'
});
const headerSubtitleOpacity = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [2, 0],
  extrapolate: 'clamp'
});

function Restaurant() {
  return (
    <View style={styles.root}>
      <Animated.View
        style={{
          height: headerHeight,
          width: SCREEN_WIDTH,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      >
        <Animated.Image
          source={{
            uri:
              'https://momofuku-assets.s3.amazonaws.com/uploads/sites/38/2019/07/IMG3127-1440x590.jpg'
          }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          blurRadius={headerImageBlurRadius}
        />
        <View style={styles.overlay} />
        <Animated.Text
          style={[
            styles.title,
            {
              marginTop: headerTitleMarginTop,
              fontSize: headerTitleFontSize
            }
          ]}
        >
          Barrio Fiesta
        </Animated.Text>
        <Animated.Text
          style={[styles.subtitle, { opacity: headerSubtitleOpacity }]}
        >
          170 - 6800 Memorial Dr E, Calgary, AB T2A 6V3
        </Animated.Text>
      </Animated.View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: HEADER_EXPANDED_HEIGHT + 24,
          width: '100%'
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }
        ])}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
          Featured
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    opacity: 0.25,
    position: 'absolute'
  },
  title: {
    fontSize: 36,
    color: '#ffffff',
    alignSelf: 'center',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    alignSelf: 'center'
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 24
  }
});

Restaurant.navigationOptions = props => {
  return {
    header: () => null
  };
};

export default Restaurant;
