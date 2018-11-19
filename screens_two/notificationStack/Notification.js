import React from 'react';
import { StyleSheet, ScrollView, AsyncStorage, Text, View } from 'react-native';
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
import { HeaderNav } from "./Components/Header";
import { Notifications } from "./Components/Notifications";

import colors from '@theme/colorsThree';
import Stores from '../../stores/';
const api =  require('../../api/index');

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      data: null,
      groupNotification: [],
      channelNotification:[],
      TotalNotification:[],

      groupUpdates: [],
      channelUpdates:[],
      totalUpdates:[]
    }
  }

  getChannelUpdates(item){
    api.listChannelUpdates({token: item}, (e, r) => {
      if(e){
        console.log("Error: "+e);
      }
      else{
        if(r.success == true){
          if(r.result.length != this.state.channelUpdates.length){
            this.setState({channelUpdates: r.result})
          }

          let allUpdatesArray = (this.state.channelUpdates).concat(this.state.groupUpdates);
          // allUpdatesArray.sort(function(a, b){return b.updated_on - a.updated_on});

          if(allUpdatesArray.length != this.state.totalUpdates.length){
            this.setState({totalUpdates: allUpdatesArray})
          }

          loaderHandler.hideLoader();
        }
        else {
          loaderHandler.hideLoader();
        }
      }
    })
  }

  getGroupUpdates(){
    loaderHandler.showLoader("Loading...");
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        api.listGroupUpdates({token: item}, (e, r) => {
          if(e){
            console.log("Error01: "+e);
            this.getChannelUpdates(item)
          }
          else{
            if(r.success == true){
              if(r.result.length != this.state.groupUpdates.length){
                this.setState({groupUpdates: r.result})
              }
              this.getChannelUpdates(item)
            }
            else {
              // alert('Failed!');
              this.getChannelUpdates(item)
            }
          }
        })
      }
    });
  }

  getChannelNotifications(item){
    api.listChannelRequest({token: item}, (e, r) => {
      if(e){
        console.log("Error: "+e);
      }
      else{
        if(r.success == true){
          if(r.result.length != this.state.channelNotification.length){
            this.setState({channelNotification: r.result})
          }
          console.log('ChannelNotification')
          console.log(this.state.channelNotification)

          let allNotificationArray = (this.state.channelNotification).concat(this.state.groupNotification);

          if(allNotificationArray.length != this.state.TotalNotification.length){
            this.setState({TotalNotification: allNotificationArray})
          }

          loaderHandler.hideLoader();
        }
        else {
          loaderHandler.hideLoader();
        }
      }
    })
  }

  getGroupNotifications(){
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        api.listGroupRequest({token: item}, (e, r) => {
          if(e){
            console.log("Error: "+e);
            this.getChannelNotifications(item)
          }
          else{
            if(r.success == true){
              if(r.result.length != this.state.groupNotification.length){
                this.setState({groupNotification: r.result})
                console.log('groupNotification')
                console.log(this.state.groupNotification)
              }
              this.getChannelNotifications(item)
            }
            else {
              // alert('Failed!');
              this.getChannelNotifications(item)
            }
          }
        })
      }
    });
  }

  componentDidMount(){
    console.log('notification mounted.')
    this.getGroupUpdates()
    this.getGroupNotifications()
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderNav />
        <ScrollView style={styles.mainContainer}>
          <Notifications groupNotification={this.state.groupNotification} groupUpdates={this.state.groupUpdates} channelNotification={this.state.channelNotification} channelUpdates={this.state.channelUpdates} />
        </ScrollView>
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
    margin: 25,
  },
  footer: {
    backgroundColor: "#fff",
    height: 60
  }
});
