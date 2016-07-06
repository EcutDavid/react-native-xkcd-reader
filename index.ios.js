/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import request from 'superagent'

const arr = [1,2,32,3,234,23,423,4,234]
const API_ROOT = 'http://139.59.6.112:9021/'

class reactNativeXkcdReader extends Component {
  constructor() {
    super()
    this.state = {
      comics: [],
      comicIndex: 0,
      loading: false,
      searchResult: []
    }
  }

  fetchComics(index, incComicIndex) {
    if (this.inFetching) {
      return
    }
    this.inFetching = true
    request
      .get(`${API_ROOT}${index}`)
      .end((err, res) => {
        this.inFetching = false
        if (!err) {
          const { comics } = this.state
          const newComics = JSON.parse(res.text)
          if (comics.every(d => d.title != newComics[0].title)) {
            this.setState({ comics: comics.concat(newComics) })
          }
          if (incComicIndex) {
            this.setState({ comicIndex: index })
          }
        } else {
          console.error(err)
        }
      })
  }

  componentWillMount() {
    this.fetchComics(0)
  }

  onScrollHandler(e) {
    const {
      layoutMeasurement : { height: layoutHeight },
      contentSize : { height: contentHeight  },
      contentOffset : { y: scrollTop }
    } = e.nativeEvent

    if (contentHeight - scrollTop - layoutHeight < 200) {
      const { comicIndex } = this.state
      this.fetchComics(comicIndex + 1, true)
    }
  }

  render() {
    const { comics, loading, searchResult } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <Text style={styles.title}>
            xkcdReader
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView
          style={styles.content}
          onScroll={e => this.onScrollHandler(e)}
          scrollEventThrottle={200}
        >
          <View
            style= {{ alignItems: 'center' }}
          >
          {
            comics.map((d, key) => (
              <View key={key} style= {{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {d.title}
                </Text>
                <View style={{ flexDirection: 'row', height: 400 }}>
                  <Image
                    resizeMode='contain'
                    source={{ uri: d.img }}
                    style={{ flex: 1, height: undefined, marginLeft: 10, marginRight: 10 }}
                  />
                </View>
              </View>
            ))
          }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const width = Dimensions.get('window').width
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    marginTop: 20,
    width: width
  },
  comicLine: {
  },
})

AppRegistry.registerComponent('reactNativeXkcdReader', () => reactNativeXkcdReader)
