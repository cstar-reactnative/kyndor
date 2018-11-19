import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Slider,
  Image,
  Platform,
  // CheckBox,
  StatusBar
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { CheckBox } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

export default class BusinessRequest extends React.Component {
  state = {
    modalVisible: false,
    range: 5
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: 'Business map view',
    header: null
  };
  // getInitialState() {
  //   return {
  //     region: {
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //   };
  // }
  //
  // onRegionChange(region) {
  //   this.setState({ region });
  // }

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.mainView}>

        <Modal
          style={{marginTop: 22}}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert('Modal has been closed.'); }}>

          <StatusBar
            backgroundColor="#32345f"
            barStyle="light-content"
          />
          <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() => navigate('ForgotPassword')}>
            <MaterialIcons
              name="check"
              size={22}
              style={{color:'white'}}
            />
          </TouchableHighlight>

          <View style={styles.modalNav}>
            <TouchableOpacity
              style={{flex: 2}}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Text style={{ marginTop: 3}}>
                <MaterialIcons
                  name="close"
                  size={22}
                  style={{color:'white'}}
                />
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'white', flex: 10, fontSize: 19}}>Request to add new business</Text>
          </View>

          <View style={{padding: 10}}>
            <View style={styles.textFieldContainer}>
              <TextField
            style={styles.textFieldstyle}
            label='Business name'
            textColor='#888585'
            tintColor='#888585'
            baseColor='#afadad'
            lineWidth={1}
            fontSize={15}
            titleFontSize={11}
            labelFontSize={11}

            />
              <TextField
            style={styles.textFieldstyle}
            label='Description'
            textColor='#888585'
            tintColor='#888585'
            baseColor='#afadad'
            fontSize={15}
            lineWidth={1}
            titleFontSize={11}
            labelFontSize={11}

            />

                <TextField
                  style={styles.textFieldstyle}
                  label='Address'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  lineWidth={1}
                  titleFontSize={11}
                  labelFontSize={11}

                />

          </View>
        </View>
      </Modal>
        <View style={styles.businessNav}>
          <TextInput style = {styles.navText}
            underlineColorAndroid = "transparent"
            placeholder = "Enter bussiness name or zip to filter"
            placeholderTextColor = "#abacc8"
            autoCapitalize = "none"
            onChangeText = {this.handleEmail}/>

            <View style={styles.navButtonHolder}>
              <TouchableHighlight onPress={() => {this.setModalVisible(true);}} style={styles.navIcon} underlayColor={'transparent'} >
                <MaterialIcons
                  name="filter-list"
                  size={28}
                  style={{color:'white'}}
                />
              </TouchableHighlight>

            </View>
          </View>
          <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() => navigate('ForgotPassword')}>
            <MaterialIcons
              name="search"
              size={22}
              style={{color:'white'}}
            />
          </TouchableHighlight>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    checkboxcontainer:{
      borderWidth:0,
      marginTop:-8,
      backgroundColor:'transparent'
    },
    switch:{

    },
    games:{
      fontSize:15,
      color:'#a5a5a5',
      flex:8,
      paddingLeft:10,
    },
    firstrow: {
      flexDirection:'row',
      paddingTop:10,
      paddingLeft: 15
    },
    filterCheckBox: {
      flex: 1
    },
    filterTypeText: {
      flex: 9
    },
    filterTypeImage: {
      flex: 1,
      // height: 20,
      // width: 20,
      borderRadius: 50,
      marginRight: 10
    },
    filterType: {
      flexDirection: 'row',
      padding: 10
    },
    filterHeader: {
      color: '#484b89',
      fontSize: 15,
      fontWeight: 'bold',
      padding: 10
    },
    modalNav: {
      padding: 15,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#484b89',
      maxHeight: 60
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
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

    mainView: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    businessNav: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxHeight: 50,
      backgroundColor: '#484b89b8',
      padding: 10,
      zIndex: 4
    },
    navText: {
      color: '#c1c1d6',
      fontSize: 14,
      paddingBottom: 15,
      height: 40,
      flex: 2,
      height: 40
    },
    navButtonHolder: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    navIcon: {
      marginLeft: 15
    }
  });
