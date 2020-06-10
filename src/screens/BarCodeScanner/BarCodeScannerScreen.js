import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList,
  Image,
  TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

import styles from './styles';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    item:[]
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
    console.log({item});
  };
  
  renderBook = ({ item }) => (
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
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const { navigation } = this.props;
    // console.log(this.state.item);
    const item_list=this.state.item;
    const item = item_list.map(item=>item);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={'다시 인식하기'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
        {scanned && (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={this.state.item}
          renderItem={this.renderBook}
          keyExtractor={item => `${item.isbn}`}
        />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    let item=[];
    this.setState({ scanned: true });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    axios({
      method: 'get',
      // url: `https://dapi.kakao.com/v3/search/book?target=isbn`,
      url: `https://dapi.kakao.com/v3/search/book?target=title`,
      headers: {
        Authorization:"KakaoAK 2b99240d5f8a380a7d9443e1f210d0bc",
        Host:"dapi.kakao.com",
      },
      params: {
      query: data,
      },
    }).then(response => {
        item=response.data.documents;
        this.setState({item});
        
      }).catch(error => {
        console.log(error);
      });      
     
  };
}