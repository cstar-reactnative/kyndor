import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Alert
} from "react-native";
import { w, h } from "../../helpers";
import images from "../../../../images";
import colors from '@theme/colorsThree';
const api =  require('../../../../api/index');
import Stores from '../../../../stores/';

class Featured extends Component {
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
        // add like/unlike
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

  render() {
    const { item, onPress, details = false } = this.props;
    const {
      container,
      image,
      largeImgRadius,
      ribbon,
      body,
      avatar,
      avatarContainer,
      titleContainer,
      title,
      author,
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
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={{ uri: item.image }}
            style={image}
            imageStyle={largeImgRadius}
            resizeMode="cover"
            resizeMethod="resize"
          >
            {!details && (
              <Image
                source={images.featured}
                style={ribbon}
                resizeMode="contain"
                resizeMethod="resize"
              />
            )}
          </ImageBackground>

          <View style={body}>
            <View style={avatarContainer}>
              <Image
                // source={{ uri: item.avatar }}
                source={{ uri: item.authorImage }}
                style={avatar}
                resizeMode="cover"
                resizeMethod="resize"
              />
            </View>
            <View style={titleContainer}>
              <Text numberOfLines={2} style={title}>
                {this.capitalize(item.title)}
              </Text>
              {/* <Text style={author}>{item.author}</Text> */}
              <Text style={author}>{this.capitalize(item.authorName)}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={footer}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", flex: 0.35 }}
            activeOpacity={0.8}
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
              flex: 0.45
            }}
          >
            <Image
              source={images.shape}
              style={{ width: w(20), height: h(10) }}
            />
            {item.views &&
              item.views.length > 0 && (
                <Text style={iconText}>
                  {item.views.length}{" "}
                  {item.views.length === 1 ? "View" : "Views"}
                </Text>
              )}
            {/* <Text style={iconText}>{item.views}</Text> */}
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
export { Featured };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 4,
    width: w(338),
    height: h(250),
    marginHorizontal: 3,
    marginTop: 3,
    shadowColor: "rgba(183, 183, 183, 0.36)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3
  },

  image: {
    flex: 1,
    width: null,
    height: h(129),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "flex-end"
  },
  largeImgRadius: { borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  ribbon: {
    width: w(28),
    height: h(40),
    marginRight: w(20),
    marginTop: -1
  },
  body: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#cfcfdc",
    borderStyle: "solid",
    paddingTop: h(15),
    paddingBottom: h(17)
  },
  avatarContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10
  },
  avatar: {
    width: w(50),
    height: w(50),
    borderRadius: 25
  },
  titleContainer: {
    flex: 0.8,
    justifyContent: "center",
    paddingHorizontal: 5
  },
  title: {
    fontFamily: 'System',
    color: colors.charcoalGrey,
    opacity: 0.99,
    fontFamily: 'System',
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    fontSize: w(15)
  },
  author: {
    fontFamily: 'System',
    marginTop: h(1),
    fontSize: w(12),
    opacity: 0.99,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#9b9b9b"
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: h(10),
    marginHorizontal: w(20)
    // justifyContent: "space-between"
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
