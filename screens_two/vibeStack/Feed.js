import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, AsyncStorage, StatusBar, Platform, ImageBackground, Text } from "react-native";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from 'react-navigation';
import colors from '@theme/colorsThree';
import { w, h } from "../common/helpers";
import images from "../../images/index";

import { Featured, Horizontal } from "../common/vibeComponent/cards";
import HorizontalFlatlist from "../common/vibeComponent/HorizontalFlatlist";
import Colors2 from '@theme/ColorsTwo';

import AppInit from '../common/appInit.js'

import Stores from '../../stores/';
const api =  require('../../api/index');
var DeviceInfo = require('react-native-device-info');
import FCM from 'react-native-fcm';
import { registerKilledListener, registerAppListener } from "../../screens/common/push_listeners";
registerKilledListener();

import SectionHeader from "../common/vibeComponent/SectionHeader";

const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      title: "Kyndor Vibes",
      data: [],
      localBoard:[],
      schoolBoard:[],
      blogs:[],
      noSchoolText:'You dont have any event or announcement.'
    };
  }

  componentWillMount(){
    AppInit.start()
    this.appInit();
  }

  appInit = () => {
    FCM.setBadgeNumber(0);
    registerAppListener(this.props.navigation);

    AsyncStorage.getItem('Kyndor:lastNotification').then(data=>{
      if(data){
        Stores.announcementStore.setData([])
        // if notification arrives when app is killed, it should still be logged here
        let notif = JSON.parse(data)
        console.log('last notification', JSON.parse(data));
        if(notif.targetScreen === 'chat'){
          setTimeout(()=>{
            var moreData = JSON.parse(notif.more)
            console.log('from push notification navigating chat from home ... ')
            AsyncStorage.removeItem('Kyndor:lastNotification');
            this.props.navigation.navigate('ChatScreen',{
              groupId:moreData.groupId,
              channelId:moreData.channelId,
              isGroup:moreData.isGroup,
              channelName:moreData.channelName,
              groupName:moreData.groupName
            });
          }, 500)
        }
      }
      else if(notif.targetScreen === 'requests'){
        setTimeout(()=>{
          AsyncStorage.removeItem('Kyndor:lastNotification');
          console.log(`from push notification\n${JSON.stringify(notif)}`)
          this.props.navigation.navigate('Notifications')
          // Stores.screenStore.setData({tab: 'notifications', screen: 'default'})
        }, 500)
      }
    })
  }

  loadData = () => {
    console.log('loading feeds')
    let thisComp = this
    this.setState({schoolBoard:Stores.vibeStore.getGroups(5)})
    this.setState({localBoard:Stores.vibeStore.getLocals(5)})
    this.setState({blogs:Stores.vibeStore.getBlogs(5)})

  }

  componentWillUnMount(){
    Stores.vibeStore.removeListener('VIBE_BLOGS');
    Stores.vibeStore.removeListener('VIBE_LOCALS');
    Stores.vibeStore.removeListener('VIBE_GROUPS');
  }

  componentDidMount = () => {
    this.loadData()
    Stores.vibeStore.on('VIBE_BLOGS',(data)=>{
      this.setState({blogs:data.slice(0, 5)})
    });
    Stores.vibeStore.on('VIBE_LOCALS',(data)=>{
      this.setState({localBoard:data.slice(0, 5)})
    });
    Stores.vibeStore.on('VIBE_GROUPS',(data)=>{
      this.setState({schoolBoard:data.slice(0, 5)})
    });
  }

  // renderLeftElement = () => {
  //   return (
  //     <TouchableOpacity style={{ marginLeft: 15 }} activeOpacity={0.9}>
  //       <Image source={images.menu} />
  //     </TouchableOpacity>
  //   );
  // };

  //onSearchPressed = () => this.setState({ searchActive: true });
  //onSearchClosed = () => this.setState({ searchActive: false });

  onCardPress = (item, events) => {
    let thisComp = this
    this.props.navigation.navigate("Details", {
      refresh:thisComp.loadData,
      data: events,
      item
    });
  };

  onViewLocalBoard = data => {
    let thisComp = this
    this.props.navigation.navigate("Category", {
      refresh:thisComp.loadData,
      data,
      title: "Local Board"
    });
  }

  onViewBlogs = data => {
    let thisComp = this
    this.props.navigation.navigate("Category", {
      refresh:thisComp.loadData,
      data,
      title: "Blogs"
    });
  }

  onViewSchoolBoard = data => {
    let thisComp = this
    this.props.navigation.navigate("Category", {
      refresh:thisComp.loadData,
      data,
      title: "School Board"
    });
  }

  renderFeatured = ({ item }, events) => {
    let thisComp = this
    return (
      <Featured
        item={item}
        onPress={() =>
          this.props.navigation.navigate("Blog", {
            refresh:thisComp.loadData,
            url: item.url,
            title: item.title
          })
        }
      />
    );
  };

  // renderNoSchool = ({ item }, nosch) => {
  //   let thisComp = this
  //   return (
  //     <NoSchools
  //       item={item}
  //       onPress={() =>
  //         alert("OK")
  //       }
  //     />
  //   );
  // };

  renderHorizontal = ({ item }, events) => {
    return (
      <Horizontal item={item} onPress={() => this.onCardPress(item, events)} />
    );
  };

  renderBlogs = data => {
    return (
      <HorizontalFlatlist
        label="Blogs"
        onViewAll={() => this.onViewBlogs(this.state.blogs)}
        data={this.state.blogs}
        renderItem={item => this.renderFeatured(item, this.state.blogs)}
        cardWidth={348}
        cardHeight={257}
      />
    );
  };

  schoolBoard = data => {
    const rootNav = this.props.navigation;
    if (this.state.schoolBoard && this.state.schoolBoard.length > 0){
      return (
          <HorizontalFlatlist
            label="School Board"
            onViewAll={() => this.onViewSchoolBoard(this.state.schoolBoard)}
            data={this.state.schoolBoard}
            renderItem={item => this.renderHorizontal(item, this.state.schoolBoard)}
            cardWidth={270}
            cardHeight={281}
          />
        );
      }
      else{
        return(
          <View>
            <SectionHeader
              style={{ marginLeft: w(18) }}
              label="School Board"
              //onPress={onViewAll}
              withButton={false}
            />
            <View style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: colors.white,
              borderRadius: 4,
              width: "90%",
              height: h(257),
              marginHorizontal: 20,
              marginTop: 3,
              shadowColor: "rgba(183, 183, 183, 0.36)",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 3
            }}>

              <ImageBackground
                source={ require("../../images/popupimage2.png") }
                style={{
                  flex: 1,
                  width: null,
                  height: h(145),
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
                imageStyle={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                resizeMode="cover"
                resizeMethod="resize"
              >
              </ImageBackground>

              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                //paddingTop: h(10),
                paddingBottom: h(10)
              }}>
                <Text numberOfLines={2} style={{
                  color: "rgb(38, 38, 40)",
                  fontFamily: 'System',
                  fontWeight: "500",
                  fontSize: w(18)
                }}
                >
                  {this.state.noSchoolText}
                </Text>
              </View>

              <View style={{alignItems: "center",
                paddingVertical: h(10),
              }}>

                <TouchableOpacity
                  onPress={() => rootNav.navigate('ViewSchool')}
                  style={{
                    backgroundColor: colors.indigoBlue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: w(25),
                    width: w(150),
                    height: h(30)
                  }}>
                  <Text
                    style={{
                      fontFamily: "System",
                      fontSize: 15,
                      fontWeight: "600",
                      letterSpacing: 0.32,color:colors.white,paddingVertical: h(20)
                    }}>
                    Get Schools
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        );
      }
  };

  localBoard = data => {
    return (
      <HorizontalFlatlist
        label="Local Board"
        onViewAll={() => this.onViewLocalBoard(this.state.localBoard)}
        data={this.state.localBoard}
        renderItem={item => this.renderHorizontal(item, this.state.localBoard)}
        cardWidth={270}
        cardHeight={281}
      />
    );
  };

  render() {
    const { data, title, searchActive } = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={{ backgroundColor: colors.paleGrey, flex: 1 }}>
            <Toolbar
              style={styles.toolBar}
              //leftElement={searchActive ? null : this.renderLeftElement()}
              centerElement={title}
              // searchable={{
              //   autoFocus: true,
              //   placeholder: "Search",
              //   onSearchPressed: () => this.onSearchPressed(),
              //   onSearchClosed: () => this.onSearchClosed(),
              //   onSearchCloseRequested: () => this.onSearchClosed()
              // }}
            />

            <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle={{ paddingBottom: 20 }}>
              {this.renderBlogs(data)}
              {this.schoolBoard(data)}
              {this.localBoard(data)}
            </ScrollView>
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default Feed;

const styles = {
  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: { alignItems: "center" },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  }
};
