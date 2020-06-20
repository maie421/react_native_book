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
import { Query ,Mutation,graphql} from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
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
const createComment = gql`
mutation Comment($name: String, $text: String!,$book_id:ID!) {
  createComment(name:$name,text: $text,book_id:$book_id){
     id
     text
   }
 }

`
const QueryCommnet=gql `
query Book($bookisnb: String) {
  book(bookisnb:$bookisnb){
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
      activeSlide: 0,
      comment:"",
      name:"",
      bookisnb:"",
      CommentList:[],
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
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const bookisnb="123";
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
        <Query query={QueryCommnet} variables={{ bookisnb }}>
        {({loading, error, data}) => {
          console.log(data);
          // if (data!=undefined){
          //    this.setState({
          //     CommentList: { ...data.book.comments }
          //     });
          //  }
          if (loading) return <Text>'Loading...'</Text>
          if (error) return <Text>'Error! ${error.message}'</Text>
          return (
        <View style={styles.commentcontainer}>
        {data.book==undefined?<Text>댓글을 추가해주세요</Text>:<Text style={styles.title}>{data.book.suggest}</Text>}
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={this.state.CommentList}
          renderItem={this.renderComment}
        //   keyExtractor={item => `${item.id}`}
        />
        </View>
        )
        }}
        </Query>
        <View style={styles.container_input}>
        <TextInput  
            style={styles.inputText}
            placeholder="후기를 적어주세요..." 
            placeholderTextColor="#8C8C8C"
            onChangeText={comment => this.setState({comment})}
            value={this.state.comment}
            />
          <View style={styles.container_loginBtn}>
          <Mutation mutation={createComment}>
          {(createComment, { data }) => (
            <TouchableOpacity style={styles.loginBtn} onPress={() => {
              createComment({
              variables: {
                text: this.state.comment,
                name: "익명",
                book_id:"1"
              }
             
            })
              .then(res => res)
              .catch(err => <Text>{err}</Text>);
            this.setState({ comment: '', name: '',id:'' });}}>
              <Text style={styles.loginText}>추가</Text>
            </TouchableOpacity>
          )}
          </Mutation>
          </View>
        </View>
      </View>
    );
  }
}