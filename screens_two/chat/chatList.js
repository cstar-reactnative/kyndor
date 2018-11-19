import React from "react";
import { StyleSheet, ScrollView, View, StatusBar, AsyncStorage, ActivityIndicator, ImageBackground, Text, TouchableOpacity } from "react-native";
import { List } from "react-native-elements";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import { SafeAreaView } from 'react-navigation';

import { HeaderNav } from "./Components/Header";
import { List_Item } from "./Components/ListItem";

import { w, h } from "../common/helpers";
import colors from '@theme/colorsThree';

import Stores from '../../stores/';
const api =  require('../../api/index');

const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mySchools:[],
      loading: false,
    };
  }

  componentWillMount() {

  }

  getMyChatRooms(){
    let thisComp = this
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
      }
      else{
        thisComp.setState({loading: true})
        api.getMyChatGroups({token:tokenItem}, (e, r) => {
          thisComp.setState({loading: false})
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
          }
          else{
            if(r.success == true){
              let chatRoomArray = r.result.r
              thisComp.setState({mySchools:chatRoomArray})
            }
            else {
              console.log('Something went wrong. Please try again.');
            }
          }
        })
      }
    });
  }

  componentDidMount() {
    this.setState({loading: true});
    this.getMyChatRooms()
  }

  componentWillUnMount(){

  }

  rendersmall(){
    const rootNav = this.props.navigation;
    if(!this.state.loading){
      if(this.state.mySchools && this.state.mySchools.length>0){
        return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
          {this.state.mySchools.map((l, index) => (
            <List
              key={index}
              containerStyle={{
                marginTop: 0,
                marginBottom: 0,
                borderWidth: 0,
                backgroundColor:'transparent',
                borderTopWidth:0,
                borderColor:'transparent',
              }}
            >
              <List_Item list={l} screenProps={this.props.navigation} />
            </List>
          ))}
        </ScrollView>
      );
      }else{
        return(
            <View style={{
              flex: 1,
              justifyContent: 'center',
              //backgroundColor: colors.white,
              //borderRadius: 5,
              width: "90%",
              //height: h(257),
              marginHorizontal: 20,
              //marginTop: 30,
              shadowColor: "rgba(0, 0, 0, 0.13)",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowRadius: 4,
              shadowOpacity: 1,
              elevation: 3
            }}>

              <ImageBackground
                source={ require("../../images/popupimage2.png") }
                style={{
                  //flex: 1,
                  //width: null,
                  height: h(145),
                  //borderTopLeftRadius: 5,
                  //borderTopRightRadius: 5,
                }}
                //imageStyle={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                resizeMode="cover"
                resizeMethod="resize"
              >
              </ImageBackground>

              <View style={{
                //flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center',
                paddingTop: h(15),
                paddingBottom: h(10)
              }}>
                <Text numberOfLines={2} style={{
                  color: "rgb(38, 38, 40)",
                  fontFamily: 'System',
                  fontWeight: "500",
                  fontSize: w(18)
                }}
                >
                  Add your Business to get latest notifications & announcements.
                </Text>
              </View>

              <View style={{alignItems: "center",
                paddingVertical: h(10),
              }}>

                <TouchableOpacity
                  onPress={() => rootNav.navigate('FindSchool')}
                  style={{
                    backgroundColor: colors.indigoBlue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: w(35),
                    width: w(250),
                    height: h(50)
                  }}>
                  <Text
                    style={{
                      fontFamily: "System",
                      fontSize: 15,
                      fontWeight: "600",
                      letterSpacing: 0.32,color:colors.white,paddingVertical: h(20)
                    }}>
                    Add Business
                  </Text>
                </TouchableOpacity>

              </View>
            </View>

        );
      }
    }
    else{
      return(
        <Text></Text>
      );
    }
  }

  render() {

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={newStyles.container}>
            <Toolbar
              style={newStyles.toolBar}
              // leftElement="arrow-back"
              onLeftElementPress={() => this.props.navigation.goBack()}
              centerElement="Chat"
            />
            {this.state.loading &&
              <View style={{position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
              justifyContent: 'center'}}>
                <ActivityIndicator
                  color={colors.indigoBlue}
                  animating={this.state.loading}
                  size="large"
                  //style={{justifyContent: 'center', flex: 1}}
                />
              </View>}

              <View style={{padding:10}}>
                <TouchableOpacity style={styles.nayaStyle} onPress={ () => {
                  this.props.navigation.navigate('ChatScreen',{groupId:9633, channelId:442189, isGroup:true, channelName:'test channel', groupName:'group_name'})}}>
                  <Text>
                    Room 101
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nayaStyle} onPress={ () => {
                  this.props.navigation.navigate('ChatScreen',{groupId:1015, channelId:442462, isGroup:true, channelName:'no channel name', groupName:'group_name'})}}>
                  <Text>
                    Room 102
                  </Text>
                </TouchableOpacity>
              </View>

          </View>
        </ThemeProvider>
      </SafeAreaView>
    )

    // return (
    //   <View style={styles.container}>
    //     <HeaderNav />
    //
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  nayaStyle:{
    padding:10,
    borderWidth:2,
    borderColor:'grey',
    borderRadius:5,
    marginBottom: 15
  },
  container: {
    flex: 1,
    backgroundColor: colors.paleGrey,
    justifyContent: 'center',
  },
  listContainer: {
    marginHorizontal: 20,
    //marginVertical: 20
  },
  // footer: {
  //   backgroundColor: "#fff",
  //   height: 70
  // },
});

const newStyles = {
  container: {
    backgroundColor: colors.paleGrey,
    flex: 1
  },

  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: { alignItems: "center", marginRight: w(40) },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  }
};
