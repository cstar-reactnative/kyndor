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
    modalVisible: false,
    range: 50,
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    allFilter: Stores.filterStore.getBusinessFilters()
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert(err)
      }
      else{
        // api.nearbyBusiness({lat: this.state.region.latitude, lon: this.state.region.longitude, radius: this.state.range, token: item}, (e, r) => {
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

        api.nearbyBusinessWithFilter({
          lat:this.state.region.latitude,
          lon:this.state.region.longitude,
          rad:this.state.range,
          token:item,
          filters:this.state.allFilter
        },(e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              this.setState({serverData: r.result.business});
            }
            else {
              // alert('Failed!');
            }
          }
        })

      }
    });
  }

  componentWillUnmount(){

  }

  componentDidMount(){
    // my business
    this.loadMyBusiness()

    // nearby business
    this.loadNearByBusiness()
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  applyFIlter(){
    Stores.filterStore.setBusinessFilters(this.state.allFilter)
    this.loadNearByBusiness()
    this.setModalVisible(false);
  }

  getTextColor(filterName){
    if(this.state.allFilter.length > 0){
      if(this.state.allFilter.indexOf(filterName) == -1) {
        return {
          color: '#6b6b6b', fontSize: 16, paddingVertical: 3
        }
      }
      else{
        return {
          color: '#fff', fontSize: 16, paddingVertical: 3
        }
      }
    }
    else{
      return {
        color: '#6b6b6b', fontSize: 16, paddingVertical: 3
      }
    }
  }

  getColor(filterName){
    if(this.state.allFilter.length > 0){
      if(this.state.allFilter.indexOf(filterName) == -1) {
        return {
          backgroundColor: '#ebebeb', marginRight: 10, marginTop: 8
        }
      }
      else{
        return {
          backgroundColor: '#951dfe', marginRight: 10, marginTop: 8
        }
      }
    }
    else{
      return {
        backgroundColor: '#ebebeb', marginRight: 10, marginTop: 8
      }
    }
  }

  editFilter(filterName){
    if(this.state.allFilter.length > 0){
      if(this.state.allFilter.indexOf(filterName) == -1) {
        if(this.state.allFilter.length == 4){
          alert('Can select a maximum of four filters at a time.')
        }
        else{
          let data = this.state.allFilter
          data.push(filterName)
          this.setState({allFilter: data})
          // alert(this.state.allFilter)
        }
      }
      else{
        let data = this.state.allFilter
        let pos = data.indexOf(filterName)
        data.splice(pos, 1)
        this.setState({allFilter: data})
        // alert(this.state.allFilter)
      }
    }
    else{
      let data = this.state.allFilter
      data.push(filterName)
      this.setState({allFilter: data})
      // alert(this.state.allFilter)
    }
  }

  render(){
    const { navigate, replace } = this.props.navigation;
    const { region } = this.props;
    // console.log(region);

    return(
      <View style={styles.mainView}>

        <Modal
          //style={{marginTop:22, marginBottom:25}}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(false) }}>

          <TouchableHighlight style={styles.fab} underlayColor={'transparent'} onPress={() => this.applyFIlter()}>
            <MaterialIcons
              name="check"
              size={Platform.OS === "ios" ? 30 : 22}
              color={Platform.OS === "ios" ? "#9513fe":"#fff"}
              style={{ alignSelf: "center" }}
            />
          </TouchableHighlight>

          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

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
                size={22}
                style={{color:'white'}}
              />}
              {/* </Text> */}
            </TouchableOpacity>
            <Text style={{fontFamily: "System",marginLeft: 10, color: Platform.OS==="ios"?'black':'white', fontSize: 20}}>Filters</Text>
            <TouchableOpacity
              onPress={() => this.applyFIlter()}>
              {Platform.OS === 'ios' ? <Text style={{fontSize: 17,
                  fontWeight: "600",
              fontStyle: "normal",fontFamily: 'System',color: "#9513fe", paddingRight: 15}}>Done</Text> :<Text></Text>}
            </TouchableOpacity>
          </View>

          <ScrollView style={{padding: 10}}>
            <View style={{borderBottomColor:'#eeeeee',borderBottomWidth:2,marginBottom:6}}>
              <Text style={styles.filterHeader}>Area: {this.state.range} m</Text>
              <Slider
                maximumValue = {100}
                minimumValue = {0}
                value = {this.state.range}
                onValueChange = {(value)=>{this.setState({range: value});}}
                thumbTintColor = {'#9513fe'}
                minimumTrackTintColor = {'#9513fe'}
                style = {{marginBottom: 20}}
              />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                <Text style={styles.filterHeader}>Business type</Text>
              </View>
              <View style={{marginTop:10}} >
                <View style={{backgroundColor:'#c44d00',paddingLeft:4,paddingRight:4}}>
                  <Text style={{fontFamily: "System",fontSize:11,color:'white'}}>{this.state.allFilter.length}</Text>
                </View>
              </View>
            </View>
            <View style={{padding:6}}>

              <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5}}>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Swimming Instruction')}}>
                  <Badge containerStyle={this.getColor('Swimming Instruction')}>
                    <Text style={this.getTextColor('Swimming Instruction'),{fontFamily: "System"}}>
                      Swimming Instruction
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Private Swimming Pools')}}>
                  <Badge containerStyle={this.getColor('Private Swimming Pools')}>
                    <Text style={this.getTextColor('Private Swimming Pools'),{fontFamily: "System"}}>
                      Private Swimming Pools
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Recreation Centers')}}>
                  <Badge containerStyle={this.getColor('Recreation Centers')}>
                    <Text style={this.getTextColor('Recreation Centers'),{fontFamily: "System"}}>
                      Recreation Centers
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Sports Instruction')}}>
                  <Badge containerStyle={this.getColor('Sports Instruction')}>
                    <Text style={this.getTextColor('Sports Instruction'),{fontFamily: "System"}}>
                      Sports Instruction
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Sports Clubs & Organizations')}}>
                  <Badge containerStyle={this.getColor('Sports Clubs & Organizations')}>
                    <Text style={this.getTextColor('Sports Clubs & Organizations'),{fontFamily: "System"}}>
                      Sports Clubs & Organizations
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Public Swimming Pools')}}>
                  <Badge containerStyle={this.getColor('Public Swimming Pools')}>
                    <Text style={this.getTextColor('Public Swimming Pools'),{fontFamily: "System"}}>
                      Public Swimming Pools
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Swimming Pool Repair & Service')}}>
                  <Badge containerStyle={this.getColor('Swimming Pool Repair & Service')}>
                    <Text style={this.getTextColor('Swimming Pool Repair & Service'),{fontFamily: "System"}}>
                      Swimming Pool Repair & Service
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Training Consultants')}}>
                  <Badge containerStyle={this.getColor('Training Consultants')}>
                    <Text style={this.getTextColor('Training Consultants'),{fontFamily: "System"}}>
                      Training Consultants
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Schools')}}>
                  <Badge containerStyle={this.getColor('Schools')}>
                    <Text style={this.getTextColor('Schools'),{fontFamily: "System"}}>
                      Schools
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Swimming Pool Construction')}}>
                  <Badge containerStyle={this.getColor('Swimming Pool Construction')}>
                    <Text style={this.getTextColor('Swimming Pool Construction'),{fontFamily: "System"}}>
                      Swimming Pool Construction
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Exercise & Physical Fitness Programs')}}>
                  <Badge containerStyle={this.getColor('Exercise & Physical Fitness Programs')}>
                    <Text style={this.getTextColor('Exercise & Physical Fitness Programs'),{fontFamily: "System"}}>
                      Exercise & Physical Fitness Programs
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Gymnastics Instruction')}}>
                  <Badge containerStyle={this.getColor('Gymnastics Instruction')}>
                    <Text style={this.getTextColor('Gymnastics Instruction'),{fontFamily: "System"}}>
                      Gymnastics Instruction
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Camps-Recreational')}}>
                  <Badge containerStyle={this.getColor('Camps-Recreational')}>
                    <Text style={this.getTextColor('Camps-Recreational'),{fontFamily: "System"}}>
                      Camps-Recreational
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Parks')}}>
                  <Badge containerStyle={this.getColor('Parks')}>
                    <Text style={this.getTextColor('Parks'),{fontFamily: "System"}}>
                      Parks
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Swimming Pool Dealers')}}>
                  <Badge containerStyle={this.getColor('Swimming Pool Dealers')}>
                    <Text style={this.getTextColor('Swimming Pool Dealers'),{fontFamily: "System"}}>
                      Swimming Pool Dealers
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Swimming Pool Management')}}>
                  <Badge containerStyle={this.getColor('Swimming Pool Management')}>
                    <Text style={this.getTextColor('Swimming Pool Management'),{fontFamily: "System"}}>
                      Swimming Pool Management
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Health Clubs')}}>
                  <Badge containerStyle={this.getColor('Health Clubs')}>
                    <Text style={this.getTextColor('Health Clubs'),{fontFamily: "System"}}>
                      Health Clubs
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Health Resorts')}}>
                  <Badge containerStyle={this.getColor('Health Resorts')}>
                    <Text style={this.getTextColor('Health Resorts'),{fontFamily: "System"}}>
                      Health Resorts
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Personal Fitness Trainers')}}>
                  <Badge containerStyle={this.getColor('Personal Fitness Trainers')}>
                    <Text style={this.getTextColor('Personal Fitness Trainers'),{fontFamily: "System"}}>
                      Personal Fitness Trainers
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Sports & Entertainment Centers')}}>
                  <Badge containerStyle={this.getColor('Sports & Entertainment Centers')}>
                    <Text style={this.getTextColor('Sports & Entertainment Centers'),{fontFamily: "System"}}>
                      Sports & Entertainment Centers
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Physical Fitness Consultants & Trainers')}}>
                  <Badge containerStyle={this.getColor('Physical Fitness Consultants & Trainers')}>
                    <Text style={this.getTextColor('Physical Fitness Consultants & Trainers'),{fontFamily: "System"}}>
                      Physical Fitness Consultants & Trainers
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Swimming Pool Equipment & Supplies')}}>
                  <Badge containerStyle={this.getColor('Swimming Pool Equipment & Supplies')}>
                    <Text style={this.getTextColor('Swimming Pool Equipment & Supplies'),{fontFamily: "System"}}>
                      Swimming Pool Equipment & Supplies
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Diving Instruction')}}>
                  <Badge containerStyle={this.getColor('Diving Instruction')}>
                    <Text style={this.getTextColor('Diving Instruction'),{fontFamily: "System"}}>
                      Diving Instruction
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Diving Excursions & Charters')}}>
                  <Badge containerStyle={this.getColor('Diving Excursions & Charters')}>
                    <Text style={this.getTextColor('Diving Excursions & Charters'),{fontFamily: "System"}}>
                      Diving Excursions & Charters
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Diving Equipment & Supplies')}}>
                  <Badge containerStyle={this.getColor('Diving Equipment & Supplies')}>
                    <Text style={this.getTextColor('Diving Equipment & Supplies'),{fontFamily: "System"}}>
                      Diving Equipment & Supplies
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Sporting Goods')}}>
                  <Badge containerStyle={this.getColor('Sporting Goods')}>
                    <Text style={this.getTextColor('Sporting Goods'),{fontFamily: "System"}}>
                      Sporting Goods
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Yoga Instruction')}}>
                  <Badge containerStyle={this.getColor('Yoga Instruction')}>
                    <Text style={this.getTextColor('Yoga Instruction'),{fontFamily: "System"}}>
                      Yoga Instruction
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Gymnasiums')}}>
                  <Badge containerStyle={this.getColor('Gymnasiums')}>
                    <Text style={this.getTextColor('Gymnasiums'),{fontFamily: "System"}}>
                      Gymnasiums
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingRight:5,paddingBottom:10}} onPress={() => {this.editFilter('Gun Safety & Marksmanship Instruction')}}>
                  <Badge containerStyle={this.getColor('Gun Safety & Marksmanship Instruction')}>
                    <Text style={this.getTextColor('Gun Safety & Marksmanship Instruction'),{fontFamily: "System"}}>
                      Gun Safety & Marksmanship Instruction
                    </Text>
                  </Badge>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </Modal>

        <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />

        {
          Platform.OS==='ios'
          ?
          <View style={styles.schoolNav}>
            <View style={styles.navTextHolder,{flex: 1,marginRight: 10, padding: 10, borderRadius: 10, backgroundColor: "rgba(72, 75, 137, 0.12)"}}>
              <Text style = {styles.navText,{color: "#000000"}}
                // underlineColorAndroid = "transparent"
                // placeholder = "Enter your zip code here"
                // placeholderTextColor = "#8e8e93"
                // returnKeyType = 'search'
                // autoCapitalize = "none"
                // onChangeText={(text) => {
                //   this.updateMyZip(text)
                // }}
                // value={this.state.zipText}
              >
                Specify your parameters
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


            <TouchableHighlight underlayColor={'transparent'} onPress={() =>replace('MapScreen')}>
              <Text style={{paddingLeft: 10,marginTop: 8,fontSize: 17,
                fontWeight: "normal",
              fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>Map</Text>
            </TouchableHighlight>
          </View>
          :
          <View style={styles.schoolNav}>
            <View style = {styles.navTextHolder}>
              <Text style = {styles.navText}
                // underlineColorAndroid = "transparent"
                // placeholder = "Enter your zip code here"
                // placeholderTextColor = "#abacc8"
                // returnKeyType = 'search'
                // autoCapitalize = "none"
                // onChangeText={(text) => {
                //   this.updateMyZip(text)
                // }}
                // value={this.state.zipText}
              >
                Specify your parameters
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
                  name="map"
                  size={28}
                  style={{color:'white'}}
                  onPress={() =>replace('MapScreen')}
                />
              </TouchableHighlight>
            </View>
          </View>
        }

        <ScrollView style={styles.scrollview}>

          <Text style={styles.textHeader}>My business</Text>

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
          />

          <Text style={styles.textHeader}>Nearby business</Text>

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

        </ScrollView>

        <TouchableHighlight style={styles.fab} activeOpacity={0.5} underlayColor={'transparent'} onPress={() =>navigate('BusinessSearch', {fromHome: false})}>
          <MaterialIcons
            name="search"
            size={Platform.OS === "ios" ? 30 : 22}
            color={Platform.OS === "ios" ? "#9513fe":"#fff"}
            style={{ alignSelf: "center" }}
          />
        </TouchableHighlight>

      </View>
                );
              }
              }

              const styles = StyleSheet.create({
                textHeader:{
                  fontFamily: "System",
                  color: '#484B89',
                  marginTop: 10,
                  marginBottom: 10,
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

                checkboxcontainer:{
                  borderWidth:0,
                  marginTop:-8,
                  backgroundColor:'transparent'
                },
                switch:{

                },
                games:{
                  fontFamily: "System",
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
                  fontFamily: "System",
                  color: '#484b89',
                  fontSize: 15,
                  fontWeight: 'bold',
                  padding: 10
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
  cardDataHead: {
    fontFamily: "System",
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  cardDataSubText: {
    fontFamily: "System",
    color: '#757575',
    fontSize: 13
  },
  cardDistance:{
    flex: 1,
    color: '#9c9ebf',
    justifyContent: 'flex-end',
    bottom: 0
  },
  cardInfo: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  cardImage:{
    flex: 1,
    marginRight: 20,
    // height: 75,
    // width: 75
    // padding: 10
  },
  cardData: {
    flex: 3,
    flexDirection: 'column'
  },
  cardStyle: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderTopWidth: 0,
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
    backgroundColor: (Platform.OS === 'ios') ? "#efeff9" : '#484b89',
    zIndex: 4,
    elevation:5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 1.0,
  },
  schoolNav: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //maxHeight: 50,
    backgroundColor: Platform.OS==='ios'?"rgba(238, 238, 251, 0.7)":'#484b89b8',
    paddingHorizontal:10,
    paddingVertical:15,
    zIndex: 4,
    elevation: 5,
  },
  navTextHolder:{
    height: 45,
    flex: 2,
    backgroundColor: '#9395b8',
    borderRadius: 5,
    paddingHorizontal:10,
    marginLeft:10,
    flexDirection:'row'
  },
  // navText: {
  //   color: '#c1c1d6',
  //   fontSize: 14,
  //   padding: 5,
  //   height: 40,
  //   flex: 2,
  // },
  navTextHolder:{
    height: 45,
    flex: 2,
    backgroundColor: '#9395b8',
    borderRadius: 5,
    paddingHorizontal:10,
    marginLeft:10,
    flexDirection:'row'
  },
  navText: {
    fontFamily: 'System',
    width: 200,
    color: '#c1c1d6',
    fontSize: 18,
    // paddingTop: (Platform.OS === 'ios') ? 10 : 4,
    // paddingBottom: (Platform.OS === 'ios') ? 5 : 0,
    paddingVertical:10
  },
  navButtonHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  navIcon: {
    marginLeft: 15,
    marginTop: 10,
    marginRight: 5
  },
});
