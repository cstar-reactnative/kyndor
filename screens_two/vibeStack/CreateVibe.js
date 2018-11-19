import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Text,
  Item,
  Icon,
  Label,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles, googlePlacesCustomStyle } from './styles/createStyles';

import Color from '@theme/colorsThree';
import { w, h } from "../common/helpers";
import images from "../../images/index";
const api =  require('../../api/index');
import Stores from '../../stores/';
import AppConfig from '../../config.js'
const imgcdn = AppConfig.imgLoc

const CREATE_EVENT = 'Create Event';
const CREATE_ANNOUNCEMENT = 'Create Announcement';
const CREATE_BLOG = 'Create Blog';

export class FaqScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTimeStart: '2018-10-2 2:35',
      dateTimeEnd: '2018-10-2 2:35',
      details: '',
      avatarSource: null,
      openDetailsModal: false,
      openLocationModal: false,
      vibeType: 'event',
      imgResponse:'',
      openVibePicker: false,
      openGroupPicker:false,
      selectedGroup:{name:'Your School Group'},
      selectedMember:{},
      groupData:[],
      groupMember:[],
      forLevel:'For local/school ?',
      personName:'User',
      personImage:null,
      personId:1
    };
  }

  getGroupData = () => {
    let itemArray = Stores.groupChannelStore.getData()
    let schoolArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type == 'general') {
          schoolArray.push(i)
        }
      })
    }

    if(schoolArray.length > 0){
      this.setState({groupData: schoolArray});
    }
  }

  setPersonAsMe(){
    let thisComp = this

    AsyncStorage.getItem('@KyndorStore:myData', (err, myDataItem) => {
      if(err){
        console.log(err)
      }
      else{
        let userData = JSON.parse(myDataItem)
        console.log('profile_pic: ')
        console.log(userData.profile_pic)

        thisComp.setState({
          personName:userData.name,
          personId:userData.user_id,
          personImage:((userData.profile_pic == '') || (userData.profile_pic == 'null') || (userData.profile_pic == null) || (userData.profile_pic == 'no-image.jpg')) ? null : imgcdn+userData.profile_pic
        })
      }
    });
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    this.getGroupData()
    this.setPersonAsMe()

    console.log('create componentDidMount')
    console.log(this.props.navigation.getParam('vibeType'))

    this.setState({
      vibeType: this.props.navigation.getParam('vibeType')
    })
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  _keyboardDidShow(e) {
    this.setState({
      keyboadHeight: e.endCoordinates.height,
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboadHeight: null,
    });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,

      storageOptions: {
        skipBackup: true,
      },
    };

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
        const source = { uri: response.uri };

        let imgData = {
          image: (Platform.OS==='android') ? response.uri : response.uri.replace('file://', ''),
          filePath: response.path,
          fileName: response.fileName
        };

        this.setState({
          avatarSource: source,
          imgResponse:imgData
        }, function () {
          this.forceUpdate();
        });
      }
    });
  }

  getNameDescription() {
    switch (this.state.vibeType) {
      case 'event':
        return 'Event Name';
      case 'announcement':
        return 'Announcement Name';
      case 'blog':
        return 'Blog Title';
      default:
        return 'Name';
    }
  }

  getVibeDescription() {
    switch (this.state.vibeType) {
      case 'event':
        return CREATE_EVENT;
      case 'announcement':
        return CREATE_ANNOUNCEMENT;
      case 'blog':
        return CREATE_BLOG;
      default:
        return 'Select a type';
    }
  }

  getDetailsDescription() {
    switch (this.state.vibeType) {
      case 'event':
        return 'Event Details';
      case 'announcement':
        return 'Announcement Details';
      case 'blog':
        return 'Insert Blog URL';
      default:
        return 'Details';
    }
  }

  renderVibePicker() {
    const vibeOptions = [CREATE_EVENT, CREATE_ANNOUNCEMENT, CREATE_BLOG];
    const onSelectVibe = (option) => {
      let vibeType;
      switch (option) {
        case CREATE_EVENT:
          vibeType = 'event';
          break;
        case CREATE_ANNOUNCEMENT:
          vibeType = 'announcement';
          break;
        case CREATE_BLOG:
          vibeType = 'blog';
          break;
        default:
          vibeType = 'event';
      }

      this.setState({ vibeType, openVibePicker: false });
      if(vibeType == 'blog'){
        this.setPersonAsMe()
      }
    };

    return (
      <Modal
        visible={this.state.openVibePicker}
        transparent
        onRequestClose={() => this.setState({ openVibePicker: false })}
      >
        <TouchableWithoutFeedback onPress={() => this.setState({ openVibePicker: false })}>
          <View style={{ flex: 1, backgroundColor: Color.transBlack }} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.labelContainer}>
            <Label style={styles.label}>Select your option</Label>
          </View>
          {vibeOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.pickerItem}
              onPress={() => onSelectVibe(option)}
            >
              <Text style={styles.placeholderText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
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

  getGroupMembers() {
    AsyncStorage.getItem("@KyndorStore:token", (err, tokenItem) => {
      if (err) {
        alert(err);
      }
      else {
        api.getGroupParticipants(
          { group_id: this.state.selectedGroup.group_id, token: tokenItem },
          (e, r) => {
            if (e) {
              console.log("Error: " + e);
            }
            else {
              if (r.success == true) {
                this.setState({ groupMember: r.result.participants });
                console.log('groupMember: ')
                console.log(this.state.groupMember)
              }
              else {
                console.log("getGroupMembers: Connection Failed!");
              }
            }
          }
        );
      }
    });
  }

  renderMemberPicker() {
    const onSelectMember = (option) => {
      this.setState({
        selectedMember:option,
        personName:option.name,
        personImage:((option.profile_pic == '') || (option.profile_pic == 'null') || (option.profile_pic == null) || (option.profile_pic == 'no-image.jpg')) ? null : imgcdn+option.profile_pic ,
        personId:1,
        openMemberPicker: false
      });
    };

    if (this.state.groupMember.length > 0) {
      return (
        <Modal
          visible={this.state.openMemberPicker}
          transparent
          onRequestClose={() => this.setState({ openMemberPicker: false })}>
          <TouchableWithoutFeedback onPress={() => this.setState({ openMemberPicker: false })}>
            <View style={{ flex: 1, backgroundColor: Color.transBlack }} />
          </TouchableWithoutFeedback>
          <View style={styles.modal}>
            <View style={styles.labelContainer}>
              <Label style={styles.label}>Select</Label>
            </View>

            <ScrollView height={'40%'} marginBottom={20}>
              {this.state.groupMember.map(option => (
                <TouchableOpacity
                  key={option.user_id}
                  style={{alignItems:'flex-start', justifyContent:'flex-start', paddingVertical:5, marginLeft:5, marginBottom:5, borderBottomWidth:1, borderColor:'grey' }}
                  onPress={() => onSelectMember(option)}
                >
                  <Text>{this.capitalize(option.name)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>


            {/* <FlatList
              data={this.state.groupMember}
              renderItem={({ option }) => {
                return (
                  <TouchableOpacity
                    // key={option.user_id.toString()}
                    style={{alignItems:'flex-start', justifyContent:'flex-start', paddingVertical:5, marginLeft:5, marginBottom:5, borderBottomWidth:1, borderColor:'grey' }}
                    onPress={() => onSelectMember(option)}>
                    <Text>{this.capitalize(option.name)}</Text>
                  </TouchableOpacity>

                );
              }}
              keyExtractor={(item, index) => item.user_id.toString()}
            /> */}

          </View>
        </Modal>
      );
    }
    else {
      return (
        <View>
          <Text style={{ fontFamily: "System" }}>No members!</Text>
        </View>
      );
    }
  }

  renderGroupPicker() {
    let itemArray = this.state.groupData

    const onSelectGroup = (option) => {
      this.setState({
        selectedGroup:option,
        openGroupPicker: false
      });
      this.getGroupMembers()
      this.setPersonAsMe()
    };

    return (
      <Modal
        visible={this.state.openGroupPicker}
        transparent
        onRequestClose={() => this.setState({ openGroupPicker: false })}>
        <TouchableWithoutFeedback onPress={() => this.setState({ openGroupPicker: false })}>
          <View style={{ flex: 1, backgroundColor: Color.transBlack }} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.labelContainer}>
            <Label style={styles.label}>Select your school group</Label>
          </View>
          <ScrollView height={'40%'} marginBottom={20}>
            {itemArray.map(option => (
              <TouchableOpacity
                key={option.group_id}
                style={{alignItems:'flex-start', justifyContent:'flex-start', paddingVertical:5, marginLeft:5, marginBottom:5, borderBottomWidth:1, borderColor:'grey' }}
                onPress={() => onSelectGroup(option)}
              >
                <Text>{this.capitalize(option.name)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    );
  }

  renderLevelPicker() {
    const groupOptions = ['local', 'school'];

    const onLevelGroup = (option) => {
      this.setState({
        forLevel:option,
        openLevelPicker: false
      });
      if(option == 'local'){
        this.setPersonAsMe()
      }
    };

    return (
      <Modal
        visible={this.state.openLevelPicker}
        transparent
        onRequestClose={() => this.setState({ openLevelPicker: false })}>
        <TouchableWithoutFeedback onPress={() => this.setState({ openLevelPicker: false })}>
          <View style={{ flex: 1, backgroundColor: Color.transBlack }} />
        </TouchableWithoutFeedback>
        <View style={styles.modal}>
          <View style={styles.labelContainer}>
            <Label style={styles.label}>Select:</Label>
          </View>
          <ScrollView height={100} marginBottom={20}>
            {groupOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={{alignItems:'flex-start', justifyContent:'flex-start', paddingVertical:5, marginLeft:5, marginBottom:5, borderBottomWidth:1, borderColor:'grey' }}
                onPress={() => onLevelGroup(option)}
              >
                <Text>{this.capitalize(option)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    );
  }

  renderDetailsModal() {
    return (
      <Modal
        visible={this.state.openDetailsModal}
        transparent
        onRequestClose={() => this.setState({ openDetailsModal: false })}
      >
        <TouchableWithoutFeedback onPress={() => this.setState({ openDetailsModal: false })}>
          <View style={{ flex: 1, backgroundColor: Color.transBlack }} />
        </TouchableWithoutFeedback>
        <View style={[styles.modal,
          Platform.OS === 'ios' && this.state.keyboadHeight
          ? { marginBottom: this.state.keyboadHeight } : null]}
        >
          <View style={styles.labelContainer}>
            <Label style={styles.label}>{this.getDetailsDescription()}</Label>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            multiline={this.state.vibeTyle !== 'blog'}
            value={this.state.details}
            onChangeText={text => this.setState({ details: text })}
            onSubmitEditing={() => this.setState({ openDetailsModal: false })}
            style={styles.detailsModalText}
            autoFocus
          />
        </View>
      </Modal>
    );
  }

  onLocationRowPress(data, details) {
    let city;
    let zip;

    for (let i = 0; i < details.address_components.length; i++) {
      const foundCity = details.address_components[i].types.find(element => element === 'locality');

      if (foundCity) {
        city = details.address_components[i].long_name;
        break;
      }

      const foundZip = details.address_components[i].types.find(element => element === 'postal_code');

      if (foundZip) {
        zip = details.address_components[i].long_name;
        break;
      }
    }

    this.setState({
      openLocationModal: false,
      address: data.description,
      city,
      zip,
    });
  }

  renderLocationRow(row) {
    console.log(row);
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.googlePlaceIconView}>
          <Icon
            style={styles.googlePlaceIcon}
            type="FontAwesome"
            name="map-pin"
          />
        </View>
        <View style={styles.googlePlaceInfoContainer}>
          <Text style={styles.googlePlaceMainText}>
            {row.structured_formatting.main_text}
          </Text>
          <Text style={styles.googlePlaceSecondaryText}>
            {row.structured_formatting.secondary_text}
          </Text>
        </View>
      </View>
    );
  }

  renderLocationModal() {
    return (
      <Modal
        visible={this.state.openLocationModal}
        transparent
        onRequestClose={() => this.setState({ openLocationModal: false })}
      >
        <TouchableWithoutFeedback onPress={() => this.setState({ openLocationModal: false })}>
          <View style={{ flex: 1, backgroundColor: Color.transBlack }} />
        </TouchableWithoutFeedback>
        <View style={[styles.locationModal,
            Platform.OS === 'ios' && this.state.keyboadHeight
            ? { marginBottom: this.state.keyboadHeight }
            : null]}
        >
          <GooglePlacesAutocomplete
            minLength={3}
            autoFocus
            listViewDisplayed
            fetchDetails
            renderRow={this.renderLocationRow}
            onPress={this.onLocationRowPress.bind(this)}
            query={{
              key: 'AIzaSyAb2DLEPFWsAKfhqznTfvh_KAIJ9dKcbek',
            }}
            styles={googlePlacesCustomStyle}
            keyboardShouldPersistTaps="never"
            nearbyPlacesAPI="GooglePlacesSearch"
            enablePoweredByContainer={false}
            renderRightButton={() => (
              <Button transparent onPress={() => this.setState({ openLocationModal: false })}>
                <Text>Cancel</Text>
              </Button>
            )}
          />
        </View>
      </Modal>
    );
  }

  handleSubmitEvent() {
    const {goBack} = this.props.navigation;
    const data = {
      featured: '',
      tages: null,
      level: null,
      vibeType: null,
      relatedGroupId: 'null',
      relatedGroupName: 'null',
      relatedChannelId: 'null',
      relatedChannelName: 'null',
      image: 'null',
      title: 'null',
      url: 'null',
      address: 'null',
      zip: 'null',
      city: 'null',
      onDate: null,
      authorName: 'null',
      authorImage: 'null',
      details: 'null',
    };

    data.featured = 'NO';
    data.level = (this.state.forLevel == 'For local/school ?') ? 'generic' : this.state.forLevel;
    data.vibeType = this.state.vibeType;
    data.image = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350';
    data.title = this.state.name;
    data.url = this.state.vibeType === 'blog' ? this.state.details : 'null';
    data.details = this.state.vibeType !== 'blog' ? this.state.details : 'null';
    data.onDate = this.state.dateTimeStart;
    data.onDate = this.state.dateTimeEnd;
    data.address = this.state.address;
    data.city = this.state.city ? this.state.city : 'null';
    data.zip = this.state.zip ? this.state.zip : 'null';
    data.relatedGroupId = (this.state.selectedGroup.name == 'Your School Group') ? 'null' : this.state.selectedGroup.group_id.toString();
    data.relatedGroupName = (this.state.selectedGroup.name == 'Your School Group') ? 'null' : this.state.selectedGroup.name;
    data.authorId = this.state.personId;
    data.authorName = 'https://media.licdn.com/dms/image/C5103AQE-5D249_H7uQ/profile-displayphoto-shrink_200_200/0?e=1544054400&v=beta&t=yb9hB27ZL8c9fMQY1ks8YR2a0TnMVxaMetPWGtm6pSw';
    data.authorImage = this.state.personImage;

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log(err)
      }
      else{

        api.createVibe({allData:JSON.stringify(data), token:tokenItem}, (e, r) => {
          console.log('createVibe e: ')
          console.log(JSON.stringify(e))
          console.log('createVibe r: ')
          console.log(JSON.stringify(r))
          if(r.success == true){
            Alert.alert(
              'Create Request',
              'Your create request has been process successfully.',
              [
                {text: 'OK', onPress: () => goBack()},
              ],
              { cancelable: false }
            )
          }
          else {
            thisComp.setState({loading:false})
            alert('EP403: Something went wrong. Please try again.');
          }
        })

        // if(this.state.imgResponse == ''){
        //   api.createVibe({allData:JSON.stringify(data), token:tokenItem}, (e, r) => {
        //     console.log('createVibe e: ')
        //     console.log(JSON.stringify(e))
        //     console.log('createVibe r: ')
        //     console.log(JSON.stringify(r))
        //     if(r.success == true){
        //       Alert.alert(
        //         'Create Request',
        //         'Your create request has been process successfully.',
        //         [
        //           {text: 'OK', onPress: () => goBack()},
        //         ],
        //         { cancelable: false }
        //       )
        //     }
        //     else {
        //       thisComp.setState({loading:false})
        //       alert('EP403: Something went wrong. Please try again.');
        //     }
        //   })
        // }
        // else{
        //   api.uploadFile({fileData: this.state.imgResponse, token: tokenItem}, (ee, res) => {
        //     let rr = JSON.parse(res)
        //     if((rr.success == true) && (rr.result)){
        //       console.log('image upload success')
        //       console.log(rr);
        //       data.image = imgcdn+rr.result.theFile[0].filename
        //       console.log(data)
        //       api.createVibe({allData:JSON.stringify(data), token:tokenItem}, (e, r) => {
        //         console.log('createVibe e: ')
        //         console.log(JSON.stringify(e))
        //         console.log('createVibe r: ')
        //         console.log(JSON.stringify(r))
        //         if(r.success == true){
        //           // alert('success')
        //           Alert.alert(
        //             'Create Request',
        //             'Your create request has been process successfully.',
        //             [
        //               {text: 'OK', onPress: () => goBack()},
        //             ],
        //             { cancelable: false }
        //           )
        //
        //         }
        //         else {
        //           thisComp.setState({loading:false})
        //           alert('EP403: Something went wrong. Please try again.');
        //         }
        //       })
        //
        //     }
        //   });
        // }
      }
    });

    // fetch(`${api.BASE_URL}/vibe/create`, {
    //   method: 'POST',
    //   headers: api.HEADERS,
    //   body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then((responseJson) => {
    //   console.log(responseJson);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.state.params.refresh()
              this.props.navigation.goBack()
            }}
            >
            <Text style={styles.headerText}>Cancel</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <Text style={[styles.headerText, { fontSize: 18 }]}>Create</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => this.handleSubmitEvent()}>
            <Text style={styles.headerText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {/* {this.state.avatarSource === null
            ?
            (
              <ImageBackground
                style={styles.backgroundImage}
                source={images['createVibeBackground']}>
                <View style={{ flex: 7 }} />
                <View style={styles.editButtonContainer}>
                  <Button
                    iconLeft
                    rounded
                    bordered
                    style={styles.photoUploadButton}
                    onPress={this.selectPhotoTapped.bind(this)}>
                    <Icon name="ios-camera" style={{ color: 'white' }} />
                    <Text style={{ color: 'white' }}>Edit</Text>
                  </Button>
                </View>
              </ImageBackground>
            )
            :
            (
              <ImageBackground
                style={styles.backgroundImage}
                source={this.state.avatarSource}>
                <View style={{ flex: 7 }} />
                <View style={styles.editButtonContainer}>
                  <Button
                    iconLeft
                    rounded
                    bordered
                    style={styles.photoUploadButton}
                    onPress={this.selectPhotoTapped.bind(this)}>
                    <Icon name="ios-camera" style={{ color: 'white' }} />
                    <Text style={{ color: 'white' }}>Edit</Text>
                  </Button>
                </View>
              </ImageBackground>
            )
          } */}

          <ImageBackground
            style={styles.backgroundImage}
            source={images['createVibeBackground']}>
            <View style={{ flex: 7 }} />
            <View style={styles.editButtonContainer}>
              <Button
                iconLeft
                rounded
                bordered
                style={styles.photoUploadButton}
                onPress={this.selectPhotoTapped.bind(this)}>
                <Icon name="ios-camera" style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>Edit</Text>
              </Button>
            </View>
          </ImageBackground>


          <ScrollView style={{marginTop:10}}>
            <View style={styles.formContainer}>
              <Item
                style={styles.fieldContainer}
                onPress={() => this.setState({ openVibePicker: true })}>
                <View style={styles.locationContainer}>
                  <Text style={styles.placeholderText}>{this.getVibeDescription()}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={styles.iconContainer}>
                  <Icon
                    style={styles.dropdownIcon}
                    type="MaterialIcons"
                    name="arrow-drop-down"
                  />
                </View>
              </Item>
              {this.state.openVibePicker && this.renderVibePicker()}

              {this.state.vibeType !== 'blog'
              && (
                <Item
                  style={styles.fieldContainer}
                  onPress={() => this.setState({ openLevelPicker: true })}>
                  <View style={styles.locationContainer}>
                    <Text style={styles.placeholderText}>{this.capitalize(this.state.forLevel)}</Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={styles.iconContainer}>
                    <Icon
                      style={styles.dropdownIcon}
                      type="MaterialIcons"
                      name="arrow-drop-down"
                    />
                  </View>
                </Item>
              )}
              {this.state.openLevelPicker && this.renderLevelPicker()}

              {(this.state.vibeType !== 'blog') && (this.state.forLevel == 'school')
              && (
                <Item
                  style={styles.fieldContainer}
                  onPress={() => this.setState({ openGroupPicker: true })}>
                  <View style={styles.locationContainer}>
                    <Text style={styles.placeholderText}>{this.capitalize(this.state.selectedGroup.name)}</Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={styles.iconContainer}>
                    <Icon
                      style={styles.dropdownIcon}
                      type="MaterialIcons"
                      name="arrow-drop-down"
                    />
                  </View>
                </Item>
              )}
              {this.state.openGroupPicker && this.renderGroupPicker()}

              <Item style={this.state.name ? styles.doubleFieldContainer : styles.fieldContainer}>
                <KeyboardAvoidingView style={styles.labelValueContainer}>
                  {!!this.state.name
                    && <Label style={styles.smallLabel}>{this.getNameDescription()}</Label>}
                  <TextInput
                    placeholder={this.getNameDescription()}
                    placeholderTextColor={Color.charcoalGrey}
                    style={styles.nameInput}
                    value={this.state.name}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ name: text })}
                  />
                </KeyboardAvoidingView>
              </Item>

              <Item style={styles.doubleFieldContainer}>
                {/* <Image source={(this.state.personImage == null) ? images['defaultRoundAvatar'] : this.state.personImage} style={styles.creatorPhoto} /> */}
                <Image source={images['defaultRoundAvatar']} style={styles.creatorPhoto} />
                <View style={styles.creatorInfo}>
                  <Text style={styles.placeholderText}>{this.state.personName}</Text>
                  <Text style={styles.creatorText}>
                    {((this.state.vibeType) == 'announcement') ? 'Creator' : (((this.state.vibeType) == 'event') ? 'Host' : 'Contributor' ) }
                  </Text>
                </View>
                <View style={{ flex: 1 }} />
                {((this.state.vibeType !== 'blog') && (this.state.forLevel == 'school') && (this.state.groupMember.length > 0))
                && (
                  <TouchableOpacity
                    onPress={() => this.setState({ openMemberPicker: true })}
                  >
                    <Icon
                      style={styles.dropdownIcon}
                      name="arrow-forward"
                    />
                  </TouchableOpacity>
                )}
              </Item>
              {this.state.openMemberPicker && this.renderMemberPicker()}

              {this.state.vibeType === 'event'
              && (
                <Item style={this.state.dateTimeStart ? styles.doubleFieldContainer : styles.fieldContainer}>
                  <View style={styles.labelValueContainer}>
                    {!!this.state.dateTimeStart
                      && <Label style={styles.smallLabel}>Start Date & Time</Label>}
                    <DatePicker
                      style={styles.datePicker}
                      placeholder="Start Date & Time"
                      date={this.state.dateTimeStart}
                      mode="datetime"
                      androidMode="spinner"
                      format="YYYY-MM-DD HH:mm"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          borderBottomWidth: 0
                        },
                        dateText: styles.placeholderText,
                        placeholderText: styles.placeholderText,
                        btnTextConfirm: { color: '#007AFF', fontWeight: '500' },
                        btnTextCancel: { color: '#007AFF', fontWeight: '500' },
                      }}
                      minuteInterval={10}
                      onDateChange={(datetime) => { this.setState({ dateTimeStart: datetime }); }}
                    />
                  </View>
                  <Icon
                    style={styles.dropdownIcon}
                    type="MaterialIcons"
                    name="arrow-drop-down"
                  />
                </Item>
              )}

              {this.state.vibeType === 'event'
              && (
                <Item style={this.state.dateTimeEnd ? styles.doubleFieldContainer : styles.fieldContainer}>
                  <View style={styles.labelValueContainer}>
                    {!!this.state.dateTimeEnd
                      && <Label style={styles.smallLabel}>End Date & Time</Label>}
                    <DatePicker
                      style={styles.datePicker}
                      placeholder="End Date & Time"
                      date={this.state.dateTimeEnd}
                      mode="datetime"
                      androidMode="spinner"
                      format="YYYY-MM-DD HH:mm"
                      confirmBtnText="Done"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                          dateInput: {
                            borderWidth: 0,
                            borderBottomWidth: 0,
                          },
                          dateText: styles.placeholderText,
                          placeholderText: styles.placeholderText,
                          btnTextConfirm: { color: '#007AFF', fontWeight: '500' },
                          btnTextCancel: { color: '#007AFF', fontWeight: '500' },
                        }}
                      minuteInterval={10}
                      onDateChange={(datetime) => { this.setState({ dateTimeEnd: datetime }); }}
                    />
                  </View>
                  <Icon
                    style={styles.dropdownIcon}
                    type="MaterialIcons"
                    name="arrow-drop-down"
                  />
                </Item>)}

              {this.state.vibeType === 'event'
              &&
              (
                <Item
                  style={this.state.address ? styles.doubleFieldContainer : styles.fieldContainer}
                  onPress={() => this.setState({ openLocationModal: true })}>
                  <View style={styles.labelValueContainer}>
                    {!!this.state.address
                    && <Label style={styles.smallLabel}>Event Location</Label>}
                    <View style={styles.locationContainer}>
                      <Text
                        style={styles.placeholderText}>
                        {this.state.address || 'Event Location'}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={styles.iconContainer}>
                    <Icon
                      style={styles.dropdownIcon}
                      type="MaterialIcons"
                      name="arrow-drop-down"
                    />
                  </View>
                  {this.state.openLocationModal && this.renderLocationModal()}
                </Item>
              )}

              <Item stackedLabel style={styles.boxFieldContainer}>
                <View style={styles.labelValueContainer}>
                  <View style={styles.labelContainer}>
                    <Label style={styles.label}>{this.getDetailsDescription()}</Label>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => this.setState({ openDetailsModal: true })}>
                    <View style={this.state.vibeType === 'blog' ? styles.urlBox : styles.detailsTextBox}>
                      <Text style={styles.detailsText}>{this.state.details}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {this.state.openDetailsModal && this.renderDetailsModal()}
              </Item>

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default FaqScreen;
