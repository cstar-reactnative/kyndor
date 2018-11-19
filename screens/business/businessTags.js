import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ToolbarAndroid,
  Image,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
export default class businessTags extends React.Component {

  constructor(props){
    super(props);
    this.state={
      checked1: false,
      checked2: false,
      checked3: false,

    }
  }
  render(){
    // const { navigate } = this.props.navigation;
    return(
      <ScrollView style={{backgroundColor: '#f4f4f7'}} >

        <View style={{backgroundColor: "#fff", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingRight: 15, paddingLeft: 15 }} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1}} >
            <Text style={{fontFamily: "System",color: '#212121', fontSize: 16, fontWeight: '400'}} >#professional_network</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}} >
            <Text style={{fontFamily: "System",paddingRight: 15}} >346</Text>
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
        <View style={styles.hr}/>

        <View style={{backgroundColor: "#fff", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingRight: 15, paddingLeft: 15 }} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1}} >
            <Text style={{fontFamily: "System",color: '#212121', fontSize: 16, fontWeight: '400'}} >#illness</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}} >
            <Text style={{fontFamily: "System",paddingRight: 15}} >334</Text>
            <CheckBox
              iconType='material'
              checkedIcon='star'
              uncheckedIcon='star-border'
              checked={this.state.checked2}
              checkedColor='#9513fe'
              containerStyle={styles.checkboxcontainer}
              onPress={() => this.setState({ checked2: !this.state.checked2})}
            />
          </View>
        </View>
        <View style={styles.hr}/>

        <View style={{backgroundColor: "#fff", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingRight: 15, paddingLeft: 15 }} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1}} >
            <Text style={{fontFamily: "System",color: '#212121', fontSize: 16, fontWeight: '400'}} >#healthcare</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}} >
            <Text style={{fontFamily: "System",paddingRight: 15}} >124</Text>
            <CheckBox
              iconType='material'
              checkedIcon='star'
              uncheckedIcon='star-border'
              checked={this.state.checked3}
              checkedColor='#9513fe'
              containerStyle={styles.checkboxcontainer}
              onPress={() => this.setState({ checked3: !this.state.checked3})}
            />
          </View>
        </View>
        <View style={styles.hr}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    hr: {
        borderBottomColor: "#d4d4da",
        borderBottomWidth: 1.5,
        marginLeft: 15
    },
    checkboxcontainer:{
      margin: 0,
      marginTop: 12,
      padding: 0,
      width: 23,
      height: 35,
      borderWidth:0,
      backgroundColor:'transparent'
    }
});
