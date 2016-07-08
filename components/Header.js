import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>
          xkcdReader
        </Text>
      </View>
    )
  }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    width: width
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 36
  }
})
