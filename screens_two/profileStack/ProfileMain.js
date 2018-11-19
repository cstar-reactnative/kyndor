import React from "react";
import { StyleSheet, ScrollView, Text, AsyncStorage, View } from "react-native";
import { HeaderNav } from "./Components/Header";
import { FooterNav } from "./Components/FooterNav";
import Colors from '@theme/colorsThree';
import { Profile } from "./Components/Profile";

import AppConfig from '../../config.js';
const imgcdn = AppConfig.imgLoc

export default class ProfileMain extends React.Component {

  static navigationOptions = {
    title: 'My Profile',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      userData:{
        name: "Amy Farha",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        type: "Parent"
      }
    };
  }

  componentDidMount(){
    let thisComp = this
    AsyncStorage.getItem('@KyndorStore:myData', (err, userData) => {
      if(err){
        console.log(err)
      }
      else{
        let userInfo = JSON.parse(userData)
        thisComp.setState({
          userData:{
            name: userInfo.name,
            avatar_url: imgcdn+userInfo.profile_pic,
            type: (userInfo.user_type == "user") ? "Parent" : userInfo.user_type
          }
        })
      }
    });
  }

  render() {
    const {navigate, goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderNav nav={navigate}/>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.userList}>
            <Profile nav={navigate} user={this.state.userData} />
          </View>
        </View>
        {/* <View style={styles.footer}>
          <FooterNav />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f7"
  },
  mainContainer: {
    margin: 18
  },
  header: {
    position: "absolute",
    zIndex: 0,
    right: 0,
    left: 0,
    top: 0
  },
  userList: {
    zIndex: 10,
    top: 110
  },
  // footer: {
  //   backgroundColor: "#fff",
  //   height: 60,
  //   zIndex: 0,
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0
  // }
});
