import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  StyleSheet
} from "react-native";
import moment from "moment";

import { w, h } from "../../helpers";
import images from "../../../../images";
import colors from '@theme/colorsThree';
const api =  require('../../../../api/index');
import Stores from '../../../../stores/';

class Vertical extends Component {
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
    if(s && s.length>0){
      var str = s.toLowerCase()
      var array = str.split(" ");
      var a = '';
      for(i=0;i<array.length;i++){
        var n = array[i];
        var a = a + n.charAt(0).toUpperCase() + n.slice(1) + ' ';
      }
      return a;
    }
    else{
      return s;
    }
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
    const { body, footer, icons, iconText, image, textsContainer } = styles;
    let like = this.state.toggle ? "like_blue" : "like_white";
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={{ flex: 0.9 }}
        >
          <View style={body}>
            <Image
              source={{ uri: item.image }}
              style={image}
              resizeMode="cover"
              resizeMethod="resize"
            />

            <View style={textsContainer}>
              <View>
                <Text numberOfLines={2} style={styles.title}>
                  {this.capitalize(item.title)}
                </Text>
                <Text style={styles.createdAt}>
                  {moment(item.createdAt).format("MMM D")}
                </Text>
              </View>
              <Text style={styles.schoolText}>
                {item.vibeType === "blog" ? this.capitalize(item.authorName) : this.capitalize(item.relatedGroupName)}
                {/* {item.vibeType === "blog" ? item.authorName : item.relatedGroupName} */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 0.8
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              activeOpacity={0.5}
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
                alignItems: "center"
              }}
            >
              <Image source={images.shape}
                style={{ width: w(20), height: h(10) }}/>
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
              <Text style={iconText}>{item.viewCount}</Text> */}
            </View>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onShare}
            style={{ flex: 0.5, alignItems: "flex-end" }}
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
export { Vertical };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 4,
    marginBottom: 3,
    marginHorizontal: 3,
    marginTop: 3,
    paddingTop: w(14),
    shadowColor: "rgba(183, 183, 183, 0.36)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3
  },
  body: {
    flexDirection: "row",
    flex: 1,
    paddingBottom: w(15),
    paddingHorizontal: w(15)
  },
  image: {
    width: w(105),
    height: w(105),
    borderRadius: 5
  },
  textsContainer: {
    marginLeft: w(10),
    flex: 1,
    justifyContent: "space-between"
  },
  // title: {
  //   fontFamily: 'System',
  //   color: "rgb(38, 38, 40)",
  //   fontWeight: "500",
  //   fontSize: w(14),
  //   lineHeight: w(14)
  // },
  title: {
    color: colors.charcoalGrey,
    //opacity: 0.99,
    letterSpacing: 0,
    fontFamily: 'System',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: w(15)
  },
  createdAt: {
    marginTop: h(5),
    fontFamily: 'System',
    fontSize: w(12),
    color: "#9b9b9b",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
  },
  schoolText: {
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
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    fontSize: w(12),
    marginLeft: w(8),
    color: "#9b9b9b",
  },
  icons: { width: w(20), height: w(20) }
});
