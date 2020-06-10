import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles_1';

const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 3,
    height: RECIPE_ITEM_HEIGHT + 15,
    backgroundColor:"#FFFFFF"

  },
  photo: RecipeCard.photo,
   title: {

    fontSize: 17,
    fontWeight: 'bold',

    color: '#444444',
    marginTop:10,

  },
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14
  }
});

export default styles;
