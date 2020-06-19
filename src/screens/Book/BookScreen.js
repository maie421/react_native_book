import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput, 
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';

import { gql } from "apollo-boost";
import { Query } from 'react-apollo';

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
  {
    title:'그려',
    body: '추천합니다',
  },
  {
    title:'그려',
    body: '추천합니다',
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
            <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>
            {item.updated_at}
          </Text>
        </View >
          <Text rkType='primary3 mediumLine'>{item.text}</Text>
          <View style={styles.container_loginBtn}>
          <TouchableOpacity style={styles.DeleteBtn} onPress={() => {this.Login()}}>
              <Text style={styles.loginText}>삭제</Text>
          </TouchableOpacity>
          </View>
        </View>
    </View>
  );

  createComment = (id) => {
    let newObject
    this.props.client.mutate({
      variables: {name:"익명",text:"재미있습니다",book_id:1},
      mutation: gql`
        mutation createComment($name: String!, $rank: Int!){
          createComment(input: {name: $name, rank: $rank}){
            duelist {
              name
              rank
            }
          }    
        }      
      `
    })
    .then(result => {newObject = result})
  }
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      
         <Query
          query={
            gql `
            {
              book(bookisnb:"123"){
                id
                suggest
                comments{
                  id
                  text
                  name
                  updated_at
                }
            }
          }
            `
          }
        >
        {({loading, error, data}) => {
          if (loading) return <p>'Loading...'</p>
          if (error) return <p>'Error! ${error.message}'</p>
          //console.log(data.suggest);
          return (
          <View style={styles.container}>           
            <View style={styles.container_Side}>
            <Image style={styles.photo} source={{ uri: item.thumbnail }} />
            <View>
              <Text style={styles.title}>제목 : {item.title}</Text>
              <Text style={styles.title}>저자 : {item.publisher}</Text>
            </View>
          {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
        </View>
        <View style={styles.commentcontainer}>
        <Text style={styles.title}>{data.book.suggest}</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={data.book.comments}
          renderItem={this.renderComment}
        //   keyExtractor={item => `${item.id}`}
        />
        </View>
        <View style={styles.container_input}>
        <TextInput  
            style={styles.inputText}
            placeholder="후기를 적어주세요..." 
            placeholderTextColor="#8C8C8C"
            onChangeText={comment => this.setState({comment})}/>
          <View style={styles.container_loginBtn}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => {this.getAllDuelists()}}>
            <Text style={styles.loginText}>추가</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
          )
        }}
        </Query>
    );
  }
}