import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Alert
} from "react-native";
import moment from "moment";
import { w, h } from "../../helpers";
import images from "../../../../images";
import colors from '@theme/colorsThree';
const api =  require('../../../../api/index');
import Stores from '../../../../stores/';

class Horizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.onLike = this.onLike.bind(this);
    this.onShare = this.onShare.bind(this);
  }

  componentDidMount = () => {
    const { item } = this.props;
  }

  componentDidUpdate(prevProps) {
    console.log('component did updated: ')
    console.log(prevProps)
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    const { item } = this.props;
    if (this.props.item !== prevProps.item) {
      this.checkLike(item)
    }
  }

  onLike(d) {
    let vid = d._id
    var thisComp = this
    thisComp.setState({ toggle: !this.state.toggle });

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
        thisComp.setState({ toggle: !this.state.toggle });
      }
      else{
        // add view
        let react = (this.state.toggle) ? 'like' : 'unlike'
        api.reactVibe({vid:vid, react:react, token:tokenItem}, (e, r) => {
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
            thisComp.setState({ toggle: !this.state.toggle });
          }
          else{
            if(r.success == true){
              console.log('react:Done')
            }
            else {
              thisComp.setState({ toggle: !this.state.toggle });
            }

            if(d.vibeType == 'blog'){
              Stores.vibeStore.updateBlogs()
            }
            else{
              if(d.level == 'local'){
                Stores.vibeStore.updateLocals()
              }
              else if(d.level == 'school'){
                Stores.vibeStore.updateGroups()
              }
            }

          }
        })
      }
    });
  }

  onShare() {
    Alert.alert("share");
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

  checkLike(item){
    let thisComp = this;
    let returnVal = ''
    AsyncStorage.getItem('@KyndorStore:myId', (err, myIdItem) => {
      if(err){
        console.log(err)
      }
      else{
        thisComp.setState({toggle:false})
        console.log('my id: '+myIdItem)
        let allLikes = item.likes
        if(allLikes.length > 0){
          for(x in allLikes){
            if(allLikes[x].by.toString() == myIdItem){
              thisComp.setState({toggle:true})
              break;
            }
          }
        }
      }
    });
  }

  renderIcon(){
    const {
      icons
    } = styles;
    if(this.state.toggle){
      return(
        <Image source={images['like_blue']} style={icons} />
      )
    }
    else{
      return(
        <Image source={images['like_white']} style={icons} />
      )
    }
  }

  render() {
    const { item, onPress } = this.props;
    const {
      container,
      image,
      createdAt,
      body,
      titleContainer,
      title,
      schoolText,
      icons,
      footer,
      iconText
    } = styles;
    let like = this.state.toggle ? "like_blue" : "like_white";
    return (
      <View style={container}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={{ flex: 0.9 }}
        >
          <Image
            source={{ uri: item.image }}
            style={image}
            resizeMode="cover"
            resizeMethod="resize"
          />

          <View style={body}>
            <View style={titleContainer}>
              <Text numberOfLines={2} style={title}>
                {this.capitalize(item.title)}
              </Text>
              <Text style={createdAt}>
                {moment(item.createdOn).format("MMM D")}
              </Text>
            </View>
            <Text numberOfLines={1} style={schoolText}>
              {/* {item.school} */}
              {this.capitalize(item.relatedGroupName)}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={footer}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", flex: 0.4 }}
            activeOpacity={0.8}
            // onPress={this.onLike}
            onPress={() => {this.onLike(item)} }
          >
            {/* <Image source={images[like]} style={icons} /> */}
            {this.renderIcon()}
            {item.likes &&
              item.likes.length > 0 && (
                <Text style={iconText}>
                  {item.likes.length}{" "}
                  {item.likes.length === 1 ? "Like" : "Likes"}
                </Text>
              )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 0.4
            }}
          >
            <Image source={images.shape} />
            {item.views &&
              item.views.length > 0 && (
                <Text style={iconText}>
                  {item.views.length}{" "}
                  {item.views.length === 1 ? "View" : "Views"}
                </Text>
              )}

            {/* <Image
              source={images.shape}
              style={{ width: w(20), height: h(10) }}
              />
            <Text style={iconText}>{item.views.length}</Text> */}
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onShare}
            style={{ flex: 0.2, alignItems: "flex-end" }}
            >
            <Image
              source={images.share}
              style={{ width: w(18), height: h(13) }}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
export { Horizontal };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    justifyContent: "space-between",

    marginHorizontal: 3,
    marginTop: 3,
    width: w(260),
    height: h(275),
    shadowColor: "rgba(183, 183, 183, 0.36)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3
  },
  image: {
    flex: 0.55,
    width: null,
    height: h(120),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "flex-end"
  },

  body: {
    flex: 0.45,
    paddingTop: h(10),
    paddingLeft: w(15),
    paddingRight: 5,
    //paddingBottom: h(10)
    //justifyContent: "space-between"
  },

  titleContainer: {
    flex: 0.8,
    justifyContent: "center"
  },
  // title: {
  //   fontFamily: 'System',
  //   color: "rgb(38, 38, 40)",
  //   fontWeight: "500",
  //   fontSize: w(14)
  // },
  title: {
    marginTop: h(10),
    fontFamily: 'System',
    color: colors.charcoalGrey,
    //opacity: 0.99,
    fontFamily: 'System',
    fontWeight: "600",
    fontSize: w(15),
    fontStyle: "normal",
    letterSpacing: 0,
  },
  createdAt: {
    fontFamily: 'System',
    fontSize: w(12),
    color: "#9b9b9b",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
  },
  schoolText: {
    marginTop: h(30),
    fontFamily: 'System',
    fontSize: w(15),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4a4a4a",
    paddingBottom: 5
  },
  footer: {
    flex: 0.1,
    marginTop: h(10),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: h(10),
    paddingHorizontal: w(15),
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#cfcfdc",
    borderStyle: "solid",
  },
  iconText: {
    fontFamily: 'System',
    fontSize: w(12),
    marginLeft: w(10)
  },
  icons: { width: w(20), height: w(20) }
});
