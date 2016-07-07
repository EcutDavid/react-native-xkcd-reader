import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class Comic extends Component {
  render() {
    const { title, img } = this.props

    return (
      <View style= {styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        <View style={styles.imgArea}>
          <Image
            resizeMode='contain'
            source={{ uri: img }}
            style={styles.img}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  imgArea: {
    flexDirection: 'row',
    height: 400
  },
  img: {
    flex: 1,
    height: undefined,
    marginLeft: 10,
    marginRight: 10
  }
})
