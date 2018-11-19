import React, { Component } from "react";
import ReactNative, {
  View,
  Alert,
  Image,
  PlatformIOS,
  AsyncStorage,
  Platform,
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
// import ImagePicker from "react-native-image-crop-picker";
import ImagePicker from 'react-native-image-picker';
import colors from '@theme/colorsThree';
import { w, h } from "./common/helpers";

import SectionHeader from "./common/profileComponent/SectionHeader";
// import Avatar from "./common/profileComponent/Avatar";
import Button from "./common/profileComponent/Button";
import TagsCloud from "./common/profileComponent/TagsCloud";
import InputForm from "./common/profileComponent/InputForm";
import images from "../images/index";
import Stores from '../stores/';
const api =  require('../api/index');

const inputs = [
  {
    label: "First Name",
    name: "firstname"
  },
  {
    label: "Last Name",
    name: "lastname"
  },
  {
    label: "Email",
    name: "email",
    autoCapitalize: "none",
    keyboardType: "email-address"
  },
];

class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      tags: tags,
      values: {},
      imgData:'',
      loading: false,
      selected: [],
      from: ''
    };
  }

  componentDidMount(){
    let { navigation } = this.props;
    let from = navigation.getParam('from');
    this.setState({from})
    if(from == 'signup'){
      this.setState({
        values:{
          'firstname':navigation.getParam('fname'),
          'lastname':navigation.getParam('lname'),
          'zipcode':navigation.getParam('zip'),
        }
      })
    }
    else if(from == 'profile'){
      let thisComp = this

      AsyncStorage.getItem('@KyndorStore:myData', (err, myDataItem) => {
        if(err){
          console.log(err)
        }
        else{
          let userData = JSON.parse(myDataItem)
          thisComp.setState({
            values:{
              'firstname':userData.first_name,
              'lastname':userData.last_name,
              'zipcode':userData.zip_code,
              // 'email':userData.email,
            }
          })
        }
      });
    }
  }

  componentWillUnmount() {
    // ImagePicker.clean();
  }

  _scroll = (ref, offset) => {
    var scrollResponder = this.scroll.props.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      ReactNative.findNodeHandle(ref),
      offset,
      true
    );
  };

  onChangeText = (text, name) => {
    this.setState({ values: { ...this.state.values, [name]: text } });
  };

  onInputFocus = name => {
    if (!PlatformIOS) {
      this._scroll(this[name], 110);
    }
  };

  onSubmitEditing = name => {
    const refNames = inputs.map((val, key) => val.name);
    let pos = refNames.indexOf(name);

    if (pos !== refNames.length - 1) {
      this[refNames[pos + 1]].focus();
    }
    else {
      this[name].blur();
    }
  };

  onSave = () => {
    this.setState({loading:true})
    let thisComp = this
    const { values, tags, selected } = this.state;
    const selectedTags = selected.map((val, key) => {
      return tags[val];
    });
    const data = {
      ...values,
      tags: selectedTags,
      avatar: this.state.avatar
    };
    console.log(data);

    // api call
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
      }
      else{
        let userEmail = (this.state.values.email == '') ? null : this.state.values.email
        let userInterests = (this.state.selected.length > 0) ? JSON.stringify(selectedTags) : 'null'

        if(this.state.imgData != ''){
          // upload image
          api.uploadFile({fileData: this.state.imgData, token: tokenItem}, (ee, res) => {
            let rr = JSON.parse(res)
            if((rr.success == true) && (rr.result)){
              console.log('image upload success')
              api.completeProfile({email:userEmail, interests:userInterests, pic:rr.result.theFile[0].filename, token:tokenItem}, (e, r) => {
                console.log('completeProfile e: ')
                console.log(JSON.stringify(e))
                console.log('completeProfile r: ')
                console.log(JSON.stringify(r))
                if(r.success == true){
                  thisComp.setState({loading:false})
                  Stores.rootNavStore.setData('HomeNavRouter')
                }
                else {
                  thisComp.setState({loading:false})
                  alert('EP103: Something went wrong. Please try again.');
                }
              })
            }
            else {
              console.log('Connection Failed! Please try again.');
              thisComp.setState({loading:false})
              alert('EP102: Image upload failed. Please try again.')
            }
          })
        }
        else{
          api.completeProfile({email:userEmail, interests:userInterests, pic:'null', token:tokenItem}, (e, r) => {
            console.log('completeProfile e: ')
            console.log(JSON.stringify(e))
            console.log('completeProfile r: ')
            console.log(JSON.stringify(r))
            if(e){
              console.log('completeProfile error:')
              console.log(JSON.stringify(e))
              thisComp.setState({loading:false})
              alert('Error: '+e.error);
            }
            else{
              if(r.success == true){
                thisComp.setState({loading:false})
                // thisComp.props.navigation.navigate("Home");
                Stores.rootNavStore.setData('HomeNavRouter')
              }
              else {
                thisComp.setState({loading:false})
                alert('Something went wrong. Please try again.');
              }
            }
          })
        }
      }
    });
  };

  onTagPress = indx => {
    const selectedTags = this.state.selected;
    const deselect = selectedTags.filter(val => val !== indx);
    const select = selectedTags.concat(indx);

    const tagExists = this.state.selected.includes(indx);
    this.setState({ selected: tagExists ? deselect : select });
  };

  onAction = () => {
    // if (index === 1) {
    //   ImagePicker.openCamera({
    //     width: 300,
    //     height: 300,
    //     cropping: true
    //   })
    //     .then(image => {
    //       this.setState({ avatar: image.path });
    //     })
    //     .catch(e => console.log(e));
    // }
    // if (index == 2) {
    //   ImagePicker.openPicker({
    //     width: 300,
    //     height: 300,
    //     cropping: true
    //   })
    //     .then(image => {
    //       this.setState({ avatar: image.path });
    //     })
    //     .catch(e => console.log(e));
    // }
    // if (index == 3) {
    //   this.setState({ avatar: "" });
    // }

    const options = {
      mediaType: 'photo', // 'photo' or 'video'
      allowsEditing: true, // Built in functionality to resize/reposition the image after selection
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    let thisComp = this

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let imgData = {
          image: (Platform.OS==='android') ? response.uri : response.uri.replace('file://', ''),
          filePath: response.path,
          fileName: response.fileName
        };
        console.log(imgData)
        thisComp.setState({
          avatar: response.uri ,
          imgData: imgData
        });
      }
    });

  };

  renderBack = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.props.navigation.goBack()}
        style={styles.backIcon}
      >
        <Ionicons
          name={PlatformIOS ? "ios-arrow-back" : "md-arrow-back"}
          color="rgb(38, 38, 40)"
          size={28}
        />
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <SectionHeader
        label="Create your profile"
        subTxt="Tell us about yourself"
        withButton={false}
        style={{ marginTop: 0, marginBottom: 0 }}
        textStyle={styles.headerText}
        subTextStyle={styles.headerSubText}
      />
    );
  };

  renderAvatar = () => {
    return (
      // <Avatar
      //   avatar={this.state.avatar}
      //   onSelect={this.onAction}
      //   // camera={this.pickFromCam}
      //   // gallery={this.pickfromGallery}
      //   // delete={this.deleteAvatar}
      // />

      <View style={styles.container2}>
        {!this.state.avatar ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.iconContainer}
            onPress={this.onAction}
          >
            <Image source={images.camera} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <View overflow="hidden" style={styles.imgContainer}>
            <ImageBackground
              source={{ uri: this.state.avatar }}
              style={styles.image}
              imageStyle={{ borderRadius: w(60) }}
              resizeMethod="resize"
              resizeMode="cover"
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.onAction}
                style={styles.button}
              >
                <Text style={{ fontFamily: 'System', color: "#fff" }}>EDIT</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      </View>

    );
  };

  renderInputForm = () => {
    return (
      <InputForm
        inputs={inputs}
        values={this.state.values}
        inputRef={(ref, name) => (this[name] = ref)}
        onFocus={name => this.onInputFocus(name)}
        onSubmitEditing={this.onSubmitEditing}
        onChangeText={this.onChangeText}
      />
    );
  };

  renderTagsCloud = () => {
    return (
      <TagsCloud
        onPress={tag => this.onTagPress(tag)}
        selected={this.state.selected}
        data={this.state.tags}
      />
    );
  };

  renderButtons = () => {
    if(this.state.from == 'profile'){
      return (
        <View style={{ flexDirection: "row" }}>
          <Button
            text="Save"
            onPress={this.onSave}
            style={{ marginLeft: 0, marginRight: 0 }}
          />
        </View>
      );
    }
    else{
      return (
        <View style={{ flexDirection: "row" }}>
          <Button
            text="Skip"
            onPress={() => Stores.rootNavStore.setData('HomeNavRouter')}
            style={styles.skipButton}
            textStyle={{ color: colors.blueGrey }}
          />
          <Button
            text="Save"
            onPress={this.onSave}
            style={{ marginLeft: 0, marginRight: 0 }}
          />
        </View>
      );
    }
  };

  renderLoader = () => {
    if(this.state.loading){
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <ActivityIndicator
          color={colors.indigoBlue}
          animating={this.state.loading}
          size="large"
        />
      </View>
    }
  }

  render() {
    console.log("state", this.state);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
          {this.renderBack()}
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            innerRef={ref => {
              this.scroll = ref;
            }}
          >
            {this.renderLoader()}
            {this.renderHeader()}
            {this.renderAvatar()}
            {this.renderInputForm()}
            {/* {this.renderTagsCloud()} */}
            {this.renderButtons()}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default Profile;

const styles = {
  toolBar: {
    container: { backgroundColor: colors.white },
    leftElement: { color: "#000" }
  },
  scrollView: {
    flex: 1,
    marginHorizontal: w(25),
    marginTop: h(10),
    marginBottom: h(20)
    // backgroundColor: "yellow"
  },
  backIcon: {
    justifyContent: "center",
    marginLeft: w(12),
    marginTop: h(16),
    paddingTop: h(7),
    paddingLeft: w(12),
    width: w(40),
    height: h(40)
  },
  headerText: {
    fontFamily: 'System',
    fontSize: w(30),
    fontWeight: "600"
  },
  headerSubText: {
    fontFamily: 'System',
    fontSize: w(20)
  },
  skipButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueGrey,
    marginRight: w(12),
    marginLeft: 0
  },
  container2: { alignItems: "center", paddingVertical: h(25) },
  iconContainer: {
    backgroundColor: colors.lightBlueGrey,
    width: w(120),
    height: w(120),
    borderRadius: w(60),
    alignItems: "center",
    justifyContent: "center"
  },
  imgContainer: {
    width: w(120),
    height: w(120),
    borderRadius: w(60)
  },
  image: {
    width: w(120),
    height: w(120),
    justifyContent: "flex-end"
  },
  button: {
    backgroundColor: "rgba(56, 62, 83, 0.5)",
    height: h(32),
    alignItems: "center",
    justifyContent: "center"
  },
  icon: { width: w(50), height: w(50) }
};

const tags = [
  "music",
  "Dance",
  "Diy",
  "Baking",
  "Road Trip",
  "Painting",
  "Food",
  "Sport",
  "Travel",
  "Swimming",
  "Jumping",
  "Running",
  "Sitting",
  "Sleeping",
  "bla bla"
];
