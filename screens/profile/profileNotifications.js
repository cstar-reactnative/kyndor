import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabNavigator, createStackNavigator } from "react-navigation";
import ToggleSwitch from 'toggle-switch-react-native';
import { CheckBox } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  Switch
} from 'react-native';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {falseSwitchIsOn: false,
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false

  };
  }
  static navigationOptions = {
    title: 'Notifications',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#484b89',
      elevation: 5,


    },
  };

  render(){

    const { navigate } = this.props.navigation;
    return(
      <ScrollView style={styles.container}>

        <View style={styles.sectionheader}>
          <View style={styles.allnotificationrow}>

            <View style={styles.textViewcss}>
              <Text style={styles.textemailcss}>All Notifications</Text>
            </View>
            <View style={styles.switch}>
              <Switch
                onValueChange={value=>
                  this.setState({falseSwitchIsOn: value})
                }
                onTintColor='#c989fe'
                style={{marginBottom: 10, transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                thumbTintColor= '#9513fe'
                value={this.state.falseSwitchIsOn}
              />
            </View>
          </View>

          <View style={styles.notificationsoundrow}>
            <View style={styles.textViewcss}>
              <Text style={styles.subtextViewcss} >Notification Sound{"\n"}
                <Text style={{fontFamily: "System",fontSize:12, color:'#949494'}}>Sound wave</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={{paddingTop:10, paddingBottom:10}}>
            <Text style={{fontFamily: "System",fontSize:15, color:'#484b89'}}>Notify me about</Text>
    </View>
    <View style={styles.firstrow}>
    <Image source={require('../../images/dummy.png')}/>
    <Text style={styles.games}>Everything</Text>
      <View style={styles.switch}>
        <CheckBox
      iconType='material'
      checkedIcon='check-box'
      uncheckedIcon='check-box-outline-blank'
      checked={this.state.checked1}
      checkedColor='#9513fe'
      containerStyle={styles.checkboxcontainer}
      onPress={() => this.setState({ checked1: !this.state.checked1 })}
  />
  </View>
  </View>
  <View style={styles.firstrow}>
  <Image source={require('../../images/dummy.png')}/>
                 <Text style={styles.games}>Messages in my Chat Groups</Text>
    <View style={styles.switch}>
      <CheckBox
    iconType='material'
    checkedIcon='check-box'
    uncheckedIcon='check-box-outline-blank'
    checked={this.state.checked2}
    checkedColor='#9513fe'
    containerStyle={styles.checkboxcontainer}

    onPress={() => this.setState({ checked2: !this.state.checked2 })}
    />
      </View>
      </View>
      <View style={styles.firstrow}>
        <Image source={require('../../images/dummy.png')}/>
                       <Text style={styles.games}>Likes</Text>
          <View style={styles.switch}>
            <CheckBox
          iconType='material'
          checkedIcon='check-box'
          uncheckedIcon='check-box-outline-blank'
          checked={this.state.checked3}
          checkedColor='#9513fe'
          containerStyle={styles.checkboxcontainer}
          onPress={() => this.setState({ checked3: !this.state.checked3 })}
          />
            </View>
            </View>
            <View style={styles.firstrow}>
              <Image source={require('../../images/dummy.png')}/>
                             <Text style={styles.games}>Mentions of me</Text>
                <View style={styles.switch}>
                  <CheckBox
                iconType='material'
                checkedIcon='check-box'
                uncheckedIcon='check-box-outline-blank'
                checked={this.state.checked4}
                checkedColor='#9513fe'
                containerStyle={styles.checkboxcontainer}

                onPress={() => this.setState({ checked4: !this.state.checked4})}
                />
                  </View>
                  </View>
                  <View style={styles.firstrow}>
                    <Image source={require('../../images/dummy.png')}/>
                                   <Text style={styles.games}>New tags</Text>
                      <View style={styles.switch}>
                        <CheckBox
                      iconType='material'
                      checkedIcon='check-box'
                      uncheckedIcon='check-box-outline-blank'
                      checked={this.state.checked5}
                      checkedColor='#9513fe'
                      containerStyle={styles.checkboxcontainer}

                      onPress={() => this.setState({ checked5: !this.state.checked5})}
                      />
                        </View>
                        </View>
                        <View style={styles.firstrow}>
                          <Image source={require('../../images/dummy.png')}/>
                                         <Text style={styles.games}>Pool</Text>
                            <View style={styles.switch}>
                              <CheckBox
                            iconType='material'
                            checkedIcon='check-box'
                            uncheckedIcon='check-box-outline-blank'
                            checked={this.state.checked6}
                            checkedColor='#9513fe'
                            containerStyle={styles.checkboxcontainer}

                            onPress={() => this.setState({ checked6: !this.state.checked6})}
                            />
                              </View>
                              </View>


                              </View>


                                                </ScrollView>
                                              );
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: 'flex-start',
    backgroundColor:'white',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
   sectionheader:{
     borderBottomColor:'#efefef',
     borderBottomWidth:1,
     paddingBottom:15,
     paddingTop:15,
   },
  section:{
    paddingLeft:20,
    paddingRight:15,
    paddingTop:13,
    paddingBottom:20,
    borderBottomColor:'#efefef',
    borderBottomWidth:1
  },

  textemailcss:{
    fontFamily: "System",
    fontSize:15,
    color:'#2e2e2e',
    paddingLeft: 5,
  },
 allnotificationrow:{
   alignContent: 'flex-start',
   flexDirection:'row',
   paddingRight:16,
   paddingLeft:16,

 },
 notificationsoundrow:{
   alignContent: 'flex-start',
   flexDirection:'row',
   paddingTop:15,
   paddingLeft:20,
 },
  firstrow: {
    alignContent: 'flex-start',
    flexDirection:'row',
    paddingTop:15
  },
  lastsection:{
    flexDirection:'row',
    height:100,

  },
  subtextViewcss:{
    fontFamily: "System",
    fontSize:15,
    color:'#2e2e2e'
  },

  textViewcss:{
    flex:8
  },
  iconstyle:{
    color:'#9c9ebf'
  },
  switch:{
    flex:2
  },
  checkboxcontainer:{
    borderWidth:0,
    marginTop:-8,
    backgroundColor:'transparent'
  },
  switch:{
  flex:2,
  paddingLeft:12
  },
  games:{
    fontFamily: "System",
    fontSize:15,
    color:'#a5a5a5',
    flex:7,
    paddingLeft:10,


  },

});
