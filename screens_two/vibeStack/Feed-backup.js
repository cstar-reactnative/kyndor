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
      data: announce,
      localBoard:[],
      schoolBoard:[],
      blogs:[],
      d_info:{},
      noSchoolText:'You dont have any event or announcement.'
    };
  }

  updateDeviceInfo(fcm){
    var thisComp = this
    AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
      if(err){
        alert(err)
      }
      else{
        api.updateDevice({
          token:token,
          fcm:fcm,
          d_info: thisComp.state.d_info
        },
        (e, r) => {
          if(e){
            console.log("updateDeviceInfo Error: ");
            console.log(e)
          }
          else{
            if(r.success == true){
              console.log('updateDeviceInfo success')
            }
            else {
              console.log('updateDeviceInfo Error');
            }
            console.log(r)
          }
        })
      }
    });
  }

  async registerFCM() {
    try {
      await FCM.requestPermissions({ badge: true, sound: true, alert: true });
      const token = await FCM.getFCMToken();
      console.log('getFCMToken token: '+token)
      this.updateDeviceInfo(token)
    }
    catch(e) {
      console.log('token error: '+e)
    }
    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN: ", token);
      });
    }
  }

  componentWillMount(){
    console.log('UniqueID: '+DeviceInfo.getUniqueID())
    console.log('getInstanceID: '+DeviceInfo.getInstanceID())
    console.log('DeviceID: '+DeviceInfo.getDeviceId())

    this.setState({
      d_info: {
        device_id: DeviceInfo.getDeviceId(),
        brand: DeviceInfo.getBrand(),
        carrier: DeviceInfo.getCarrier(),
        country: DeviceInfo.getDeviceCountry(),
        device_name: DeviceInfo.getDeviceName(),
        app_first_installed: DeviceInfo.getFirstInstallTime(),
        manufacturer: DeviceInfo.getManufacturer(),
        model: DeviceInfo.getModel(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        timeZone: DeviceInfo.getTimezone(),
        unique_id: DeviceInfo.getUniqueID(),
        app_version: DeviceInfo.getVersion(),
        isEmulator: DeviceInfo.isEmulator(),
        isTablet: DeviceInfo.isTablet()
      }
    })
    Stores.deviceInfo.setData(this.state.d_info)
    this.registerFCM();
    this.appInit();
  }

  appInit = () => {
    FCM.setBadgeNumber(0);
    registerAppListener(this.props.navigation);

    Stores.unreadCountStore.updateData();
    Stores.chatStore.updateData()
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        // alert(err)
      }
      else{
        api.privateChannel({token: item}, (e, r) => {
          if(e){
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              Stores.privateChannelStore.setData(r.result);
            }
            else {

            }
          }
        })
      }
    });

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
            // navigate('SingleChat',{
            //   groupId:moreData.groupId,
            //   channelId:moreData.channelId,
            //   isGroup:moreData.isGroup,
            //   channelName:moreData.channelName,
            //   groupName:moreData.groupName
            // });
          }, 500)
        }
      }
      else{

      }
    })
  }

  loadData = () => {
    let thisComp = this
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        // loaderHandler.hideLoader();
        // alert(err)
        console.log(err)
      }
      else{
        // get my group vibes
        api.getGroupVibe({limit:5, token:tokenItem}, (e, r) => {
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let myGroupVibe = r.result.records
              thisComp.setState({schoolBoard:myGroupVibe})
            }
            else {
              alert('Something went wrong. Please try again.');
            }
          }
        })

        // get my local vibes
        api.getLocalVibe({limit:5, token:tokenItem}, (e, r) => {
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let myLocalVibe = r.result.records
              thisComp.setState({localBoard:myLocalVibe})
            }
            else {
              alert('Something went wrong. Please try again.');
            }
          }
        })

        // get blogs
        api.getBlogs({limit:5, data:'null', level:'generic', token:tokenItem}, (e, r) => {

          console.log('get blogs e: ')
          console.log(JSON.stringify(e))
          console.log('get blogs r: ')
          console.log(JSON.stringify(r))

          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let genericBlog = r.result.records
              thisComp.setState({blogs:genericBlog})
            }
            else {
              alert('Something went wrong. Please try again.');
            }
          }
        })

        Stores.groupChannelStore.updateData();
      }
    });
  }

  componentDidMount = () => {
    this.loadData()
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

  renderNoSchool = ({ item }, nosch) => {
    let thisComp = this
    return (
      <NoSchools
        item={item}
        onPress={() =>
          alert("OK")
        }
      />
    );
  };

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
              borderRadius: 5,
              width: "90%",
              height: h(257),
              marginHorizontal: 20,
              marginTop: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
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

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18) }
  }
};

