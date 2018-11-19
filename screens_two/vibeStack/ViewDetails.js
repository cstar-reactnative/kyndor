import React, { Component } from "react";
import { View, Text, FlatList, Image, ScrollView, AsyncStorage, StatusBar } from "react-native";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import moment from "moment";
import { SafeAreaView } from 'react-navigation';
import { Horizontal, Featured } from "../common/vibeComponent/cards";
import SectionHeader from "../common/vibeComponent/SectionHeader";
import HorizontalFlatlist from "../common/vibeComponent/HorizontalFlatlist";
import colors from '@theme/colorsThree';
import { w, h } from "../common/helpers";
import images from "../../images/index";
const api =  require('../../api/index');
import Stores from '../../stores/';

const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};

class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarData: []
    }
  }

  componentWillUnMount = () => {
    console.log('view_details will unmount')
  }

  componentDidMount = () => {
    console.log('@view details:componentDidMount')
    let vid = this.props.navigation.state.params.item._id;
    let itemData  = this.props.navigation.state.params.item;

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
      }
      else{
        // add view
        console.log('react share')
        api.reactVibe({vid:vid, react:'view', token:tokenItem}, (e, r) => {
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
          }
          else{
            if(r.success == true){
              //
            }
            else {
              //
            }
            // update store
            if(itemData.vibeType == 'blog'){
              Stores.vibeStore.updateBlogs()
            }
            else{
              if(itemData.level == 'local'){
                Stores.vibeStore.updateLocals()
              }
              else if(itemData.level == 'school'){
                Stores.vibeStore.updateGroups()
              }
            }

          }
        })

        // get similar
        console.log('react share')
        api.getVibe({type:itemData.vibeType, level:itemData.level, limit:5, token:tokenItem}, (e, r) => {
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
          }
          else{
            console.log('result:')
            console.log(JSON.stringify(r))
            if(r.success == true){
              this.setState({similarData: r.result.records})
            }
            else {
              //
            }
          }
        })

      }
    });
  }

  capitalize(s){
    var str = s.toLowerCase()
    var array = str.split(" ");
    var a = '';
    for(i=0;i<array.length;i++){
      var n = array[i];
      var a = a + n.charAt(0).toUpperCase() + n.slice(1) + ' ';
    }
    return a;
  }

  onCardPress = item => {
    this.props.navigation.replace("Details", {
      data: this.props.navigation.state.params.data,
      refresh:this.props.navigation.state.params.refresh,
      item
    });
  };

  renderHeader = item => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </View>
    );
  };

  renderContent = item => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleTxt}>{this.capitalize(item.title)}</Text>
        <View style={styles.date}>
          <Image source={images.calendar} style={styles.calendarIcon} />
          <View style={{ paddingLeft: w(15) }}>
            <Text style={{ fontFamily: 'System', color: colors.charcoalGrey }}>
              {moment(item.eventDate).format("ddd, MMM DD, YYYY")}
            </Text>
            <Text style={{ fontFamily: 'System', color: colors.blueGrey }}>
              5:00 PM - 9:00 PM CDT
            </Text>
            {/* <Text
              style={{ fontFamily: 'System', color: colors.indigoBlue, fontWeight: "400" }}
              onPress={() => console.log("add to calendar")}
              >
              Add to calendar
            </Text> */}
          </View>
        </View>
        <View style={styles.school}>
          <Image source={images.location} style={styles.locationIcon} />
          <View style={{ paddingLeft: w(20) }}>
            <Text style={{ fontFamily: 'System', color: colors.charcoalGrey }}>{item.school}</Text>
            <Text style={{ fontFamily: 'System', color: colors.blueGrey }}>School address</Text>
          </View>
        </View>
        <Text style={styles.innerHeader}>About Event</Text>
        <Text style={{ fontFamily: 'System', color: colors.charcoalGrey }}>{item.details}</Text>
      </View>
    );
  };

  renderEventItem = ({ item }) => {
    return <Horizontal item={item} onPress={() => this.onCardPress(item)} />;
  };

  renderBlogItem = ({ item }) => {
    return (
      <Featured details item={item} onPress={() => this.onCardPress(item)} />
    );
  };

  renderMore = data => {
    const { item } = this.props.navigation.state.params;
    let label = `More ${item.vibeType}s`;

    if(data.length > 0){
      return (
        <View style={styles.scrollContainer}>
          {item.category === "blog" ? (
            <HorizontalFlatlist
              label="More blogs like this"
              withButton={false}
              data={data}
              renderItem={this.renderBlogItem}
              cardWidth={348}
              cardHeight={257}
            />
          ) : (
            <HorizontalFlatlist
              label={label}
              withButton={false}
              data={data}
              renderItem={this.renderEventItem}
              cardWidth={270}
              cardHeight={281}
            />
          )}
        </View>
      );
    }

  };

  render() {
    const { item, data } = this.props.navigation.state.params;
    const filtered = this.state.similarData.filter(val => val._id !== item._id);
    // const filtered = this.state.similarData
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <Toolbar
              style={styles.toolBar}
              leftElement="arrow-back"
              onLeftElementPress={() => {
                this.props.navigation.state.params.refresh()
                this.props.navigation.goBack()
              }}
              centerElement={this.capitalize(item.title)}
            />
            <ScrollView>
              {this.renderHeader(item)}
              {this.renderContent(item)}
              {this.renderMore(filtered)}
            </ScrollView>
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default ViewDetails;

const styles = {
  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: { alignItems: "center", paddingRight: w(50) },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  },
  image: { flex: 1, width: null, height: h(180) },
  contentContainer: {
    marginHorizontal: w(18),
    marginTop: h(12),
    paddingBottom: h(30)
  },
  titleTxt: {
    fontFamily: 'System',
    color: colors.charcoalGrey,
    fontSize: w(20),
    fontWeight: "600"
  },
  date: { paddingTop: h(12), flexDirection: "row" },
  calendarIcon: { width: w(20), height: w(20), tintColor: "grey" },
  school: { paddingTop: h(12), flexDirection: "row" },
  locationIcon: { width: w(15), height: h(20) },
  innerHeader: {
    fontFamily: 'System',
    fontSize: w(18),
    color: colors.charcoalGrey,
    fontWeight: "500",
    paddingTop: h(20),
    paddingBottom: h(10)
  },
  scrollContainer: {
    backgroundColor: colors.paleGrey,
    paddingBottom: h(15)
  }
};
