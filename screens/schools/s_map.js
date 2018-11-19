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
  Modal,
  Alert,
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
import MapCustomCallout from './MapCustomCallout';
import { Badge } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');
import Stores from '../../stores/'
import Colors2 from '@theme/ColorsTwo';

let { width, height } = Dimensions.get('window');
var ASPECT_RATIO = width / height;
var locationStore = Stores.locationStore.getData()
var LATITUDE = locationStore.latitude;
var LONGITUDE = locationStore.longitude;
var LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var _mapView: MapView;

export default class SchoolMapScreen extends React.Component {
  state = {
    //width: width,
    range: 50,
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    myNearBySchools: [],
    searchschool: [],
    mySchools: [],
    updateMap: true,
    topText: 'Specify your parameters'
  };

  static navigationOptions = {
    title: 'School map view',
    header: null
  };

  getNearBySchools(){
    const { navigate,replace } = this.props.navigation;
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert('getNearBySchools: '+JSON.stringify(err))
      }
      else{
        // api.nearbySchools({
        //   lat: this.state.region.latitude,
        //   lon: this.state.region.longitude,
        //   radius: this.state.range,
        //   token: item
        // },
        // (e, r) => {
        //   if(e){
        //     alert("Error: "+e);
        //   }
        //   else{
        //     if(r.success == true){
        //       this.setState({myNearBySchools: r.result.schools});
        //       if(this._mapView != null){
        //         this._mapView.animateToRegion(this.state.region, 500);
        //       }
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
            alert("Error: "+e);
          }
          else{
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
                this.setState({
                  myNearBySchools: r.result.result,
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

  mySchools(){
    let itemArray = Stores.groupChannelStore.getData()
    var schoolArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type == 'general' && i.state == 1){
          schoolArray.push(i.group_id)
        }
      })
    }
    // alert(schoolArray.length)
    if(schoolArray.length > 0){
      this.setState({mySchools: schoolArray});
    }
  }

  componentWillUnmount(){

  }

  componentDidMount(){
    var savedFilter = Stores.filterStore.getSchoolFilters()
    console.log(savedFilter)
    if(savedFilter.zip){
      var searchText = savedFilter.zip + ', ' + savedFilter.name
      this.setState({
        topText:searchText
      })
    }

    // this._mapView.animateToRegion(this.state.region, 500);
    this.mySchools()
  }

  updateRegion(region){
    this.setState({region})
    if(this.state.updateMap){
      this.setState({region})
      // this.getNearBySchools()
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
          onPress={() => navigate('SchoolFilter') }
          />
          </TouchableHighlight>
            </View>

            <TouchableHighlight underlayColor={'transparent'} onPress={() =>replace('SchoolListScreen')}>
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
          onPress={() => navigate('SchoolFilter') }
          />
          </TouchableHighlight>
            </View>

            <View style={styles.navButtonHolder}>
          <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
          <MaterialIcons
          name="format-list-bulleted"
          size={28}
          style={{color:'white'}}
          onPress={() =>replace('SchoolListScreen')}
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
            <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} onPress={() => navigate('SchoolFilter') }>
              <MaterialIcons
                name="create"
                size={28}
                style={{color:'#c1c1d6'}}
              />
            </TouchableHighlight>
          </View>

          <TouchableHighlight style={{alignItems: 'center'}} underlayColor={'transparent'} onPress={() =>replace('SchoolListScreen')}>
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
          onMapReady={() => this.getNearBySchools()}
          onRegionChangeComplete={ region => this.updateRegion(region) }
        >

          {this.state.myNearBySchools.map((item) => (
            <Marker
              key={item.group_id}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              // image={require('../../images/marker.png')}
              image={(((this.state.mySchools).indexOf(item.group_id)) != -1) ? require('../../images/mySchool.png') : require('../../images/school.png')}>
              <MapView.Callout
                onPress={() => navigate('SchoolSendInvite', {group_id: item.group_id, group_name: item.name})}>
                <MapCustomCallout name={item.name} address={item.meta_data.school_address} distance={''} style={{width: 100}} />
              </MapView.Callout>
            </Marker>
          ))}
        </MapView>

        {/* <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() =>navigate('SchoolSearchScreen')}>
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
  modalNav: {
    alignItems: 'center',
    justifyContent: (Platform.OS === 'ios') ?'space-between':'flex-start',
    paddingTop: (Platform.OS === 'ios') ? IsIphoneX ? 40 : 30 : 15,
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
});
