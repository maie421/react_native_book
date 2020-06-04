import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

const DATA = [
  {
    "authors": [
        "Savitch",
        "Mock"
    ],
    "contents": "Java: An Introduction to Problem Solving and Programming, 7e, is ideal for introductory Computer Science courses using Java, and other introductory programming courses in departments of Computer Science, Computer Engineering, CIS, MIS, IT, and Business.  Students",
    "datetime": "2016-02-01T00:00:00.000+09:00",
    "isbn": "129201833X 9781292018331",
    "price": 40000,
    "publisher": "Pearson",
    "sale_price": 40000,
    "status": "정상판매",
    "thumbnail": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F3383739%3Ftimestamp%3D20190220072908",
    "title": "Java",
    "translators": [],
    "url": "https://search.daum.net/search?w=bookpage&bookId=3383739&q=Java"
},
];
const story = [
  {
    title:'그려',
    body:'추천합니다',
  },
  {
    title:'그려',
    body: '추천합니다',
  },
  {
    title:'그려',
    body: '추천합니다',
  },
];

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }
    
  renderComment = ({item}) =>(
    <View >
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text  style={styles.name}>{item.title}</Text>
          <Text style={styles.time}>
            {item.created_at}
          </Text>
        </View>
        <Text rkType='primary3 mediumLine'>{item.body}</Text>
      </View>
    </View>
  );

  // renderImage = ({ item }) => (
  //   <TouchableHighlight>
  //     <View style={styles.imageContainer}>
  //       <Image style={styles.image} source={{ uri: item }} />
  //     </View>
  //   </TouchableHighlight>
  // );

  // onPressIngredient = item => {
  //   var name = getIngredientName(item);
  //   let ingredient = item;
  //   this.props.navigation.navigate('Ingredient', { ingredient, name });
  // };

  render() {

    // const item = navigation.getParam('item');
    // const category = getCategoryById(item.categoryId);
    // const title = getCategoryName(category.id);

    return (
      <View style={styles.container}>
        <View style={styles.container_Side}>
            <Image style={styles.photo} source={{ uri: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1231043%3Ftimestamp%3D20200520125904' }} />
            <View >
              <Text style={styles.title}>제목 : 안녕</Text>
              <Text style={styles.title}>저자 : 나여</Text>

            </View>
          {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
        </View>
        <View style={styles.commentcontainer}>
        <Text style={styles.title}>추천합니다.</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={story}
          renderItem={this.renderComment}
        //   keyExtractor={item => `${item.id}`}
        />
        </View>
      </View>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
