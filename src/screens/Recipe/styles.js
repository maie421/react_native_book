import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles_1';

// const { width, height } = Dimensions.get('window');
// orientation must fixed
// const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 100,
    height: RECIPE_ITEM_HEIGHT + 15,

    
  },
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14
  },
  carouselContainer: {
    minHeight: 250,
    marginBottom:20
  },
//////////////
container_Side: {
  flex: 1,
  flexDirection:'row',
},
commentcontainer: {
  flex: 2,
  // backgroundColor: "#ffffff",
},
  root: {
    backgroundColor: "#ffffff",
    marginTop:30,
  },
  content: {
    marginTop:15,
    borderColor:"#ffff",
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  myimage:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  }
});

export default styles;
