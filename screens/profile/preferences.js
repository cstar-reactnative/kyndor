import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  Platform,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import Stores from '../../stores/'

export default class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPref: Stores.preferenceStore.getData(),
      // allPref: [],
    };
  }
  static navigationOptions = {
    title: 'My Preferences',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#484b89',
      height: 50
    }
  };

  editPref(prefName){
    if(this.state.allPref.length > 0){
      if(this.state.allPref.indexOf(prefName) == -1) {
        let data = this.state.allPref
        data.push(prefName)
        this.setState({allPref: data})
        // alert(this.state.allPref)
      }
      else{
        let data = this.state.allPref
        let pos = data.indexOf(prefName)
        data.splice(pos, 1)
        this.setState({allPref: data})
        // alert(this.state.allPref)
      }
    }
    else{
      let data = this.state.allPref
      data.push(prefName)
      this.setState({allPref: data})
      // alert(this.state.allPref)
    }
    Stores.preferenceStore.setData(this.state.allPref)

    let prefArray = this.state.allPref
    let max3 = (prefArray.length > 3) ? 3 : prefArray.length
    let returnVal = ''
    if(max3 == 0){
      returnVal = 'none'
    }
    else {
      for (i = 0; i < max3; i++) {
        returnVal = returnVal + prefArray[i] + ', '
      }
    }
    this.props.navigation.state.params.MyProfile.setState({'myPrefs': returnVal})
    this.props.navigation.state.params.MyProfile.setState({'allPref': prefArray})
  }

  getColor(prefName){
    if(this.state.allPref.length > 0){
      if(this.state.allPref.indexOf(prefName) == -1) {
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

  getTextColor(prefName){
    if(this.state.allPref.length > 0){
      if(this.state.allPref.indexOf(prefName) == -1) {
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

  render(){
    return(
      <ScrollView
        contentContainerStyle={styles.ScrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#33345f" translucent={false} barStyle="light-content" />
        <Text style={{fontFamily: "System",paddingBottom: 25, color: '#757575'}} >You can disable offerings from certain types of local business</Text>
        <View>
          <Text style={{fontFamily: "System",paddingBottom: 10, fontSize: 16, color: '#474b88', fontWeight: 'bold'}} >Schools</Text>
          <View style={{fontFamily: "System",flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5}} >

            <TouchableOpacity onPress={() => {this.editPref('Traditional public school')}}>
              <Badge containerStyle={this.getColor('Traditional public school')}>
                <Text style={this.getTextColor('Traditional public school'),{fontFamily: "System",}}>
                  Traditional public school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Charter school')}}>
              <Badge containerStyle={this.getColor('Charter school')}>
                <Text style={this.getTextColor('Charter school'),{fontFamily: "System",}}>
                  Charter school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Magnet school')}}>
              <Badge containerStyle={this.getColor('Magnet school')}>
                <Text style={this.getTextColor('Magnet school'),{fontFamily: "System",}}>
                  Magnet school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Virtual or Online school')}}>
              <Badge containerStyle={this.getColor('Virtual or Online school')}>
                <Text style={this.getTextColor('Virtual or Online school'),{fontFamily: "System",}}>
                  Virtual or Online school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Traditional private school')}}>
              <Badge containerStyle={this.getColor('Traditional private school')}>
                <Text style={this.getTextColor('Traditional private school'),{fontFamily: "System",}}>
                  Traditional private school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Boarding school')}}>
              <Badge containerStyle={this.getColor('Boarding school')}>
                <Text style={this.getTextColor('Boarding school'),{fontFamily: "System",}}>
                  Boarding school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Language immersion school')}}>
              <Badge containerStyle={this.getColor('Language immersion school')}>
                <Text style={this.getTextColor('Language immersion school'),{fontFamily: "System",}}>
                  Language immersion school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Montessori school')}}>
              <Badge containerStyle={this.getColor('Montessori school')}>
                <Text style={this.getTextColor('Montessori school'),{fontFamily: "System",}}>
                  Montessori school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Private special education school')}}>
              <Badge containerStyle={this.getColor('Private special education school')}>
                <Text style={this.getTextColor('Private special education school'),{fontFamily: "System",}}>
                  Private special education school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Parochial school')}}>
              <Badge containerStyle={this.getColor('Parochial school')}>
                <Text style={this.getTextColor('Parochial school'),{fontFamily: "System",}}>
                  Parochial school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Religious school')}}>
              <Badge containerStyle={this.getColor('Religious school')}>
                <Text style={this.getTextColor('Religious school'),{fontFamily: "System",}}>
                  Religious school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Reggio Emillia school')}}>
              <Badge containerStyle={this.getColor('Reggio Emillia school')}>
                <Text style={this.getTextColor('Reggio Emillia school'),{fontFamily: "System",}}>
                  Reggio Emillia school
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Waldorf school')}}>
              <Badge containerStyle={this.getColor('Waldorf school')}>
                <Text style={this.getTextColor('Waldorf school'),{fontFamily: "System",}}>
                  Waldorf school
                </Text>
              </Badge>
            </TouchableOpacity>

          </View>
        </View>
        <View>
          <Text style={{fontFamily: "System",paddingTop: 25, paddingBottom:5, fontSize: 16, color: '#474b88', fontWeight: 'bold'}} >Sports</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5}} >

            <TouchableOpacity onPress={() => {this.editPref('Youth Baseball')}}>
              <Badge containerStyle={this.getColor('Youth Baseball')}>
                <Text style={this.getTextColor('Youth Baseball'),{fontFamily: "System",}}>
                  Youth Baseball
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Youth Basketball')}}>
              <Badge containerStyle={this.getColor('Youth Basketball')}>
                <Text style={this.getTextColor('Youth Basketball'),{fontFamily: "System",}}>
                  Youth Basketball
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Youth NFL Flag Football')}}>
              <Badge containerStyle={this.getColor('Youth NFL Flag Football')}>
                <Text style={this.getTextColor('Youth NFL Flag Football'),{fontFamily: "System",}}>
                  Youth NFL Flag Football
                </Text>
              </Badge>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.editPref('Youth Soccer')}}>
              <Badge containerStyle={this.getColor('Youth Soccer')}>
                <Text style={this.getTextColor('Youth Soccer'),{fontFamily: "System",}}>
                  Youth Soccer
                </Text>
              </Badge>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ScrollviewContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  selectedPref: {
    backgroundColor: '#951dfe', marginRight: 10, marginTop: 8
  },
  notSelectedPref: {
    backgroundColor: '#ebebeb', marginRight: 10, marginTop: 8
  }
});
