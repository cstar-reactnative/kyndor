import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
  WebView,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Stores from '../stores/';
import Colors from '@theme/Colors';
import IsIphoneX from '@theme/IsIphoneX';

export default class Terms extends React.Component {

  static navigationOptions = {
    // title: 'Terms of Service',
    // headerStyle: {
    //     backgroundColor: '#484b89',
    //     height: 50
    // },
    // headerTitleStyle: {
    //     fontSize: 18
    // }
    title: '',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loadLink: ''
    };
  }

  componentWillMount() {
    let webLink = Stores.webPageData.getData()
    this.setState({
      loadLink: webLink
    })
  }

  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color='#009688'
        size='large'
        style={{position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
        justifyContent: 'center'}}
      />
    );
  }

  render(){
    //const { navigate } = this.props.navigation;
    return(
      // <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: (Platform.OS==='ios')?'#efeff9':'#fff', paddingTop: IsIphoneX() ? 15 : 0, paddingBottom: IsIphoneX() ? 35 : 0 }}>
          <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} />
          <View style={styles.subContainer} >
            <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => Stores.rootNavStore.setData('Login')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons
                  name={Platform.OS==="ios"?"chevron-left":"arrow-back"}
                  size={Platform.OS==="ios"?40:25}
                  color={Platform.OS==='ios'?"#9513fe":"#fff"}
                />
                {(Platform.OS==="ios")?<Text style={{fontFamily: "System",color: "#9513fe", textAlign: 'left', marginLeft: -10}}>Back</Text>:<Text></Text>}
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'center'}} >
              <Text style={{fontFamily: "System",color: '#fff'}}></Text>
            </View>
          </View>
          <WebView
            style={{justifyContent: 'center', alignItems: 'center', flex:1,}}
            source={{uri: this.state.loadLink}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            renderLoading={this.ActivityIndicatorLoadingView}
            startInLoadingState={true}  />
          </View>
        // </SafeAreaView>
      );
    }
  }
  const styles = StyleSheet.create({
    subContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...Platform.select({
        ios:{
          backgroundColor:"#efeff9",
          paddingTop: 25,
          paddingLeft: 0,
          paddingBottom: 0,
        },
        android:{
          backgroundColor:'#393c63',
          paddingTop:10,
          paddingLeft:15,
          paddingBottom:10,
        }
      })
    }
  });
