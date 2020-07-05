import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = responseJson.map((item) => {
          item.isSelect = false;
          item.selectedClass = styles.list;

          return item;
        });

        this.setState({
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        this.setState({loading: false});
      });
  };

  FlatListItemSeparator = () => <View style={styles.line} />;

  selectItem = (data) => {
    console.log('isis data apa', data);
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect
      ? styles.selected
      : styles.list;

    const index = this.state.dataSource.findIndex((item) => item.id === 1);

    this.state.dataSource[index] = data.item;

    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  goToStore = () =>
    this.props.navigation.navigate('Expenses', {selected: this.state.selected});

  renderItem = (data) => (
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}>
      <Image
        source={{uri: data.item.thumbnailUrl}}
        style={{width: 40, height: 40, margin: 6}}
      />
      <Text style={styles.lightText}>
        {' '}
        {data.item.title.charAt(0).toUpperCase() +
          data.item.title.slice(1)}{' '}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192338',
    paddingVertical: 50,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: 'row',
    backgroundColor: '#192338',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  lightText: {
    color: '#f7f7f7',
    width: 200,
    paddingLeft: 15,
    fontSize: 12,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    left: 290,
    zIndex: 1,
  },
  numberBox: {
    position: 'absolute',
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {fontSize: 14, color: '#000'},
  selected: {backgroundColor: '#FA7B5F'},
});

export default App;