const Lorem = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum ligula eget tempus tempus. Maecenas eget ligula vestibulum, ornare lorem non, dignissim nisl. Duis euismod tincidunt ex, vitae malesuada sapien congue in. Morbi id rutrum risus. Vestibulum dictum nisl sit amet sapien feugiat efficitur. Sed rutrum pretium dui a dignissim. Morbi bibendum ornare augue, quis vehicula nunc viverra in.",
  "Nunc viverra, tellus eu fringilla pharetra, mauris felis aliquet urna, vel molestie nulla lectus at lectus. Maecenas tincidunt, nisl ut consectetur pulvinar, neque quam commodo eros, vel ultrices nisl leo luctus velit. Proin consequat tempor turpis nec elementum. Ut orci risus, convallis eget dapibus fermentum, sollicitudin sit amet nunc. In vel massa sodales, venenatis ligula eu, lacinia massa. Morbi pretium tellus purus, quis pretium sem congue ut. Phasellus tempor, ex aliquet finibus convallis, velit ex auctor tortor, sed dapibus lacus erat eu neque. Phasellus congue, lectus eu accumsan lobortis, mauris lorem suscipit tortor, id varius est ante nec enim.",
  "Phasellus ipsum est, rhoncus sed mauris eget, sagittis lacinia sem. Mauris lacus quam, pulvinar sodales ante nec, pretium malesuada est. Suspendisse sed ipsum nec metus finibus pretium. Integer euismod fringilla eros dapibus finibus. Ut non tempor purus. Phasellus nulla augue, aliquet non placerat ut, tempor ac ipsum. Suspendisse nibh libero, ornare ut suscipit et, aliquet molestie massa. Aliquam orci arcu, porta eu suscipit eget, facilisis eu turpis. Mauris purus augue, consequat nec pellentesque eget, hendrerit eget ligula. Nam quis nisi in diam vehicula condimentum vitae eget dui.",
  "Quisque consequat efficitur lobortis. Cras vel metus turpis. Ut sit amet accumsan magna. Praesent eget lacinia quam. Mauris sit amet orci non tortor tincidunt fringilla. Sed eget mi et mi finibus sodales. Quisque a eros arcu. Suspendisse nec lectus dolor.",
  "Proin aliquam efficitur pellentesque. Nulla fringilla nibh enim, quis placerat orci dapibus a. Vestibulum quis libero augue. Maecenas finibus finibus porta. Nunc volutpat arcu vel vestibulum consequat. Nullam nec gravida mauris, eget tristique erat. Sed eros orci, malesuada sit amet sapien et, tempus viverra neque."
];

