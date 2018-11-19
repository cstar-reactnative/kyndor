import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  FlatList,
  AsyncStorage,
  Image,
  ScrollView,
  ImageBackground,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class BlurbModel extends React.Component {
  constructor(props){
    super(props);
    // this.state = {
    //   //display: Stores.chartStore.getData().home.schools,
    //   display: true
    // }
  }
  // closeDisplay(){
  //   // let chatStoreData = Stores.chartStore.getData()
  //   // chatStoreData.home.schools = false
  //   // Stores.chartStore.setData(chatStoreData)
  //   this.setState({
  //     display: false
  //   })
  // }
  //
  // showDisplay(){
  //   // let chatStoreData = Stores.chartStore.getData()
  //   // chatStoreData.home.schools = false
  //   // Stores.chartStore.setData(chatStoreData)
  //   this.setState({
  //     display: true
  //   })
  // }
  render(){
    if(this.props.display){
      return(
        <View style={{margin:10,elevation:2, zIndex: 5,borderRadius: (Platform.OS === 'ios') ? 14 : 5, overflow: 'hidden'}}>
          <ImageBackground
            style={styles.imageContainer}
            source={require('../../images/blurb-card.png')}>
            {/* <View style={{flexDirection:'row',flex:0.7}}> */}
            <View style={{padding: 12, flex: 0.9}}>
              <Text style={{fontFamily: "System", fontSize:14,color:'black', fontStyle: 'italic', lineHeight: 19}}>
                {this.props.text}
              </Text>
            </View>
            {/* </View> */}
            <View style={{flex: 0.1, justifyContent:'flex-start',paddingTop: 5,paddingRight:5,alignItems:'flex-end'}}>
              <TouchableOpacity onPress={() => this.props.onPress()}>
                {/* <Text style={{fontFamily: "System", color:'#9513fe',fontSize:13,fontWeight:'500'}}>CLOSE</Text> */}
                <Ionicons
                  name="ios-close-circle"
                  size={24}
                  color='#878996'
                />
              </TouchableOpacity>
            </View>
        </ImageBackground>
        </View>
      )
    }
    else{
      return (
        <TouchableOpacity style={{backgroundColor: '#e2e5fa'}} onPress={() => this.props.onPress1()}>
          <View style={{flexDirection: 'row', paddingHorizontal:15,paddingVertical: 8, alignItems:'center'}}>
            <Ionicons
              name="ios-information-circle-outline"
              size={28}
              color='#9513fe'
            />
            <Text style={{marginLeft: 20,fontFamily: "System", fontSize:13,color:'#6d6d72', fontStyle: 'italic'}}>What’s this page about?</Text>
          </View>
          {/* <Image
            source={require('../../images/question_mark.png')}
            style={{height: 32, width: 32,marginLeft: (Platform.OS === 'ios') ? 10 : 7}}
          /> */}
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageContainer:{
    //flex: 1,
    flexDirection: 'row',
    maxHeight: 110,
    //borderRadius:50
  },
});

export default BlurbModel
