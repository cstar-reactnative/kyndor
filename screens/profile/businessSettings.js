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
  Platform

} from 'react-native';


export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Business types',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#484b89',
      elevation: 5,


    },
  };
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false
    }
  };

  render(){

    const { navigate } = this.props.navigation;
    return(
      <ScrollView style={styles.container}>

      <View style={styles.headersection}>
      <Text style={styles.headersectiontext}>You can disable offerings from certain types of local business</Text>
      </View>
      <View style={styles.section}>
      <View style={styles.firstrow}>
      <Image source={require('../../images/dummy.png')}/>
      <Text style={styles.games}>Golf</Text>
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
                   <Text style={styles.games}>Tennis</Text>
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
                         <Text style={styles.games}>Cycling</Text>
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
                               <Text style={styles.games}>Walking</Text>
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
                                     <Text style={styles.games}>Equestrian</Text>
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
    backgroundColor:'#ffffff',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  section:{
    paddingLeft:20,
    paddingRight:15,
    paddingTop:20,
    marginBottom:7

  },
  headersection:{
    paddingTop:20,
    paddingLeft:20,
    paddingRight:10
  },
  headersectiontext:{
    fontFamily: "System",
    fontSize:13
  },

  firstrow: {

    flexDirection:'row',

    paddingTop:5
  },
  iconstyle:{
    color:'#9c9ebf'
  },
  switch:{
  flex:2,
  paddingLeft:12
  },
  games:{
    fontSize:15,
    color:'#a5a5a5',
    flex:7,
    paddingLeft:10,
    fontFamily: "System",

  },
  checkboxcontainer:{
    borderWidth:0,
    marginTop:-8,
    backgroundColor:'transparent'
  }

});
