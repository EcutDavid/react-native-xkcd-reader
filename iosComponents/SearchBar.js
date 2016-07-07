import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default class SearchBar extends Component {
  render() {
    const { input } = this.refs
    const { loading, onSearch } = this.props
    const image = loading ? require('../Images/loading.gif') :
      require('../Images/search.png')
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Part of the comic title'
          ref='input'
          style={styles.input}
        />
        <TouchableOpacity onPress={() => onSearch(input._lastNativeText)}>
          <Image style={styles.icon} source={image}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row'
  },
  input: {
    backgroundColor: '#fff',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
    height: 40,
    width: 40,
  }
})
