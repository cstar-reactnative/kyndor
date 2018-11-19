import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView,
  Switch, Platform, AppState, TextInput, Alert, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import colors from '@theme/colorsThree';
import CardMember from '../cards/cardMember';
import { CREATE_GROUP_URL, API_TOKEN, IMAGE_UPLOAD_URL } from '../helper/Constant';

class CreateChatGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      toggleSwitch: true,
      appState: AppState.currentState,
      groupName: '',
      description: '',
      isPrivateChat: true,
      chatPermission: 'private',
      selectedMember: [],
      selectedIdData: [],
      image: null,
      groupImage: null,
      uploadedImagePath: '',
    };
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
  }

  componentWillMount(){

  }

  componentDidMount() {
    if (this.props.selectedMember) {
      this.setState({ selectedMember: this.props.selectedMember,
        selectedIdData: this.props.selectedIdData,
        groupName: this.props.groupName,
        description: this.props.description,
        uploadedImagePath: this.props.uploadedImagePath,
        image: this.props.image});
    }
  }

  onChangeSwitch(){
    if (this.state.isPrivateChat) {
      this.setState({ isPrivateChat: false, chatPermission: 'public' });
    } else {
      this.setState({ isPrivateChat: true, chatPermission: 'private' });
    }
  }

  renderSelectedMemberList() {
        return this.state.selectedMember.map((item, index) =>
            <CardMember
              key={`index-${index}`}
              items={item}
              index={index}
            />
        );
  }

  openDialog(){
    ImagePicker.openPicker({
                  width: 200,
                  height: 200,
                  cropping: true,
                  includeBase64: true,
                  includeExif: true,
                }).then(image => {
                  this.setState({
                    image: { uri: `data:${image.mime};base64,${image.data}`,
                      width: image.width,
                      height: image.height },
                    groupImage: image.sourceURL
                  }, () => {
                    if (Platform.OS === 'ios') {
                      this.ImageUpload();
                    } else {
                      this.ImageUploadAndroid();
                    }

                  });
                }).catch(e => console.log(e));
  }

  ImageUpload(){
    console.log('IOS Success');
    const configure = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': API_TOKEN } };
    var data = new FormData();
    data.append('theFile', { uri: this.state.groupImage, name: 'user.png', type: 'image/png' });
    axios.post(IMAGE_UPLOAD_URL, data, configure)
    .then((response) => {
      if (response.data.success === true) {
        console.log('Image Upload response:', response.data.result);
        this.setState({ uploadedImagePath: response.data.result.theFile[0].filename })
      } else {
        console.log('Error:-', response.data.error);
      }
    })
    .catch((error) => {
      console.log(`Error:.. ${error.response.data}`);
      this.setState({ message: `${error}`, loading: false });
    });
  }

  ImageUploadAndroid(){
    console.log('Android Success');

    const API_URL = IMAGE_UPLOAD_URL

    const HEADERS = {
     'Content-Type': 'application/x-www-form-urlencoded',
     'x-access-token': API_TOKEN
    };

    fetch(API_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
          theFile: this.state.groupImage,
        }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Response:',responseJson);
    })
    .catch((error) => {
      console.log(error);
    });

     // var form = new FormData();
     // form.append("FormData", true)
     // form.append('theFile', this.state.groupImage)

     // fetch(API_URL, {body: form, mode: "FormData", method: "post", headers: {"Content-Type": "multipart/form-data", 'x-access-token': API_TOKEN}})
     //   .then((response) => console.log('Image Upload Response',response))
     //   .catch((error) => {
     //     console.log("ERROR " + error)
     //   })
     //   .then((responseData) => {
     //     console.log('Success', responseData)
     //   })
     //   .done();

       // let xhr = new XMLHttpRequest()
       //    xhr.open('post', API_URL)
       //    xhr.setRequestHeader('Content-type','multipart/form-data');
       //    xhr.setRequestHeader('x-access-token', API_TOKEN);
       //    xhr.send(form)
       //    xhr.onerror = function(e) {
       //      console.log('err', e)
       //    }
       //    xhr.onreadystatechange = function() {
       //      if(this.status == 200) {
       //        console.log('Response',this.response)
       //        console.log('Response',xhr.responseText)
       //      }
       //    }
  }

  // ImageUpload(){
  // console.log('Android Success');
  // var data = new FormData();
  // data.append('theFile', { uri: this.state.groupImage, name: 'user.png', type: 'image/png' });
  //
  // const config = {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'multipart/form-data;',
  //     'x-access-token': API_TOKEN
  //   },
  //   body: data,
  // }
  // var uploadurl = IMAGE_UPLOAD_URL;
  // fetch(uploadurl, config)
  //   .then((response) => response.text())
  //   .then((response) => {
  //     try {
  //       var responseData = JSON.parse(response);
  //       console.log('Image Upload response:', responseData.data.result);
  //       if (responseData.data.success === true) {
  //         this.setState({ uploadedImagePath: responseData.data.result.theFile[0].filename })
  //       }
  //       else {
  //         console.log('Error:-', responseData.data.error);
  //       }
  //     } catch (err) {
  //
  //     }
  //   })
  //   .catch(err => {
  //     Alert.alert(err);
  //   })
  // }

  onCreateGroup(){
    const configure = { headers: { 'Content-Type': 'application/json', 'x-access-token': API_TOKEN } };
    const data = JSON.stringify({
      icon: this.state.uploadedImagePath,
      description: this.state.description,
      access_type: this.state.chatPermission,
      group_id: '1730',
      channel_name: this.state.groupName,
      member: this.state.selectedIdData
    });
    console.log('PARMA-->>>', data);
    console.log('URL-->>>', CREATE_GROUP_URL);
    axios.post(CREATE_GROUP_URL, data, configure)
    .then((response) => {
      console.log('Response-->>>', response);
      if (response.data.success === true) {
        Actions.subgrouplist();
      } else {
        Alert.alert(response.data.error);
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.response.data}`);
      this.setState({ message: `${error}`, loading: false });
    });
  }

  render() {
    const { flex, header, buttonText, txtText, txtTextNormal, txtText_Bold, row } = styles;
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
      <View style={[header, Platform.OS === 'ios' ?
        { marginTop: 20, } : { marginTop: 0 }]}
        >
          <View>
            <Text style={buttonText}>Cancel</Text>
          </View>

          <View style={{ flex: 1 }} >
          <Text style={txtText_Bold}>Create Chat Group</Text>
          </View>

          <View>
          <Text onPress={() => this.onCreateGroup()} style={buttonText}>Done</Text>
          </View>
        </View>

        <View style={{ flex:1, marginLeft: 20, marginRight: 20}}>
        <View style={{ flexDirection: 'row', height: 50 }}>

            <View style={{ width: 60, marginTop: 20 }}>
              {
                this.state.image ?
                <View style={{ backgroundColor: '#c6c8d0',
                height: 50, width:50,
                alignItems: 'center', justifyContent:'center', borderRadius: 25, }}>
                <Image
                  source={this.state.image} style={styles.imageperson}
                  />
                </View>
                :
                <View style={{ backgroundColor: '#c6c8d0',
                height: 50, width:50,
                alignItems: 'center', justifyContent:'center', borderRadius: 25, }}>
                <Icon
                  type='Entypo'
                  name='camera'
                  style={{color: '#fff'}}
                  onPress={() => this.openDialog()}
                />
              </View>
              }
            </View>

            <View style={{ flex: 1, justifyContent: 'center'}}>
              <View style={{ borderBottomWidth: 1.5, marginTop: 5, borderColor: '#c6c8d0', marginTop: 40 }}>
                <TextInput
                  style={{ height: 40, width: '100%', marginLeft: 5, }}
                  placeholder="Chat Group Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={'rgba(0,0,0,0)'}
                  value={this.state.groupName}
                  onChangeText={(value) => this.setState({ groupName: value })}
                />
              </View>
            </View>
          </View>

            <View style={{ marginTop: 50}}>
              <Text style={ txtText }> Description </Text>
            </View>

            <View style={{ height: 120, marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={{ borderWidth: 1.5, marginTop: 5, borderRadius: 5, borderColor: '#c6c8d0' }}>
                    <TextInput
                      style={{ height: 120, marginLeft: 5, marginRight: 5 }}
                      autoCapitalize="none"
                      multiline
                      autoCorrect={false}
                      returnKeyType={'done'}
                      value={this.state.description}
                      onChangeText={(value) => this.setState({description:value})}
                    />
                  </View>
                </View>
              </View>

                <View>
                {
                  this.state.selectedMember.length > 0 ?
                  <View>
                    <View style={{ marginTop: 20 }}>
                    <Text style={txtText}>{'Group Members'} ({((this.state.selectedMember.length))})</Text>
                    </View>
                      <View style={{height: 90 }} >
                        <ScrollView horizontal={true}>
                        {this.renderSelectedMemberList()}
                        </ScrollView>
                      </View>
                  </View>
                  :
                  <View style={{ flexDirection: 'row', height: 50 }}>

                      <View style={{ flex: 1, justifyContent: 'center'}}>
                          <View style={{ marginTop: 5, marginTop: 40 }}>
                            <Text onPress={() => Actions.memberlist({ groupName: this.state.groupName,
                              description: this.state.description,
                              uploadedImagePath: this.state.uploadedImagePath, image: this.state.image})} style={txtTextNormal}> Add Members </Text>
                            <View style={{ height: 10}}/>
                          </View>
                      </View>

                        <View style={{ width: 60, marginTop: 20 }}>
                              <View style={{ height: 50, width:50,
                                alignItems: 'center', justifyContent:'center' }}>
                                  <Icon
                                    type='Entypo'
                                    name='chevron-small-right'
                                    style={{color: '#c6c8d0'}}
                                  />
                                </View>
                          </View>
                  </View>
                }
                </View>

                <View style={{ borderBottomWidth: 1.5, borderColor: '#c6c8d0', marginTop: 15 }}>
                </View>

                <View style={{ flexDirection: 'row', height: 50 }}>

                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <View style={{ marginTop: 5, marginTop: 40 }}>
                          <Text style={txtTextNormal}> Private Chat Group </Text>
                          <View style={{ height: 10}}/>
                        </View>
                    </View>

                      <View style={{ width: 60, marginTop: 20 }}>
                            <View style={{ height: 50, width:50,
                              alignItems: 'center', justifyContent:'center' }}>
                                 <Switch
                                 onValueChange={this.onChangeSwitch}
                                 value={this.state.isPrivateChat}
                                 onTintColor="#511fb2"
                                 />
                              </View>
                        </View>
                </View>

                <View style={{ borderBottomWidth: 1.5, borderColor: '#C6C8D0', marginTop: 15 }}>
                </View>


                <View style={{ marginTop: 20}}>
                  <Text style={ txtText }>Private chat group are visible only to parents that you have invited. Public chat group are visible to all parents in this school group. </Text>
                </View>

        </View>

     </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#511fb2'
  },
  row: {
    flexDirection: 'row'
  },
  buttonText: {
    margin: 18,
    color: '#FFFFFF',
    fontSize: 16,
  },
  txtText: {
    color: '#c6c8d0',
    fontSize: 15
  },
  txtTextNormal: {
    color: '#383e53',
    fontSize: 16
  },
  txtText_Bold: {
    textAlign: 'center',
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 18,
  },
  imageperson: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },

});

export default CreateChatGroup;
