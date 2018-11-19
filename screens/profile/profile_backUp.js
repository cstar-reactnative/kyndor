import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, createStackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  ImageBackground,
  ToolbarAndroid,
  Platform

} from 'react-native';


export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#484b89',

    },
  };


  render(){

    const { navigate } = this.props.navigation;
    return(

      <View style={styles.container}>
        <View style={styles.namezipcode}>

          <ImageBackground style={styles.imageContainer} source={require('../../images/unnamed.png')}>
            <View style={styles.overlay} />
          </ImageBackground>
          <MaterialIcons
            style={styles.cameraiconstyle}
            name="camera-alt"
            size={32}/>

          <View style={styles.textFieldContainer}>
            <TextField
              style={styles.textFieldstyle}
              label='Name'
              textColor='#888585'
              tintColor='#888585'
              baseColor='#afadad'
              fontSize={15}
              titleFontSize={11}
              labelFontSize={11}

            />
            <TextField
              style={styles.textFieldstyle}
              label='Zip Code'
              textColor='#888585'
              tintColor='#888585'
              baseColor='#afadad'
              fontSize={15}
              titleFontSize={11}
              labelFontSize={11}

            />
          </View>
        </View>
        <View style={styles.about}>
          <TextField
            style={styles.textFieldstyle}
            label='Tell us about yourself'
            textColor='#888585'
            tintColor='#888585'
            baseColor='#afadad'
            fontSize={15}
            titleFontSize={11}
            labelFontSize={11}

          />
          <View style={styles.containerbusinessGroup}>
            <View style={styles.containerbusiness}>
              <MaterialIcons
                name="business"
                size={26}
                style={styles.iconstyle}
              />

              <View style={styles.containerbusinessGroup}>
                <TouchableOpacity style={styles.containerbusiness}>
                  <MaterialIcons
                    name="business"
                    size={26}
                    style={styles.iconstyle}
                  />
                  <View style={styles.textsection}>
                    <TouchableOpacity  onPress={() =>navigate('BusinessSettings')} >
                      <Text style={styles.textstyle}>Interested in business</Text>
                    </TouchableOpacity>
                    <Text>All types of business</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containergroup}>
                  <MaterialIcons
                    name="group"
                    size={26}
                    style={styles.iconstyle}
                  />
                  <View style={styles.textsection}>
                    <Text  onPress={() =>navigate('ProfileGroup')} style={styles.textstyle}>Interested in Groups</Text>
                    <Text>Sports, activity, problems</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.containerappsettings}>
              <MaterialIcons
                style={styles.iconstyle}
                name="settings"
                size={26}
              />
              <View style={styles.textsection}>
                <Text onPress={() =>navigate('ProfileSettings')} style={styles.textstyle}>Application Settings</Text>
              </View>
            </TouchableOpacity>

          </View>

        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex:1,
        alignContent: 'flex-start',
        backgroundColor:'#ffffff',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
      },
      namezipcode: {
        flex:0.3,
        alignContent: 'flex-start',
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,

      },
      about: {
        paddingTop:90,
        alignContent: 'flex-start',
        paddingLeft:15,
        paddingRight:15,

      },
      containerbusinessGroup:{
        borderBottomWidth:1,
        borderBottomColor:'#e0dbdb',
      },
      containerbusiness: {
        paddingLeft:15,
        paddingRight:15,

        alignContent: 'flex-start',
        flexDirection:'row',
        paddingTop:17,
        paddingBottom:10
      },
      containergroup: {
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:20,
        alignContent: 'flex-start',
        flexDirection:'row',

      },
      containerappsettings: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:15,
        paddingBottom:25,
        alignContent: 'flex-start',
        flexDirection:'row'
      },


      textFieldContainer: {
        flex: 1,
        paddingLeft:15
      },
      textsection:{
        paddingLeft:30
      },
      cameraiconstyle:{
        color:'#9c9ebf',
        position: 'absolute',
        top: 55,
        left: 38,
        color:'white'
      },
      iconstyle:{
        color:'#9c9ebf',
      },
      textstyle:{
        fontSize:15,
        color:'#393939',

      },
      textFieldstyle:{
        flex:0.1

      },
      imageContainer:{
        width: 80,
        height: 80,
        marginTop:30,
        borderRadius:50
      },
      toolbar: {
        backgroundColor: '#484b89',
        height: 55
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(33, 33, 39, 0.7)',
        borderRadius:50
      }

    });
