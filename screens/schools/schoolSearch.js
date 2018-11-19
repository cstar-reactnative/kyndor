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
  FlatList,
  StatusBar,
  ToolbarAndroid,
  AsyncStorage,
  ScrollView,
  Platform,
  Dimensions,
  BackHandler,
  Modal
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');

let { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var LATITUDE = 32.4241531;
var LONGITUDE = -86.9608986;
var LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class SchoolView extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.containerImage}>
          <Image source={require('../../images/Oval.png')}/>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.containermainText} >{this.props.name}</Text>
          <Text style={styles.containersubText}>{this.props.address}</Text>
        </View>
        <View style={styles.containerDistanceView}>
          <Text style={styles.containerDistanceText} >{this.props.distance}</Text>
        </View>
      </View>
    )
  }
}

export default class schoolSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSchoolName: '',
      newSchoolDesc: '',
      newSchoolAddress: '',
      searchschool: [],
      searchZip: '',
      modalVisible: false,
      range: 5,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }
  }

  getMyCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      position => {
        // alert(position.coords.latitude, position.coords.longitude)
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => {
        // alert('Error fetching location! Please enable GPS. Error: '+JSON.stringify(error))
        this.getMyCurrentLocation()
      },
      // { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      {timeout: 30000, enableHighAccuracy: false}
    );
  }

  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress");
    navigator.geolocation.clearWatch(this.watchID);
  }

  searchSchoolsFunc(searchZip) {
    if(searchZip.length > 3){
      AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
        if(err){
          alert(err)
        }
        else{
          api.getAllSchools({zip: searchZip, token: item}, (e, r) => {
            if(e){
              // alert("Error: "+e);
            }
            else{
              if(r.success == true){
                // alert(r.result.schools.length)
                if(r.result.schools.length > 0){
                  this.setState({searchschool: r.result.schools});
                }
              }
              else {
                // alert('Failed!');
              }
            }
          })
        }
      });
    }
  }

  distance(lat1, lon1, lat2, lon2, unit='M') {
    // for unit
    // 'M' is statute miles (default)
    // 'K' is kilometers
    // 'N' is nautical miles
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return Math.round(dist)
  }

  createRequest(schoolName, schoolDescription, schoolAddress){
    if((schoolName == '') || (schoolDescription == '') || (schoolAddress == '')){
      alert('Please fill up all fields.')
    }
    else{
      alert('API in progress.')
      // AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      //   if(err){
      //     alert(err)
      //   }
      //   else{
      //     api.createGroup({group_type:'general', address:schoolAddress, description:schoolDescription, zip: '1001', name:schoolName, token: item}, (e, r) => {
      //       if(e){
      //         alert("Error: "+e);
      //       }
      //       else{
      //         if(r.success == true){
      //           alert('Success!')
      //         }
      //         else {
      //           alert('Failed! Please try again.');
      //         }
      //       }
      //     })
      //   }
      // });
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  componentWillMount(){
    this.getMyCurrentLocation();

    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log('Back')
    })

  }

  backFunction(){
    let { params } = this.props.navigation.state;
    console.log(params.fromHome)
    if(params.fromHome){
      Stores.screenStore.setData({tab: 'home', screen: 'default'})
    }
    else{
      this.props.navigation.goBack()
    }
  }

  render(){
    const { navigate, goBack } = this.props.navigation;
    let { params } = this.props.navigation.state;
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(false); }}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

          <TouchableOpacity style={styles.fab} underlayColor={'transparent'} onPress={() => {this.createRequest(this.state.newSchoolName, this.state.newSchoolDesc, this.state.newSchoolAddress)}}>
            <MaterialIcons
              name="check"
              size={Platform.OS === "ios" ? 30 : 22}
              color={Platform.OS === "ios" ? "#9513fe":"#fff"}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>

          <View style={styles.modalNav}>
            <TouchableOpacity
              //style={{flex: 2}}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              {/* <Text style={{ marginTop: 3}}> */}
              {Platform.OS === 'ios' ? <Text style={{fontSize: 17,
                fontWeight: "normal",
              fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>Cancel</Text> :
              <MaterialIcons
                name="close"
                size={25}
                style={{color:'white'}}
              />}
              {/* </Text> */}
            </TouchableOpacity>
            <Text style={{marginLeft: 10, color:(Platform.OS==='ios')?'black':'white', fontSize: 19}} >Request to add new school</Text>
            <TouchableOpacity
              onPress={() => {this.createRequest(this.state.newSchoolName, this.state.newSchoolDesc, this.state.newSchoolAddress)}}>
              {Platform.OS === 'ios' ? <Text style={{fontSize: 17,
                fontWeight: "600",
              fontStyle: "normal",fontFamily: 'System',color: "#9513fe", paddingRight: 15}}>Done</Text> :<Text></Text>}
            </TouchableOpacity>
          </View>

          <View style={{padding: (Platform.OS==='ios')? 0 : 10,}}>

            {(Platform.OS==='android')?
              <View>
                <TextField
                  style={styles.textFieldstyle,{fontFamily: 'System',}}
                  label='School name'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  titleFontSize={11}
                  labelFontSize={11}
                  lineWidth={1.3}
                  onChangeText={ (newSchoolName) => this.setState({ newSchoolName }) }
                  value={this.state.newSchoolName}
                />

                <TextField
                  style={styles.textFieldstyle,{fontFamily: 'System',}}
                  label='Description'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  titleFontSize={11}
                  labelFontSize={11}
                  lineWidth={1.3}
                  onChangeText={ (newSchoolDesc) => this.setState({ newSchoolDesc }) }
                  value={this.state.newSchoolDesc}
                />

                <TextField
                  style={styles.textFieldstyle,{fontFamily: 'System',}}
                  label='Address'
                  textColor='#888585'
                  tintColor='#888585'
                  baseColor='#afadad'
                  fontSize={15}
                  titleFontSize={11}
                  labelFontSize={11}
                  lineWidth={1.3}
                  onChangeText={ (newSchoolAddress) => this.setState({ newSchoolAddress }) }
                  value={this.state.newSchoolAddress}
                />
              </View>
            :
            <View>
              <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: .5,borderTopColor: "#bcbbc1"}}>
                <Text style={{flex: .35, fontFamily: "System", fontSize: 18,color: "black"}}>School Name</Text>
                <TextInput
                  style={{flex: .65,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                  placeholder = "Input"
                  placeholderTextColor = "#c7c7cd"
                  onChangeText={ (newSchoolName) => this.setState({ newSchoolName }) }
                  value={this.state.newSchoolName}
                />
              </View>

              <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: 1,borderTopColor: "#bcbbc1"}}>
                <Text style={{flex: .35, fontFamily: "System", fontSize: 18,color: "black"}}>Description</Text>
                <TextInput
                  style={{flex: .65,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                  placeholder = "Input"
                  placeholderTextColor = "#c7c7cd"
                  onChangeText={ (newSchoolDesc) => this.setState({ newSchoolDesc }) }
                  value={this.state.newSchoolDesc}
                />
              </View>

              <View style={{paddingHorizontal: 10,paddingVertical: 20,flexDirection: 'row',borderTopWidth: .5,borderBottomWidth: 1,borderBottomColor: "#bcbbc1",borderTopColor: "#bcbbc1"}}>
                <Text style={{flex: .35, fontFamily: "System", fontSize: 18,color: "black"}}>Address</Text>
                <TextInput
                  style={{flex: .65,fontFamily: 'System',fontSize: 17,fontWeight: "normal",fontStyle: "normal",textAlign: "left",color: "#000000"}}
                  placeholder = "Input"
                  placeholderTextColor = "#c7c7cd"
                  onChangeText={ (newSchoolAddress) => this.setState({ newSchoolAddress }) }
                  value={this.state.newSchoolAddress}
                />
              </View>
            </View>
            }
          </View>
        </Modal>

        <View style={styles.schoolNav}>
          <View style={styles.navButtonback}>
            <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} onPress={() => this.backFunction()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons
                  name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                  size={Platform.OS==="ios"?40:25}
                  color={Platform.OS==='ios'?"#9513fe":"#fff"}
                />
                {(Platform.OS==="ios")?<Text style={{fontFamily: 'System',color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.textinputView}>
            <TextInput style = {styles.navText}
              underlineColorAndroid = "transparent"
              placeholder = "Enter school name or zip to filter"
              placeholderTextColor = "#abacc8"
              autoCapitalize = "none"
              onChangeText={(text) => this.searchSchoolsFunc(text)}
              // style={styles.input}
            />
          </View>
          <View style={styles.navButtonHolder}>
            <TouchableHighlight  style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="keyboard-voice"
                size={28}
                color={Platform.OS==='ios'?"#9513fe":"#abacc8"}
              />
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            data={this.state.searchschool}
            renderItem={
              ({item}) =>{
                return(
                  //   <TouchableOpacity onPress={() => navigate('SchoolSendInvite', {group_id: item.group_id, group_name: item.name})}>
                  //     <SchoolView
                  //       name={item.name}
                  //       address={item.meta_data.school_address}
                  //       distance={this.distance(this.state.region.latitude, this.state.region.longitude, item.latitude, item.longitude )+' m'}
                  //     />
                  // </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('SchoolSendInvite', {group_id: item.group_id, group_name: item.name, group_address:item.meta_data.school_address})}>
                      <SchoolView name={item.name} address={item.meta_data.school_address} distance={this.distance(this.state.region.latitude, this.state.region.longitude, item.latitude, item.longitude )+' m'} />
                    </TouchableOpacity>
                )
              }
            }
            keyExtractor={(item, index) => item.name}
          />
        </View>

        <TouchableOpacity
          style={styles.addnewschool}
          onPress={() => {this.setModalVisible(true);}}>
          <Text style={{ fontFamily: 'System',color: '#981bfe', fontSize: 14, fontWeight:"400"}}>REQUEST TO ADD NEW school</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: (Platform.OS==='ios')?'#f4f4f7':'#fff',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0,
    flex:1
  },
  textinputView:{
    flex:7,
    marginLeft: 10,
    padding: (Platform.OS==='ios')?10:0,
    borderRadius: (Platform.OS==='ios')?10:0,
    backgroundColor: (Platform.OS==='ios')?"rgba(72, 75, 137, 0.12)":"transparent"
  },
  navText: {
    fontFamily: 'System',
    color: (Platform.OS==='ios')?'#000':'#c1c1d6',
    fontSize: 14,
    //paddingTop:10,
    //paddingBottom: 10,
    //height: 40,
    flex: 2,
    //height: 40,
  },
  navButtonHolder:{
    justifyContent:'center'
  },
  navButtonback:{
    justifyContent:'center',
    //paddingLeft: 15,
    //flex:1
  },
  schoolNav: {
    //flex: 1,
    flexDirection: 'row',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 45 : 30 : 5,
    paddingLeft: (Platform.OS === 'ios') ? 0:15,
    paddingBottom: (Platform.OS === 'ios') ? 10:5,
    paddingRight:15,
    //maxHeight: 50,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    zIndex: 40,
    position: 'absolute',
    top: 0
  },
  addnewschool:{
    paddingTop:30,
    paddingBottom:50,
    marginLeft:20
  },
  input:{
    fontFamily: 'System',
    fontSize:15,
    color:'#fff'
  },
  navbar: {
    backgroundColor: '#484b89',
    height: 55,
    paddingLeft: 12,
    paddingTop: 15,
    flexDirection:'row'
  },
  containerStyle: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    height: 75,
    alignContent: 'flex-start',
  },
  navbartextInpView:{
    flex:10,
  },
  navbarIcon:{
    paddingRight:7,
  },
  body:{
    marginTop:90,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom:15,
    // borderColor: 'red',
    // borderWidth: 2
  },
  myschooltitleview:{
    paddingLeft: 15,

  },
  myschooltitle:{
    fontFamily: 'System',
    color:'#64679a',
    fontWeight:"500",
    fontSize:15
  },
  containerImage:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:2,
  },
  containerView:{
    flex:6,
    justifyContent: 'center',
    paddingLeft:10
  },
  containermainText:{
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    color: '#212121',
    paddingBottom: 2
  },
  containersubText:{
    fontFamily: 'System',
    fontSize: 12,
    color: '#7b7b7b'
  },
  containerDistanceView:{
    flex:2,
    justifyContent:'center',
    alignItems: 'center',

  },
  containerDistanceText:{
    fontFamily: 'System',
    fontSize: 12
  },
  modalNav: {
    alignItems: 'center',
    justifyContent: (Platform.OS==='ios') ? 'space-between' : 'flex-start',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 45 : 30 : 15,
    paddingLeft: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    //maxHeight: 60
  },
  fab: {
    justifyContent: "center",
    alignContent: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "#ecd9fc",
        height: 50,
        width: 70,
        borderRadius: 10,
      },
      android: {
        backgroundColor: "#9513fe",
        height: 60,
        width: 60,
        borderRadius: 30,
        padding: 14,
      }
    }),
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 3,
    zIndex: 5,
    overflow: "hidden"
  },
});
