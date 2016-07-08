import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import Header from './Header'
import Comic from './Comic'
import SearchBar from './SearchBar'

const API_ROOT = 'http://139.59.6.112:9021/'

export default class App extends Component {
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
    fetch(`${API_ROOT}${index}`)
      .then((response) => response.text())
      .then(newComics => {
        this.inFetching = false
        const { comics } = this.state
        const isNewComics = comics.every(d => d.title != newComics[0].title)
        if (isNewComics) {
          this.setState({ comics: comics.concat(JSON.parse(newComics)) })
          if (incComicIndex) {
            this.setState({ comicIndex: index })
          }
        }
      })
      .catch((error) => {
        this.inFetching = false
        console.log(error);
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

  onSearch(text) {
    if (text === '') {
      return
    }
    this.setState({ loading: true })
    fetch(`${API_ROOT}search/${text}`)
      .then(res => res.text())
      .then(newComics => {
        newComics = JSON.parse(newComics).map(d => {
          d.isSearchRes = true
          return d
        })
        this.setState({ searchResult: newComics, loading: false })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { comics, loading, searchResult } = this.state
    return (
      <View style={styles.container}>
        <Header />
        <SearchBar loading={loading} onSearch={text => this.onSearch(text)}/>
        <ScrollView
          style={styles.content}
          onScroll={e => this.onScrollHandler(e)}
          scrollEventThrottle={200}
        >
          <View
            style= {{ alignItems: 'center' }}
          >
          {
            searchResult.concat(comics).map((d, key) => (
              <Comic
                fromSearch={d.isSearchRes}
                key={key}
                img={d.img}
                title={d.title}
              />
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
