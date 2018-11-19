import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Alert,
  Image,
  CheckBox,
  Modal,
  StatusBar,
  ToolbarAndroid,
  Platform,
  FlatList,
  AsyncStorage,
  Dimensions,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements';
const api =  require('../../api/index');
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
import Colors2 from '@theme/ColorsTwo';

let { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var locationStore = Stores.locationStore.getData()
var LATITUDE = locationStore.latitude;
var LONGITUDE = locationStore.longitude;
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
          <Image
            source={require('../../images/Oval.png')}
            style={{margin: 10}}
          />
        </View>
        <View style={styles.containerView}>
          <Text style={styles.containermainText} >{this.props.name}</Text>
          <Text style={styles.containersubText} >{this.props.address}</Text>
        </View>
        <View style={styles.containerDistanceView}>
          <Text style={styles.containerDistanceText} >{this.props.distance}</Text>
        </View>
      </View>
    )
  }
}

export default class NearBySchools extends React.Component {
  state = {
    text: 'Specify your parameters',
    range: 50,
    serverData : null,
    mySchools : [],
    range: 50,
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  }

  static navigationOptions = {
    title: 'School list view',
    header: null
  };

  constructor(props) {
    super(props);
  }

  getNearBySchools(){
    loaderHandler.showLoader("Loading...");
    const { navigate,replace } = this.props.navigation;
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        loaderHandler.hideLoader();
        alert(err)
      }
      else{
        // api.nearbySchools({
        //   lat: this.state.region.latitude,
        //   lon: this.state.region.longitude,
        //   radius: this.state.range,
        //   token: item
        // }, (e, r) => {
        //   if(e){
        //     alert("Error: "+e);
        //   }
        //   else{
        //     if(r.success == true){
        //       this.setState({serverData: r.result.schools});
        //     }
        //     else {
        //       // alert('Failed!');
        //     }
        //   }
        // })

        var savedFilter = Stores.filterStore.getSchoolFilters()
        var schoolLevel = ''
        switch(savedFilter.type) {
          case 'Elementary Schools':
          schoolLevel = 'ELEMENTARY';
          break;

          case 'High Schools':
          schoolLevel = 'SENIOR';
          break;

          case 'Middle Schools':
          schoolLevel = 'JUNIOR';
          break;

          case 'Charter Schools':
          schoolLevel = 'CHARTER';
          break;

          case 'Private Schools':
          schoolLevel = 'PRIVATE';
          break;
        }

        api.findSchool({
          name: savedFilter.name,
          zip: savedFilter.zip,
          type: schoolLevel,
          token: item
        }, (e, r) => {
          if(e){
            loaderHandler.hideLoader();
            alert("Error: "+e);
          }
          else{
            loaderHandler.hideLoader();
            if(r.success == true){
              if(r.result.result.length > 20){
                Alert.alert(
                  'School search',
                  'Your search has more than maximum limit of results. Please add more data to search.',
                  [
                    //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => replace('SchoolFilter')},
                  ],
                  { cancelable: false }
                )
              }
              else if(r.result.result.length == 0){
                Alert.alert(
                  'School search',
                  'No result found. Please add more data to search.',
                  [
                    //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'Add more data to search', onPress: () => replace('SchoolFilter')},
                    {text: 'Request to add School', onPress: () => navigate('SchoolAdd')},
                  ],
                  { cancelable: false }
                )
              }
              else{
                this.setState({serverData: r.result.result});
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

  componentWillUnmount(){
  }

  componentWillMount(){
    const { replace } = this.props.navigation;
    var savedFilter = Stores.filterStore.getSchoolFilters()
    console.log(savedFilter)
    if(savedFilter.zip){
      console.log('got zip')
    }
    else{
      console.log('no zip')
      replace('SchoolFilter')
    }
  }

  componentDidMount(){
    var savedFilter = Stores.filterStore.getSchoolFilters()
    console.log(savedFilter)
    if(savedFilter.zip){
      var searchText = savedFilter.zip + ', ' + savedFilter.name
      this.setState({
        text:searchText
      })
    }

    // let itemArray = Stores.groupChannelStore.getData()
    // var schoolArray = []
    // if(itemArray){
    //   itemArray.forEach(function(i){
    //     if(i.group_type == 'general' && i.state == 1){
    //       schoolArray.push(i)
    //     }
    //   })
    // }
    // if(schoolArray.length > 0){
    //   this.setState({mySchools: schoolArray});
    // }

    this.getNearBySchools();
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.schools.list = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.schools.list = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;

    return(
      <View style={styles.container}>

        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        {/* {
          Platform.OS==='ios'
          ?
          <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89'}}>
            <View style={{justifyContent: 'space-between',flexDirection: 'row',flex: 1,marginRight: 10, padding: 10, borderRadius: 10, backgroundColor: "rgba(72, 75, 137, 0.12)"}}>
          <Text style = {styles.navText,{color: "#000000",marginTop:5}}>
          {this.state.text}
          </Text>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="create"
          size={28}
          style={{color:'#c1c1d6'}}
          onPress={() => navigate('SchoolFilter') }
          />
          </TouchableHighlight>
            </View>

            <TouchableHighlight underlayColor={'transparent'} onPress={() =>replace('SchoolMapScreen')}>
          <Text style={{paddingLeft: 10,marginTop: 8,fontSize: 17,fontWeight: "normal",fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>
          Map
          </Text>
            </TouchableHighlight>
          </View>
          :
          <View style={styles.schoolNav}>
            <View style = {styles.navTextHolder}>
          <Text style = {styles.navText}>
          {this.state.text}
          </Text>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="create"
          size={28}
          style={{color:'#c1c1d6'}}
          onPress={() => navigate('SchoolFilter') }
          />
          </TouchableHighlight>
            </View>

            <View style={styles.navButtonHolder}>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="map"
          size={28}
          style={{color:'white'}}
          onPress={() =>replace('SchoolMapScreen')}
          />
          </TouchableHighlight>
            </View>
          </View>
        } */}

        <View style={styles.schoolNav}>
          <View style = {styles.navTextHolder}>
            <Text style = {styles.navText}>
              {this.state.text}
            </Text>
            <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} onPress={() => navigate('SchoolFilter') }>
              <MaterialIcons
                name="create"
                size={28}
                style={{color:'#c1c1d6'}}
              />
            </TouchableHighlight>
          </View>

          <TouchableHighlight style={{alignItems: 'center'}} underlayColor={'transparent'} onPress={() =>replace('SchoolMapScreen')}>
            <Text style={{fontSize: 17, fontWeight: "normal", fontStyle: "normal",fontFamily: 'System',color: (Platform.OS === 'ios') ? Colors2.brandPrimary : "#fff"}}>Map</Text>
          </TouchableHighlight>
        </View>

        <ScrollView style={styles.scrollview}>

          {/* <Text style={styles.textHeader}>My schools</Text>

            <FlatList
            data={this.state.mySchools}
            renderItem={
              ({item}) =>{
            return(
            <TouchableOpacity onPress={() => navigate('SchoolSendInvite', {group_id: item.group_id, group_name: item.name, group_address:item.meta_data.school_address})}>
            <SchoolView name={item.name} address={item.meta_data.school_address} distance={''} />
            </TouchableOpacity>
            )
              }
            }
            keyExtractor={(item, index) => item.name}
          /> */}

          <Text style={styles.textHeader}>Search Results</Text>

          <FlatList
            data={this.state.serverData}
            renderItem={
              ({item}) =>{
                return(
                  <TouchableOpacity onPress={() => navigate('SchoolSendInvite', {group_id: item.group_id, group_name: item.name, group_address:item.meta_data.school_address})}>
                    <SchoolView name={item.name} address={item.meta_data.school_address} distance={''} />
                  </TouchableOpacity>
                )
              }
            }
            keyExtractor={(item, index) => item.name}
          />

          <View style={{marginTop: '50%',justifyContent: 'space-between', alignItems: 'flex-start', padding:'10%'}} >
            <TouchableOpacity
              style={{alignItems: 'center', flexDirection:'row'}}
              onPress={() => navigate('SchoolAdd')}
              underlayColor={'transparent'}>
              <View style={{borderRadius: 26, height: 52, width: 52, backgroundColor: '#dedfea', alignContent: 'center', justifyContent: 'center',marginRight:10}} >
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../../images/schoolsNearBy.png')}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text>
                  Didn't find your school here?
                </Text>
                <Text style={{fontFamily:"System",color:Colors2.brandPrimary,fontSize:16,fontWeight: '400',marginTop:5}} >REQUEST TO ADD ONE.</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() =>navigate('SchoolSearchScreen', {fromHome: false})}>
          <MaterialIcons
            name="search"
            size={Platform.OS === "ios" ? 30 : 22}
            color={Platform.OS === "ios" ? "#9513fe":"#fff"}
            style={{ alignSelf: "center" }}
          />
        </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textHeader:{
    fontFamily: "System",
    color: '#484B89',
    marginTop: 15,
    marginBottom: 5,
    paddingLeft: 10,
    fontSize: 15,
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
  container:{
    flex: 1,
    flexDirection: 'column',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 35 : 20 : 0,
    // backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    // marginBottom:60,
    // paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  navbar: {
    backgroundColor: '#484b89',
    height: 55,
    padding: 15,
    flexDirection:'row',
    justifyContent: 'space-between'
  },

  containerStyle: {
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { width:3, height: 4},
    shadowOpacity: 1.0,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 75,
    alignContent: 'flex-start',


  },
  // navbartextInpView:{
  //   flex:10
  // },
  navbarIcon:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scrollview:{
    backgroundColor: '#ededf3',
    paddingTop:0,
  },
  myschooltitleview:{
    paddingLeft: 15,
    backgroundColor: '#ededf3'
  },
  myschooltitle:{
    fontFamily: "System",
    color:'#64679a',
    fontWeight:"500",
    fontSize:15
  },
  containerImage:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerView:{
    flex:6,
    justifyContent: 'center',
    paddingLeft:10
  },
  containermainText:{
    fontFamily: "System",
    fontSize: 14,
    fontWeight: '400',
    color: '#212121',
    paddingBottom: 2
  },
  containersubText:{
    fontFamily: "System",
    fontSize: 12,
    color: '#7b7b7b',
  },
  containerDistanceView:{
    flex:2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5
  },
  containerDistanceText:{
    fontFamily: "System",
    fontSize: 12
  },
  // navIcon: {
  //   marginLeft: 15,
  //   marginTop: (Platform.OS === 'ios') ? 0 : 8,
  //   marginRight: 5
  // },
  modalNav: {
    alignItems: 'center',
    justifyContent: (Platform.OS === 'ios') ?'space-between':'flex-start',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 45 : 30:15,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    //maxHeight: 60
  },
  schoolNav: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //maxHeight: 50,
    // backgroundColor: Platform.OS==='ios'?"rgba(238, 238, 251, 0.7)":'#484b89b8',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    paddingHorizontal:15,
    paddingVertical:10,
    alignItems: 'center'
    //zIndex: 4,
    //elevation: 5,
  },
  navTextHolder:{
    flex: 1,
    backgroundColor: (Platform.OS === 'ios') ? "rgba(72, 75, 137, 0.12)" : '#9395b8',
    borderRadius: (Platform.OS === 'ios') ? 10 : 5,
    paddingHorizontal:10,
    paddingVertical: (Platform.OS === 'ios') ? 10 : 5,
    marginHorizontal:30,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navText: {
    fontFamily: 'System',
    color: (Platform.OS === 'ios') ? '#000000' : '#c1c1d6',
  },
  navIcon: {
    marginLeft: 10,
    //marginTop: (Platform.OS === 'ios') ? 0 : 8,
    marginRight: 5
  },
  navButtonHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