const announce = [
  {
    id: 1,
    category: "blog",
    title: "1 Empowering blog Community, Enriching Kids",
    content: Lorem[1],
    author: "Mythily Kakani",
    avatar:
      "https://pickaface.net/gallery/avatar/20130716_030959_4921_AllieOop.png",
    image:
      "https://static01.nyt.com/images/2006/05/07/nyregion/07school.xlarge1.jpg",
    createdAt: new Date(),
    featured: true,
    likes: [
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda"
    ],
    url:
      "https://medium.com/s/youthnow/7-lessons-millennials-taught-me-about-work-7c19ab69db1e",
    viewCount: "1K Views"
  },
  {
    id: 2,
    category: "blog",
    title: "2 Lorem blog ipsum dolor sit amet, consectetur adipiscing elit.",
    content: Lorem[2],
    author: "Samanta Jackson",
    avatar:
      "https://pickaface.net/gallery/avatar/20140507_023951_804_FancyUltimate.png",
    image:
      "http://uploads.pl-internal.com/YWM0YzNlN2YtMmM4OC00ZGUwLTkzOWUtZWY2NThlYzQzZDVk/content/2016/10/School.jpg",
    createdAt: new Date(),
    featured: true,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 3,
    category: "blog",
    title: "3 Sapphires' blog Fall Dance Program",
    content: Lorem[2],
    author: "Mythily Kakani",
    avatar:
      "https://pickaface.net/gallery/avatar/20130716_030959_4921_AllieOop.png",
    image:
      "https://www.lgiu.org.uk/wp-content/uploads/2014/09/4493189359_9ec657c0fa_b-360x360.jpg",
    createdAt: new Date(),
    featured: true,
    likes: ["asd"],
    viewCount: "1K Views"
  },
  {
    id: 4,
    category: "blog",
    title: "4 blog Empowering Community, Enriching Kids",
    content: Lorem[1],
    author: "Mythily Kakani",
    avatar:
      "https://pickaface.net/gallery/avatar/20130716_030959_4921_AllieOop.png",
    image:
      "https://static01.nyt.com/images/2006/05/07/nyregion/07school.xlarge1.jpg",
    createdAt: new Date(),
    featured: true,
    likes: [
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda"
    ],
    viewCount: "1K Views"
  },
  {
    id: 5,
    category: "blog",
    title: "5 Lorem ipsum blog dolor sit amet, consectetur adipiscing elit.",
    content: Lorem[2],
    author: "Samanta Jackson",
    avatar:
      "https://pickaface.net/gallery/avatar/20140507_023951_804_FancyUltimate.png",
    image:
      "http://uploads.pl-internal.com/YWM0YzNlN2YtMmM4OC00ZGUwLTkzOWUtZWY2NThlYzQzZDVk/content/2016/10/School.jpg",
    createdAt: new Date(),
    featured: true,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 6,
    category: "blog",
    title: "6 Sapphires' blog Fall Dance Program",
    content: Lorem[2],
    author: "Mythily Kakani",
    avatar:
      "https://pickaface.net/gallery/avatar/20130716_030959_4921_AllieOop.png",
    image:
      "https://www.lgiu.org.uk/wp-content/uploads/2014/09/4493189359_9ec657c0fa_b-360x360.jpg",
    createdAt: new Date(),
    featured: true,
    likes: ["asd"],
    viewCount: "1K Views"
  },
  {
    id: 7,
    category: "event",
    school: "Seven  Lakes High School",
    title: "7 PTA General event Mtg/Volunteer Orientation",
    content: Lorem[3],
    image:
      "https://205eev2oa0jm1t4yb914s1nw-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/COS1503A1-Team-228-at-restaurant-Coffee-Dreams-705x470.jpg",

    createdAt: new Date(),
    eventDate: new Date(),
    featured: false,
    likes: [
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda"
    ],
    viewCount: "1K Views"
  },
  {
    id: 8,
    category: "event",
    school: "Katy Art School",
    title: "8 2018 Fall event Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "http://mediad.publicbroadcasting.net/p/kera/files/styles/medium/public/201608/volunteer_teacher_1.jpg",
    createdAt: new Date(),
    eventDate: new Date(),
    featured: false,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 9,
    category: "event",
    school: "Seven Lakes High School",
    title: "9 PTA General event Mtg/Volunteer Orientation",
    content: Lorem[3],
    image:
      "https://205eev2oa0jm1t4yb914s1nw-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/COS1503A1-Team-228-at-restaurant-Coffee-Dreams-705x470.jpg",

    createdAt: new Date(),
    eventDate: new Date(),
    featured: false,
    likes: [
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda"
    ],
    viewCount: "1K Views"
  },
  {
    id: 10,
    category: "event",
    school: "Seven event Lakes High School",
    title: "10 PTA General Mtg/Volunteer Orientation",
    content: Lorem[3],
    image:
      "https://205eev2oa0jm1t4yb914s1nw-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/COS1503A1-Team-228-at-restaurant-Coffee-Dreams-705x470.jpg",

    createdAt: new Date(),
    eventDate: new Date(),
    featured: false,
    likes: [
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda"
    ],
    viewCount: "1K Views"
  },
  {
    id: 11,
    category: "event",
    school: "Katy Art School",
    title: "11 2018 Fall event Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "http://mediad.publicbroadcasting.net/p/kera/files/styles/medium/public/201608/volunteer_teacher_1.jpg",
    createdAt: new Date(),
    eventDate: new Date(),
    featured: false,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 12,
    category: "event",
    school: "Seven Lakes High School",
    title: "12 PTA General event Mtg/Volunteer Orientation",
    content: Lorem[3],
    image:
      "https://205eev2oa0jm1t4yb914s1nw-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/COS1503A1-Team-228-at-restaurant-Coffee-Dreams-705x470.jpg",

    createdAt: new Date(),
    eventDate: new Date(),
    featured: false,
    likes: [
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda",
      "asd",
      "asda",
      "asda"
    ],
    viewCount: "1K Views"
  },
  {
    id: 13,
    category: "announcement",
    school: "Katy Art School",
    title:
      "13 2018 announcement Fall Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "https://cace.org/wp-content/uploads/2017/03/teacher-kids-painting-470x313.jpg",
    createdAt: new Date(),
    featured: false,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 14,
    category: "announcement",
    school: "Katy Art School",
    title:
      "14 2018 announcement Fall Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "http://cdn2.singlemoms.org/wp-content/uploads/2016/03/TCL-Child-Care4-jpg-800x0-c-default.jpg",
    createdAt: new Date(),
    featured: false,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 15,
    category: "announcement",
    school: "Katy Art School",
    title:
      "15 2018 announcement Fall Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "https://205eev2oa0jm1t4yb914s1nw-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/COS1503A1-Team-228-at-restaurant-Coffee-Dreams-705x470.jpg",
    createdAt: new Date(),
    featured: false,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 16,
    category: "announcement",
    school: "Katy Art School",
    title:
      "16 2018 announcement Fall Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "https://cace.org/wp-content/uploads/2017/03/teacher-kids-painting-470x313.jpg",
    createdAt: new Date(),
    featured: false,
    likes: [],
    viewCount: "1K Views"
  },
  {
    id: 17,
    category: "announcement",
    school: "Katy Art School",
    title:
      "17 2018 announcement Fall Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "http://cdn2.singlemoms.org/wp-content/uploads/2016/03/TCL-Child-Care4-jpg-800x0-c-default.jpg",
    createdAt: new Date(),
    featured: false,
    likes: []
  },
  {
    id: 18,
    category: "announcement",
    school: "Katy Art School",
    title:
      "18 2018 announcement Fall Art Classes Acrylic Painting and some text",
    content: Lorem[4],
    image:
      "https://205eev2oa0jm1t4yb914s1nw-wpengine.netdna-ssl.com/wp-content/uploads/2016/03/COS1503A1-Team-228-at-restaurant-Coffee-Dreams-705x470.jpg",
    createdAt: new Date(),
    featured: false,
    likes: []
  },
];
