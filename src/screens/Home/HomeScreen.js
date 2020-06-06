import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';
import MenuImage from '../../components/MenuImage/MenuImage';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: (
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => params.handleSearch(text)}
          //onClear={() => params.handleSearch('')}
          placeholder="Search"
          value={params.data}
        />
      ),
      
      headerRight:(
      <MaterialCommunityIcons 
        // onPress={() => alert('This is a button!')}
        onPress={() => navigation.navigate('BarCode')}
        name="barcode-scan" 
        size={30} 
        color="black"
        />
        ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue
    });
  }

  // handleSearch = text => {
  //   var recipeArray1 = getRecipesByRecipeName(text);
  //   var recipeArray2 = getRecipesByCategoryName(text);
  //   var recipeArray3 = getRecipesByIngredientName(text);
  //   var aux = recipeArray1.concat(recipeArray2);
  //   var recipeArray = [...new Set(aux)];
  //   if (text == '') {
  //     this.setState({
  //       value: text,
  //       data: []
  //     });
  //   } else {
  //     this.setState({
  //       value: text,
  //       data: recipeArray
  //     });
  //   }

  // };
  handleSearch = text => {
    let data=[];
    axios({
      method: 'get',
      url: `https://dapi.kakao.com/v3/search/book?target=title`,
      headers: {
        Authorization:"KakaoAK 2b99240d5f8a380a7d9443e1f210d0bc",
        Host:"dapi.kakao.com",
      },
     params: {
      query: text,
      },
    }).then(response => {
      data=response.data.documents;
        this.setState({data});
        console.log(response);
    }).catch(error => {
      console.log(error);
    });
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
      });
    }
  };
  getValue = () => {
    return this.state.value;
  };

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.thumbnail }} />
        <View style={styles.container_Side}>
          <Text style={styles.title}>제목 : {item.title}</Text>
          <Text style={styles.title}>저자 : {item.publisher}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  render() {
    // console.log(this.state.data);
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.isbn}`}
        />
      </View>
    );
  }
}
