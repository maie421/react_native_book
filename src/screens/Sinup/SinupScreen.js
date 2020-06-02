import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert ,AsyncStorage} from 'react-native';
// import { uri } from '../../data/full';
// import axios from 'axios';


export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      
      headerTitleStyle: {
        fontSize: 16
      }
    };
  };
  state={
    email:"",
    password:"",
    user:[]
  }
  Login = ()=>{
    // const uri_connect={uri};
    const value = this.state.email;
    const password = this.state.password;
    const emailRegex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (value === "" ||password==="") {
      return Alert.alert("빈칸이 존재합니다.");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("아이디를 이메일 형식으로 입력하여 주세요.");
    } else{
    // return expression.test(String(email).toLowerCase())
    // axios.post(uri_connect.uri+`/api/auth/login`, {
    //   email:this.state.email,
    //   password:this.state.password
    // })
    // .then(res => {
    //     // console.log(res);
    //     const user=res.data;
    //     this.setState({user});
    //     let data = JSON.stringify(this.state.user);
    //     AsyncStorage.setItem("user", data, () => {
    //     });
    //     // console.log(`login 버튼`);
    //     // AsyncStorage.getItem("user", (err, value )=>{
    //     //   if (err == null){
    //     //   let json = JSON.parse(value);
    //     //   console.log(json);
    //     //   }
    //     //   });
    //     this.props.navigation.navigate('Home');
    //     return Alert.alert(`로그인을 성공하였습니다.`);
    //   })
    // .catch(error=> {
    //   //return Alert.alert(error);
    //   return Alert.alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    // }); 
  }
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Book</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => {this.Login()}}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
})
