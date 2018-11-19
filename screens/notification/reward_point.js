import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
  FlatList,
  StatusBar,
  AsyncStorage,
  ScrollView,
  Platform

} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
const api =  require('../../api/index');


class RewardsPointElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
    }
  }
  render() {
    return (



                    <View style={styles.body}>

                    <View style={{justifyContent:'center',flex:0.05}}><Text>1</Text></View>
                    <View style={{justifyContent:'center'}}>
                      <Image
                        source={require('../../images/Avatar.png')}
                      />
                    </View>
                    <View style={{flex: 0.97, justifyContent: 'flex-end', marginLeft: 15, paddingTop: 10}} >
                      <View style={{paddingRight: 15}} >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                          <View style={{flex:0.77}}><Text style={{fontSize: 16, fontWeight: '400', color: '#212121', paddingBottom: 2}} >Ashwin</Text>
                          <Text style={{fontSize: 15, color: '#747474'}} >Parent</Text>
                        </View>
                        <View style={{flex:0.2,flexDirection:'row'}}>
                          <View>
                            <ImageBackground
                              style={styles.imageContainer}
                              source={require('../../images/comp_shape.png')}>
                              <Text style={styles.numberstyle}>345</Text>
                            </ImageBackground>

                          </View>

                          <View>
                            <CheckBox
                              iconType='material'
                              checkedIcon='star'
                              uncheckedIcon='star-border'
                              checked={this.state.checked1}
                              checkedColor='#9513fe'
                              containerStyle={styles.checkboxcontainer}
                              onPress={() => this.setState({ checked1: !this.state.checked1})}
                            />
                          </View>
                        </View>
                        </View>


                      </View>
                      <View style={styles.hr}/>
                    </View>

                    </View>

    )
  }
}

export default class RewardsPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
    }
  }

  static navigationOptions = {
    title: '',
    header: null
  };

  render(){
    const { navigate, goBack } = this.props.navigation;
    const { region } = this.props;
    console.log(region);

    return(
      <View style={styles.container}>
          <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" />
        <View style={styles.businessNav}>
          <View style={styles.navButtonback}>
            <TouchableHighlight style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="arrow-back"
                size={25}
                style={{color:'#fff'}}
                onPress={() =>goBack()}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.textinputView}>
            <Text style={{fontSize:19,color:'#fff',fontWeight:'bold'}}>
              Reward points
            </Text>
            <Text style={{fontSize:12,color:'#abacc8'}}>Sugar Land, Texas</Text>
          </View>
          <View style={{flex:3,justifyContent:'center'}}>
            <Text style={{color:'#fff',fontSize:14}}>THIS WEEK</Text>
          </View>
          <View style={styles.navButtonHolder}>
            <TouchableHighlight  style={styles.navIcon} underlayColor={'transparent'} >
              <MaterialIcons
                name="insert-chart"
                size={26}
                style={{color:'#fff'}}
              />
            </TouchableHighlight>

          </View>
        </View>
        <RewardsPointElement/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flex:1
  },
  textinputView:{
    flex:5,
    justifyContent:'center'
  },
  navText: {
    color: '#c1c1d6',
    fontSize: 14,
    paddingTop:10,
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
    paddingLeft: 15,
    flex:2
  },
  businessNav: {
    flex: 1,
    flexDirection: 'row',
    // paddingLeft:15,
    paddingRight:15,
    maxHeight: 55,
    backgroundColor: '#484b89',
    zIndex: 4,
  },
  addnewschool:{
    paddingTop:30,
    paddingBottom:50,
    marginLeft:20

  },
  input:{
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
  flexDirection:'row',
  paddingLeft:5,
  marginTop:7

  },
  myschooltitleview:{
    paddingLeft: 15,

  },
  myschooltitle:{
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
    fontSize: 14,
    fontWeight: '400',
    color: '#212121',
    paddingBottom: 2
  },
  containersubText:{
    fontSize: 12,
    color: '#7b7b7b'
  },
  containerDistanceView:{
    flex:2,
    justifyContent:'center',
    alignItems: 'center',

  },
  containerDistanceText:{
    fontSize: 12
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
  imageContainer:{
    width: 30,
    height: 30,
    justifyContent:'content',
    borderRadius:50
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    borderRadius:50
  },
  numberstyle:{
    color:'#9513fe',
    position: 'absolute',
    top: 8,
    left: 6,
    fontSize:10
  },
  hr: {
    borderBottomColor: "#d4d4da",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  checkboxcontainer:{
    margin: 0,
    padding: 0,
    width: 25,
    height: 25,
    borderWidth:0,
    backgroundColor:'transparent'
  }
});
