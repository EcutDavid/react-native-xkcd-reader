/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <Text style={styles.title}>
          xkcdReader
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    )
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
    fontSize: 36,
  }
})
