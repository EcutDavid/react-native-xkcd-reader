/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

const arr = [1,2,32,3,234,23,423,4,234]
class reactNativeXkcdReader extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <Text style={styles.title}>
            xkcdReader
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView>
          {
            arr.map((d, key) => (
              <View key={key}>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <Text>
                  123123
                </Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 32,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactNativeXkcdReader', () => reactNativeXkcdReader);
