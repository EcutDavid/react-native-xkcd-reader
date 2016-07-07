/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import request from 'superagent'
import Header from './iosComponents/Header'
import Comic from './iosComponents/Comic'

const API_ROOT = 'http://139.59.6.112:9021/'

class reactNativeXkcdReader extends Component {
  constructor() {
    super()
    this.state = {
      comics: [],
      comicIndex: 0,
      loading: false
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
    const { comics } = this.state
    return (
      <View style={styles.container}>
        <Header />
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
              <Comic title={d.title} img={d.img} key={key} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    marginTop: 20,
    width: width
  }
})

AppRegistry.registerComponent('reactNativeXkcdReader', () => reactNativeXkcdReader)
