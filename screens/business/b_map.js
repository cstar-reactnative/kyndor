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
  Alert,
  Modal,
  AsyncStorage,
  CheckBox,
  Platform,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import MapCustomCallout from '../schools/MapCustomCallout';
import { Badge } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
const api =  require('../../api/index');
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
import Colors2 from '@theme/ColorsTwo';

let { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var locationStore = Stores.locationStore.getData()
var LATITUDE = locationStore.latitude;
var LONGITUDE = locationStore.longitude;
var LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var _mapView: MapView;

export default class BusinessMapScreen extends React.Component {
  state = {
    range: 50,
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    myNearByBusiness:[],
    mybusinesss:[],
    updateMap: true,
    topText: 'Specify your parameters'
  };

  static navigationOptions = {
    title: 'Business map view',
    header: null
  };

  loadMyBusiness(){
    let itemArray = Stores.groupChannelStore.getData()
    var businessArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type == 'business'){
          businessArray.push(i.group_id)
        }
      })
    }
    this.setState({mybusinesss: businessArray});
  }

  getNearByBusiness(){
    const { navigate,replace } = this.props.navigation;
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
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
        //       this.setState({myNearByBusiness: r.result.business});
        //       if(this._mapView != null){
        //         this._mapView.animateToRegion(this.state.region, 500);
        //       }
        //     }
        //     else {
        //       console.log('Failed!');
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
            console.log("Error: "+e);
          }
          else{
            if(r.success == true){
              console.log('Length of result: '+r.result.result.length)

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
              else if(r.result.result.length == 0){
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
                this.setState({
                  myNearByBusiness: r.result.result,
                  region: {
                    latitude: r.result.result[0].latitude,
                    longitude: r.result.result[0].longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }
                });
                this._mapView.animateToRegion(this.state.region, 500);
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

  componentDidMount(){
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

    this.loadMyBusiness()
  }

  updateRegion(region){
    this.setState({region})
    if(this.state.updateMap){
      this.setState({region})
      // this.getNearByBusiness()
    }
  }

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;
    //console.log(region);

    return(
      <View style={styles.mainView}>

        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        {/* {
          Platform.OS==='ios'
            ?
          <View style={styles.schoolNav}>
          <View style={{justifyContent: 'space-between',flexDirection: 'row',flex: 1,marginRight: 10, padding: 10, borderRadius: 10, backgroundColor: "rgba(72, 75, 137, 0.12)"}}>
          <Text style = {styles.navText,{color: "#000000",marginTop:5}}>
          {this.state.topText}
          </Text>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="create"
          size={28}
          style={{color:'#c1c1d6'}}
          onPress={() => navigate('B_filter') }
          />
          </TouchableHighlight>
          </View>


          <TouchableHighlight underlayColor={'transparent'} onPress={() =>replace('ListScreen')}>
          <Text style={{paddingLeft: 10,marginTop: 8,fontSize: 17,
          fontWeight: "normal",
          fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>List</Text>
          </TouchableHighlight>
          </View>
            :
            <View style={styles.schoolNav}>
          <View style = {styles.navTextHolder}>
          <Text style = {styles.navText}>
          {this.state.topText}
          </Text>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="create"
          size={28}
          style={{color:'#c1c1d6'}}
          onPress={() => navigate('B_filter') }
          />
          </TouchableHighlight>
          </View>

          <View style={styles.navButtonHolder}>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="format-list-bulleted"
          size={28}
          style={{color:'white'}}
          onPress={() =>replace('ListScreen')}
          />
          </TouchableHighlight>
            </View>
          </View>
        } */}

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

          <TouchableHighlight style={{alignItems: 'center'}} underlayColor={'transparent'} onPress={() =>replace('ListScreen')}>
            <Text style={{fontSize: 17, fontWeight: "normal", fontStyle: "normal",fontFamily: 'System',color: (Platform.OS === 'ios') ? Colors2.brandPrimary : "#fff"}}>List</Text>
          </TouchableHighlight>
        </View>

        <MapView
          ref = {mapView => { this._mapView = mapView; }}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={ this.state.region }
          zoomEnabled
          rotateEnabled
          scrollEnabled
          loadingEnabled
          loadingIndicatorColor='#9513fe'
          loadingBackgroundColor='transparent'
          // onRegionChange={ region => this.setState({region}) }
          onMapReady={() => this.getNearByBusiness()}
          onRegionChangeComplete={ region => this.updateRegion(region) }>

          {this.state.myNearByBusiness.map((item) => (
            <Marker
              key={item.group_id}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              // image={require('../../images/marker.png')}
              image={(((this.state.mybusinesss).indexOf(item.group_id)) != -1) ? require('../../images/myBusinessIcon.png') : require('../../images/businessMap.png')}>
              <MapView.Callout
                onPress={() => {
                  if(((this.state.mybusinesss).indexOf(item.group_id)) != -1){
                    navigate('B_details', {group_id: item.group_id, group_name: item.name, group_address: item.meta_data.address, fromHome: false})
                  }
                  else{
                    navigate('B_join', {group_id: item.group_id, group_name: item.name, group_address: item.meta_data.address})
                  }
                }}>
                <MapCustomCallout name={item.name} address={item.meta_data.school_address} distance={''} style={{width: 100}} />
              </MapView.Callout>
            </Marker>
          ))}
        </MapView>

        {/* <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() =>navigate('BusinessSearch')}>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0
  },

  mainView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 40 : 20 : 0,
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#32345f',
  },
  schoolNav: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //maxHeight: 50,
    backgroundColor: Platform.OS==='ios'?"rgba(238, 238, 251, 0.7)":'#484b89b8',
    paddingHorizontal:15,
    paddingVertical:10,
    zIndex: 4,
    elevation: 5,
    alignItems: 'center'
  },
  navButtonHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalNav: {
    alignItems: 'center',
    justifyContent: (Platform.OS === 'ios') ?'space-between':'flex-start',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX() ? 45 : 30 : 15,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    //maxHeight: 60
  },
  navbarIcon:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});
