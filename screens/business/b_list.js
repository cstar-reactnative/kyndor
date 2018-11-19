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
  Alert,
  Platform,
  AsyncStorage,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  // CheckBox,
  StatusBar
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements';
const api =  require('../../api/index');
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
import BlurbModel from '../common/blurbModal.js';
import Colors2 from '@theme/ColorsTwo';

const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

let { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var locationStore = Stores.locationStore.getData()
// var LATITUDE = 37.78825;
var LATITUDE = locationStore.latitude;
// var LONGITUDE = -122.4324;
var LONGITUDE = locationStore.longitude;
var LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class BusinessView extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.containerImage}>
          <Image style={styles.imageStyle} source={require('../../images/company/c1.png')}/>
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

export default class BusinessMain extends React.Component {
  state = {
    mybusinesss: [],
    serverData: null,
    range: 50,
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    topText: 'Specify your parameters'
  }

  static navigationOptions = {
    title: 'Business list view',
    header: null
  };

  constructor(props) {
    super(props);
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

  loadMyBusiness(){
    let itemArray = Stores.groupChannelStore.getData()
    var businessArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type == 'buisness') {
          businessArray.push(i)
        }
      })
    }
    this.setState({mybusinesss: businessArray});
  }

  loadNearByBusiness(){
    const { navigate,replace } = this.props.navigation;
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        loaderHandler.hideLoader();
        alert(err)
      }
      else{
        // api.nearbyBusinessWithFilter({
        //   lat:this.state.region.latitude,
        //   lon:this.state.region.longitude,
        //   rad:this.state.range,
        //   token:item,
        //   filters:[]
        // },(e, r) => {
        //   if(e){
        //     alert("Error: "+e);
        //   }
        //   else{
        //     if(r.success == true){
        //       this.setState({serverData: r.result.business});
        //     }
        //     else {
        //       // alert('Failed!');
        //     }
        //   }
        // })

        var savedFilter = Stores.filterStore.getBusinessFilters()
        api.findBusiness({
          name: savedFilter.name,
          zip: savedFilter.zip,
          token: item
        },
        (e, r) => {
          if(e){
            loaderHandler.hideLoader();
            console.log("Error: "+e);
          }
          else{
            loaderHandler.hideLoader();
            if(r.success == true){

              if(r.result.result.length > 20){
                Alert.alert(
                  'Business search',
                  'Your search has more than maximum limit of results. Please add more data to search.',
                  [
                    //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => replace('B_filter')},
                  ],
                  { cancelable: false }
                )
              }
              else if (r.result.result.length == 0) {
                Alert.alert(
                  'Business search',
                  'No result found. Please add more data to search.',
                  [
                    //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'Add more data to search', onPress: () => replace('B_filter')},
                    {text: 'Request to add Business', onPress: () => navigate('B_add')},
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

  componentWillMount(){
    const { replace } = this.props.navigation;
    var savedFilter = Stores.filterStore.getBusinessFilters()
    console.log(savedFilter)
    if(savedFilter.zip){
      console.log('got zip')
    }
    else{
      console.log('no zip')
      replace('B_filter')
    }
  }

  componentWillUnmount(){

  }

  componentDidMount(){
    loaderHandler.showLoader("Loading...");
    var savedFilter = Stores.filterStore.getBusinessFilters()
    console.log(savedFilter)
    if(savedFilter.zip){
      var searchText = savedFilter.zip
    }
    if(savedFilter.name){
      var searchText = searchText + ', ' + savedFilter.name
    }
    this.setState({
      topText:searchText
    })

    // my business
    // this.loadMyBusiness() // dont load my group for now

    // nearby business
    this.loadNearByBusiness()
  }

  closeDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.business.list = false
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: false
    })
  }

  showDisplay(){
    let chatStoreData = Stores.chartStore.getData()
    chatStoreData.business.list = true
    Stores.chartStore.setData(chatStoreData)
    this.setState({
      display: true
    })
  }

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;
    // console.log(region);

    return(
      <View style={styles.mainView}>

        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        <View style={styles.schoolNav}>
          <View style = {styles.navTextHolder}>
            <Text style = {styles.navText}>
              {this.state.topText}
            </Text>
            <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} onPress={() => navigate('B_filter') }>
              <MaterialIcons
                name="create"
                size={28}
                style={{color:'#c1c1d6'}}
              />
            </TouchableHighlight>
          </View>

          <TouchableHighlight style={{alignItems: 'center'}} underlayColor={'transparent'} onPress={() =>replace('MapScreen')}>
            <Text style={{fontSize: 17, fontWeight: "normal", fontStyle: "normal",fontFamily: 'System',color: (Platform.OS === 'ios') ? Colors2.brandPrimary : "#fff"}}>Map</Text>
          </TouchableHighlight>
        </View>

        {/* <BlurbModel
          text={'Enter your zip code and click on each location for permission to join a business group.'}
          display={this.state.display} onPress={() => {this.closeDisplay()}} onPress1={() => {this.showDisplay()}}
        /> */}

        <ScrollView style={styles.scrollview}>

          {/* <Text style={styles.textHeader}>My business</Text>

            <FlatList
            data={this.state.mybusinesss}
            renderItem={({item}) =>{
              return(
            <TouchableOpacity onPress={() => navigate('B_details', {group_id: item.group_id, group_name: item.name, group_address: item.meta_data.address, fromHome: false})}>
            <BusinessView name={item.name} address={item.meta_data.address} distance={''} />
            </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => item.name}
          /> */}

          <Text style={styles.textHeader}>Search Results</Text>

          <FlatList
            data={this.state.serverData}
            renderItem={
              ({item}) =>{
                return(
                  <TouchableOpacity onPress={() => navigate('B_join', {group_id: item.group_id, group_name: item.name, group_address: item.meta_data.address})}>
                    <BusinessView name={item.name} address={item.meta_data.address} distance={''} />
                  </TouchableOpacity>
                )
              }
            }
            keyExtractor={(item, index) => item.name}
          />

          <View style={{marginTop: '50%',justifyContent: 'space-between', alignItems: 'flex-start', padding:'10%'}} >
            <TouchableOpacity
              style={{alignItems: 'center', flexDirection:'row'}}
              onPress={() => navigate('B_add')}
              underlayColor={'transparent'}>
              <View style={{borderRadius: 26, height: 52, width: 52, backgroundColor: '#dedfea', alignContent: 'center', justifyContent: 'center',marginRight:10}} >
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../../images/bussinessSearch.png')}
                />
              </View>
              <View style={{flexDirection:'column'}}>
                <Text>
                  Didn't find your business here?
                </Text>
                <Text style={{fontFamily: "System",color: Colors2.brandPrimary, fontSize: 16, fontWeight: '400',marginTop:5}} >REQUEST TO ADD ONE.</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* <TouchableHighlight style={styles.fab} activeOpacity={0.5} underlayColor={'transparent'} onPress={() =>navigate('BusinessSearch', {fromHome: false})}>
          <MaterialIcons
            name="search"
            size={Platform.OS === "ios" ? 30 : 22}
            color={Platform.OS === "ios" ? "#9513fe":"#fff"}
            style={{ alignSelf: "center" }}
          />
        </TouchableHighlight> */}
        {/* <BusyIndicator style={{zIndex: 99}}/> */}
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
    color: '#7b7b7b'
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
  containerView:{
    flex:6,
    justifyContent: 'center',
    paddingLeft:10
  },
  containerImage:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  containerStyle: {
    borderRadius:5,
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 4},
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
    overflow:'hidden'
  },
  scrollview: {
    backgroundColor: '#ededf3',
    paddingTop:10,
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

  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 35 : 20 : 0,
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
