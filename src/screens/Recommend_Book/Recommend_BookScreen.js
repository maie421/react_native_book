import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './styles';
import { getRecipes, getCategoryName } from '../../data/MockDataAPI';

const DATA = [
    {
      id: '1',
      title: 'First Item',
      photo_url:
      'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      author:
      '윤영미',
    },
    {
      id: '2',
      title: 'Second Item',
      photo_url:
      'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      author:
      '윤영미',
    },
    {
      id: '3',
      title: 'Third Item',
      photo_url:
      'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      author:
      '윤영미',
    },
  ];

export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <View style={styles.container_Side}>
        <Text style={styles.title}>제목 : {item.title}</Text>
        <Text style={styles.title}>저자 : {item.author}</Text>
        </View>
        {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation } = this.props;
    //const item = navigation.getParam('category');
    //const recipesArray = getRecipes(item.id);
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={this.renderRecipes}
        //   keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
