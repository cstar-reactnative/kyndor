import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Image,
  CheckBox,
  StatusBar,
  ToolbarAndroid,
  ScrollView,
  Platform,
  ImageBackground

} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
export default class ModifyChannel extends React.Component {

  static navigationOptions = {
    title: '',
    header: null
  };

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.container}>
        <View style={styles.businessNav}>
          <View style={styles.navButtonback}>
            <TouchableHighlight  style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="arrow-back"
                size={25}
                style={{color:'#fff'}}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.textinputView}>
            <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>Modify chat group</Text>
          </View>
          <View style={styles.navButtonHolder}>
            <TouchableHighlight  style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="more-vert"
                size={25}
                style={{color:'white'}}
              />
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView>
          <View style={styles.namezipcode}>
            <View style={{flex:2}}>
              <ImageBackground
                style={styles.imageContainer}
                source={require('../../images/unnamed.png')}>
                <View style={styles.overlay} />
              </ImageBackground>
              <MaterialIcons
                style={styles.cameraiconstyle}
                name="camera-alt"
                size={24}
              />
            </View>
            <View style={{flex:8}}>
              <TextInput style = {styles.navText}
                underlineColorAndroid = "#e4e3e3"
                placeholder = "Enter name"
                placeholderTextColor = "#abacc8"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail}
                style={styles.input}
              />
              <View>
                <Text style={{color:'#c9c9c9',fontSize:13}}>You can enter group name and set a picture if you want</Text>
              </View>
            </View>
          </View>
          <View style={{paddingLeft:15,paddingRight:15}}>
            <TextField
              style={styles.textFieldstyle}
              label='Description'
              textColor='#888585'
              tintColor='#888585'
              baseColor='#afadad'
              fontSize={15}
              titleFontSize={11}
              labelFontSize={11}
            />
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#e4e3e3',marginTop:15}} />
        </ScrollView>
        <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() => console.log('click!')}>
          <MaterialIcons
            name="check"
            size={22}
            style={{color:'white'}}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingBottom:40
  },
  textinputView:{
    flex:7,
    justifyContent:'center'
  },
  navText: {
    color: '#c1c1d6',
    fontSize: 14,
    paddingBottom: 15,
    height: 40,
    flex: 2,
    height: 40,
  },
  navButtonHolder:{
    justifyContent:'center'
  },
  navButtonback:{
    justifyContent:'center',
    flex:2
  },
  businessNav: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft:15,
    paddingRight:15,
    maxHeight: 50,
    backgroundColor: '#484b89',
    zIndex: 4
  },
  input:{
    fontSize:15,
    color:'#fff'
  },
  fab: {
    backgroundColor: '#9513fe',
    height: 50,
    width: 50,
    borderRadius: 50,
    padding: 14,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 5,
    elevation: 3,
    overflow:'hidden'
  },
  imageContainer:{
    width: 60,
    height: 60,
    borderRadius:50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(190, 190, 191, 0.7)',
    borderRadius:50
  },
  namezipcode: {
    marginTop:25,
    alignContent: 'flex-start',
    flexDirection:'row',
    paddingLeft:15,
    paddingRight:15,
  },
  cameraiconstyle:{
    color:'#9513fe',
    position: 'absolute',
    top: 20,
    left: 18,
  },
});
