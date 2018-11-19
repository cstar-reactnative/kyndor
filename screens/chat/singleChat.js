import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  AsyncStorage,
  StatusBar,
  FlatList,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
  TouchableOpacity
} from "react-native";

import {
  GiftedChat,
  Actions,
  Bubble,
  Avatar,
  Send
} from "react-native-gifted-chat";
import CheckBox from "react-native-check-box";
import { Dropdown } from "react-native-material-dropdown";
import ImagePicker from "react-native-image-crop-picker";
import CustomActions from "./CustomActions";
import colors from '@theme/colorsThree';
// import ChatImagePicker from "./ChatImagePicker";
// import CustomView from './CustomView';
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SocketIOClient from "socket.io-client";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import IsIphoneX from "@theme/IsIphoneX";
const BusyIndicator = require("react-native-busy-indicator");
const loaderHandler = require("react-native-busy-indicator/LoaderHandler");

// import Stores from "../../stores/";

import AppConfig from "../../config.js";
const url = AppConfig.apiLoc;
const imgCDN = AppConfig.imgLoc
const socketUrl = AppConfig.chatApiLoc;

const api = require("../../api/index");

class MemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.checked
    };
  }

  checkClick(newVal, uid) {
    this.setState({ isChecked: newVal });
    // alert(this.props.mainState.state.selectedMember.length)

    if (newVal) {
      if (this.props.mainState.state.selectedMember.length > 0) {
        if (this.props.mainState.state.selectedMember.indexOf(uid) == -1) {
          let data = this.props.mainState.state.selectedMember;
          data.push(uid);
          this.props.mainState.setState({ selectedMember: data });
        }
      } else {
        let data = this.props.mainState.state.selectedMember;
        data.push(uid);
        this.props.mainState.setState({ selectedMember: data });
      }
    } else {
      if (this.props.mainState.state.selectedMember.length > 0) {
        if (this.props.mainState.state.selectedMember.indexOf(uid) > -1) {
          let data = this.props.mainState.state.selectedMember;
          let pos = data.indexOf(uid);
          data.splice(pos, 1);
          this.props.mainState.setState({ selectedMember: data });
        }
      }
    }
  }

  componentWillMount() {}

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <View style={{ flex: 2 }}>
          <Image style={{ height: 45, width: 45 }} source={this.props.avatar} />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 8,
            justifyContent: "flex-start",
            borderBottomWidth: 1,
            borderBottomColor: "#e9e9e9"
          }}
        >
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Text
              style={{ fontFamily: "System", color: "#393939", fontSize: 15 }}
            >
              {this.props.name}
            </Text>
            <Text style={{ fontFamily: "System" }}>Moderator</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <CheckBox
              style={{ padding: 10 }}
              onClick={() =>
                this.checkClick(!this.state.isChecked, this.props.uid)
              }
              isChecked={this.state.isChecked}
              checkBoxColor={"#bf6cff"}
            />
          </View>
        </View>
      </View>
    );
  }
}

class MemberViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  checkChecked(uid) {
    var channelMember = this.props.mainState.state.selectedMember;
    if (channelMember.indexOf(uid) == -1) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    if (this.props.mainState.state.groupMember.length > 0) {
      return (
        <FlatList
          data={this.props.mainState.state.groupMember}
          renderItem={({ item }) => {
            return (
              <MemberView
                avatar={require("../../images/unnamed.png")}
                name={item.name}
                uid={item.user_id}
                mainState={this.props.mainState}
                checked={this.checkChecked(item.user_id)}
              />
            );
          }}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
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
}

const uiTheme = {
  fontFamily: "System",
  toolbar: {
    container: {
      paddingTop: Platform.OS === "ios" ? (IsIphoneX() ? 45 : 20) : 0,
      height: IsIphoneX() ? 80 : 60,
      backgroundColor: colors.indigoBlue,
    },
    titleText: {
      color: Platform.OS === "ios" ? "black" : "white"
    },
    centerElementContainer: {
      alignItems: Platform.OS === "ios" ? "center" : "flex-start",
      marginLeft: Platform.OS === "ios" ? 0 : 5
    }
  }
};

if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: "ReactNative" } });
}

export default class SingleChat extends React.Component {
  static navigationOptions = {
    title: "Chat",
    header: null
  };
  constructor(props) {
    super(props);
    let socketOptions = { transports: ["websocket"], forceNew: true };
    this.socket = SocketIOClient(socketUrl, socketOptions);

    this.state = {
      messages: [],
      loadEarlier: false,
      typingText: null,
      isLoadingEarlier: false,
      channelId: 0,
      groupId: 0,
      userId: 0,
      isGroup: false,
      oldMessages: [],
      myId: 0,
      isNew: false,
      chatHead: "Chat",
      modalVisible: false,
      selectedMember: [],
      channelMembers: [],
      groupMember: [],
      rightElement: {},
      titleLine1: "--",
      titleLine2: "--",
      comment: "",
      isComenting: false,
      commentingMsg: {},
      myName: "",
      actionPressed: "",
      isImagePickerVisible: false
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);

    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this.onLongPress = this.onLongPress.bind(this);
    this._isAlright = null;
    this.inputRef = null;
    this.action = null;
  }

  onLongPress() {
    console.log("on long press");
    // if (this.props.onLongPress) {
    //   this.props.onLongPress(this.context);
    // } else if (this.props.currentMessage.text) {
    // const options = [
    //   'Copy Message',
    //   'Edit Message',
    //   'Delete Message',
    //   'Cancel',
    // ];
    // const cancelButtonIndex = options.length - 1;
    // this.context.actionSheet().showActionSheetWithOptions(
    //   { options, cancelButtonIndex },
    //   (buttonIndex) => {
    //     if (buttonIndex === 0) {
    //       Clipboard.setString(this.props.currentMessage.text);
    //     }
    //   });
    // }
  }

  updateSelectedMembers() {
    let cMem = this.state.channelMembers;
    let sMem = [];
    cMem.forEach((item, index) => {
      sMem.push(item.user_id);
    });
    this.setState({ selectedMember: sMem });
  }

  getChannelParticipants() {
    AsyncStorage.getItem("@KyndorStore:token", (err, tokenItem) => {
      if (err) {
        alert(err);
      } else {
        api.getChannelMember(
          { cid: this.state.channelId, token: tokenItem },
          (e, r) => {
            if (e) {
              alert("Error: " + e);
            } else {
              if (r.success == true) {
                // console.log('Channel Participants: '+JSON.stringify(r.result.participants))
                console.log("Total Members: " + r.result.participants.length);
                this.setState({ channelMembers: r.result.participants });
                this.updateSelectedMembers();
              } else {
                alert("get group chat members: Connection Failed!");
              }
            }
          }
        );
      }
    });
  }

  getGroupMembers() {
    AsyncStorage.getItem("@KyndorStore:token", (err, tokenItem) => {
      if (err) {
        alert(err);
      } else {
        api.getGroupParticipants(
          { group_id: this.state.groupId, token: tokenItem },
          (e, r) => {
            if (e) {
              alert("Error: " + e);
            } else {
              if (r.success == true) {
                this.setState({ groupMember: r.result.participants });
              } else {
                console.log("getGroupMembers: Connection Failed!");
              }
            }
          }
        );
        this.getChannelParticipants();
      }
    });
  }

  messageObj = item => {
    const key = item.message.indexOf(url + "files/") == 0 ? "image" : "text";
    return {
      _id: item._id,
      [key]: item.message,
      createdAt: item.sentOn,
      roomId: item.roomId,
      abuse: item.abuse,
      comments: item.comments,
      likes: item.likes,
      sentToId: item.sentToId,
      messageType: item.messageType,
      user: {
        _id: item.sentById,
        name: item.sentByName
      }
    };
  };

  socketConnect() {
    console.log("@ socketConnect @");
    let { params } = this.props.navigation.state;
    let isGroup = params ? params.isGroup : false;
    this.setState({ isGroup: isGroup });

    if (isGroup) {
      let groupId = params ? params.groupId : 0;
      this.setState({
        groupId: groupId,
        titleLine1: params.channelName,
        titleLine2: params.groupName,
        rightElement: {}
      });
      this.getGroupMembers();

      let channelId = params ? params.channelId : 0;
      this.setState({ channelId: channelId });
    } else {
      let userId = params ? params.userId : 0;
      this.setState({
        userId: userId,
        titleLine1: params.userName,
        titleLine2: "User"
      });
    }

    AsyncStorage.getItem("@KyndorStore:myData", (err, myData) => {
      let data = JSON.parse(myData);
      let myId = data.user_id;
      let myName = data.name;
      if (!err) {
        this.setState({ myId, myName });
      }
    });

    console.log("will connect to socket ...");
    AsyncStorage.getItem("@KyndorStore:token", (err, token) => {
      var thisComponent = this;
      this.socket.on("connect", () => {
        console.log("connecting ...");
        var data = {
          sentToId: this.state.isGroup
            ? this.state.channelId
            : this.state.userId,
          authToken: token,
          group: this.state.isGroup
        };

        this.socket.emit("joinRoom", data, function(d) {
          if (d.success) {
            // console.log("Socket -> connected!");
            // if (d.chat.length == 0) {
            //   thisComponent.setState({ isNew: true });
            // }
            // else {
            //   if(thisComponent.state.messages.length == 0){
            //     console.log('all messages:')
            //     for(var i=0;i<d.chat.length;i++){
            //       console.log(d.chat[i])
            //       var item = JSON.parse(d.chat[i]);
            //       let addThis = {}
            //       if(item.content){
            //         if(item.content == 'text'){
            //           addThis = {
            //             _id: Math.round(Math.random() * 1000000),
            //             text: item.message,
            //             // text: JSON.stringify(item),
            //             createdAt: new Date(item.sentOn),
            //             user:{
            //               _id: item.sentById,
            //               name: item.sentByName,
            //             }
            //           }
            //         }
            //         else if(item.content == 'image'){
            //           addThis = {
            //             _id: Math.round(Math.random() * 1000000),
            //             image: imgCDN+item.message,
            //             createdAt: new Date(item.sentOn),
            //             user:{
            //               _id: item.sentById,
            //               name: item.sentByName,
            //             }
            //           }
            //         }
            //       }
            //       else{
            //         addThis = {
            //           _id: Math.round(Math.random() * 1000000),
            //           text: item.message,
            //           // text: JSON.stringify(item),
            //           createdAt: new Date(item.sentOn),
            //           user:{
            //             _id: item.sentById,
            //             name: item.sentByName,
            //           }
            //         }
            //       }
            //
            //       thisComponent.setState((previousState) => {
            //         return {
            //           messages: GiftedChat.append(previousState.messages, addThis),
            //         };
            //       });
            //     }
            //
            //   }
            // }
            console.log("Socket -> connected!");
						if (d.chat.length == 0) {
							thisComponent.setState({ isNew: true });
						} else {
							if (thisComponent.state.messages.length == 0) {
								const messages = [];
								for (var i = 0; i < d.chat.length; i++) {
									var item = JSON.parse(d.chat[i]);
									messages.unshift(thisComponent.messageObj(item));
								}
								thisComponent.setState({ messages });
							}
						}
          }
          else {
            console.log("Error connecting to Socket");
          }
        });
      });

      this.socket.on("message", function(data) {
        // alert(data.val)
        // thisComponent.onReceive(data.messageText)
        thisComponent.onReceive(data);
      });
      this.socket.on("engage", function(data) {
        thisComponent.onUserEngage(data);
      });
      this.socket.on("modify", function(data) {
        thisComponent.onModify(data);
      });
    });
  }

  onModify(msg) {
    console.log("modify", msg);
    const newMessages = this.state.messages.filter(
      (item, idx) => item._id !== msg.message_id
    );
    console.log("new messages", newMessages);
    this.setState({ messages: newMessages });
  }

  onReceive(msg) {
    const message = this.messageObj(msg);
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, message)
      };
    });
  }

  isEmpty(obj) {
    for (const key in obj) {
      return false;
    }
    return true;
  }

  onUserEngage = data => {
    console.log("data", data);
    let msg = {};
    this.state.messages.forEach(val => {
      if (val._id === data.root_message_id) {
        msg = { ...val };
      }
    });

    if (this.isEmpty(msg)) {
      return;
    }

    console.log("my msg", msg);
    if (data.engagementType === "report") {
      let reportObj = {
        _id: data.root_message_id,
        abuseType: data.value
      };
      msg.abuse.push(reportObj);
      const newMessages = this.state.messages.map(item => {
        if (item._id === msg._id) {
          return msg;
        }
        return item;
      });
      this.setState({ messages: newMessages });
    }

    if (data.engagementType === "react") {
      let likeObj = {
        _id: data.root_message_id,
        reaction: data.value
      };
      msg.likes.push(likeObj);
      const newMessages = this.state.messages.map(item => {
        if (item._id === msg._id) {
          return msg;
        }
        return item;
      });
      this.setState({ messages: newMessages });
    }

    if (data.engagementType === "unlike") {
			const unlike = msg.likes.filter(val => val.by !== this.state.myId);
			msg.likes = unlike;
			const newMessages = this.state.messages.map(item => {
				if (item._id === msg._id) {
					return msg;
				}
				return item;
			});
			this.setState({ messages: newMessages });
		}
  };

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        // for old message
        // messages: require('./data/messages.js'),
        messages: this.state.oldMessages
      };
    });
  }

  loginAPI = () => {
    const email = this.props.navigation.state.params.email;
    const password = "password1";

    api.login({ email, password }, (e, r) => {
      if (e) {
        Alert.alert("Error: in login " + e);
        console.log("Login ...", e);
      } else {
        if (r.success == true) {
          console.log("Login ...", r);
          //  this.setState({newemail:r.result.user.email});
          //  this.setState({newpassword:r.result.user.password});
          // alert(r.result.user.user_id)
          // console.log(JSON.stringify(r));
          console.log(r.result.user.user_type);

          try {
            AsyncStorage.setItem("@KyndorStore:token", r.result.token);
            AsyncStorage.setItem("@KyndorStore:myName", r.result.user.name);
            AsyncStorage.setItem("@KyndorStore:myEmail", r.result.user.email);
            AsyncStorage.setItem(
              "@KyndorStore:userType",
              r.result.user.user_type
            );
            AsyncStorage.setItem(
              "@KyndorStore:myId",
              r.result.user.user_id.toString()
            );
            AsyncStorage.setItem(
              "@KyndorStore:myData",
              JSON.stringify(r.result.user)
            );

            if (r.result.user.profile_pic == null) {
              AsyncStorage.setItem("@KyndorStore:myImage", "no-image.png");
            } else {
              AsyncStorage.setItem(
                "@KyndorStore:myImage",
                r.result.user.profile_pic
              );
            }

            if (r.result.user.user_type == "user") {
              // Stores.rootNavStore.setData("HomeNavRouter");
            } else if (r.result.user.user_type == "group_owner") {
              // Stores.rootNavStore.setData("GroupCreatorRouter");
            }
          } catch (error) {
            alert("Please try again. Internal Error: ", error);
          }
        } else {
          alert(r.error);
        }
      }
    });
  };

  componentDidMount() {
    // this.loginAPI();
    this.socketConnect();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require("./data/old_messages.js")
            ),
            loadEarlier: false,
            isLoadingEarlier: false
          };
        });
      }
    }, 1000); // simulating network
  }

  addConnection() {
    console.log("adding connection.");
    AsyncStorage.getItem("@KyndorStore:token", (err, item) => {
      if (err) {
        console.log(err);
      } else {
        api.addConncetion({
          token: item,
          p1: this.state.userId,
          p2: this.state.myId
        });
      }
    });
  }

  onSend(messages = []) {
    var thisElement = this;
    // alert(JSON.stringify(messages))
    // alert(this.state.messages.length + ' : ' + this.state.isGroup + ' : ' + this.state.isNew)
    if (
      this.state.messages.length == 0 &&
      !this.state.isGroup &&
      this.state.isNew
    ) {
      this.addConnection();
    }

    if (thisElement.state.isComenting) {
      // thisElement.onSendComment(
      //   thisElement.state.commentingMsg,
      //   thisElement.state.comment
      // );
      return;
    }

    if (messages[0].image) {
      console.log("yes images");
      console.log(JSON.stringify(messages));
      AsyncStorage.getItem("@KyndorStore:token", (err, tokenItem) => {
        if (err) {
          alert(err);
        } else {
          loaderHandler.showLoader("Uploading...");

          const imageData = {
            ...messages[0],
            filename: `IMG_${messages[0]._id}`
          };
          api.uploadFile(
            // { fileData: imageData, token: tokenItem },
            { fileData: messages[0], token: tokenItem },
            (e, res) => {
              loaderHandler.hideLoader();
              if (e) {
                console.log("line 636: Error: " + JSON.stringify(e));
              } else {
                console.log("line 638: upload success: " + res);
                let r = JSON.parse(res);
                if (r.success == true) {
                  var data = {
                    sentToId: thisElement.state.isGroup
                      ? thisElement.state.channelId
                      : thisElement.state.userId,
                    sentToName: "tommy",
                    messageType: thisElement.state.isGroup
                      ? "group"
                      : "one2one",
                    message:r.result.theFile[0].filename,
                    content:'image',
                    authToken: tokenItem
                  };

                  thisElement.socket.emit("message", data, function(d) {
                    console.log("Emit message: " + JSON.stringify(d));
                  });

                  thisElement.setState(previousState => {
                    return {
                      messages: GiftedChat.append(
                        previousState.messages,
                        messages
                      )
                    };
                  });
                }
                else {
                  console.log("Connection Failed! Please try again.");
                }
              }
            }
          );
        }
      });
    } else {
      // add message to chat screen
      AsyncStorage.getItem("@KyndorStore:token", (err, authToken) => {
        var data = {
          sentToId: this.state.isGroup
            ? this.state.channelId
            : this.state.userId,
          sentToName: "tommy",
          messageType: this.state.isGroup ? "group" : "one2one",
          message: messages[0].text,
          authToken: authToken
        };

        this.socket.emit("message", data, d => {
          console.log("ddddd", d);
        });
        const newMsg = [{ ...messages[0], abuse: [], likes: [], comments: [] }];

        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, newMsg)
          };
        });
      });
    }
    // this.inputRef.blur();
  }

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      );
    }
    return null;
  }

  // handleNamePress(name) {
  //   Alert.alert(`Hello ${name}`);
  // }

  handlePhonePress(phone) {
    Alert.alert(`Do you want to call \n${phone}`);
  }

  handleEmailPress(email) {
    Alert.alert(`send email to ${email}`);
  }

  handleMentionPress(mention) {
    Alert.alert(`Mentioned person ${mention}`);
  }

  renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  cancelModal() {
    this.setState({
      modalVisible: false
    });
    this.updateSelectedMembers();
  }

  saveMembersModal() {
    // show loading
    this.setState({ modalVisible: false });
    loaderHandler.showLoader("Updating ...");
    var newMembers = this.state.selectedMember;
    var oldMembers = [];
    this.state.channelMembers.forEach((item, index) => {
      oldMembers.push(item.user_id);
    });

    console.log("oldMembers");
    console.log(oldMembers);
    console.log("newMembers");
    console.log(newMembers);

    // save
    AsyncStorage.getItem("@KyndorStore:token", (err, tokenItem) => {
      if (err) {
        alert(err);
      } else {
        var removeMembers = [];
        var addMembers = [];

        // find remove item
        oldMembers.forEach((item, index) => {
          if (newMembers.indexOf(item) == -1) {
            removeMembers.push(item);
          }
        });
        console.log("Remove members: " + removeMembers);

        // find add item
        newMembers.forEach((item, index) => {
          if (oldMembers.indexOf(item) == -1) {
            addMembers.push(item);
          }
        });
        console.log("Add members: " + addMembers);

        api.editChannelMembers(
          {
            cid: this.state.channelId,
            add: addMembers,
            remove: removeMembers,
            token: tokenItem
          },
          (e, r) => {
            if (e) {
              loaderHandler.hideLoader();
              alert("Error: " + e);
            } else {
              if (r.success == true) {
                loaderHandler.hideLoader();
                this.getChannelParticipants();
              } else {
                loaderHandler.hideLoader();
                alert("get group chat members: Connection Failed!");
              }
            }
          }
        );
      }
    });
  }

  deleteMessage = msgiD => {
    let msg = {};
    this.state.messages.forEach(val => {
      if (val._id === msgiD) {
        msg = { ...val };
      }
    });
    console.log("edit this msg", msg);

    AsyncStorage.getItem("@KyndorStore:token", (err, authToken) => {
      var data = {
        authToken: authToken,
        sentToId: msg.sentToId,
        messageType: msg.messageType,
        message: msg.text || msg.image,
        message_id: msg._id,
        delete: true
      };
      console.log("data", data);
      this.socket.emit("modify", data, function(d) {
        console.log("emit modify", JSON.stringify(d));
      });
    })
      .then(() => {
        const newMessages = this.state.messages.filter(
          (item, idx) => item._id !== msgiD
        );
        console.log("new messages", newMessages);
        this.setState({ messages: newMessages });
      })
      .catch(e => Alert.alert("Something went wrong"));
  };

  onReportMsg = msgId => {
    let msg = {};
    const reportObj = {
      abuseType: "report",
      by: this.state.myId,
      byName: this.state.myName,
      reportedOn: `${new Date()}`,
      _id: msgId
    };
    this.state.messages.forEach(val => {
      if (val._id === msgId) {
        msg = { ...val };
      }
    });
    const isMeAgain = msg.abuse.some(val => val.by === this.state.myId);
    if (isMeAgain) {
      Alert.alert("You have already reported");
      return;
    }
    AsyncStorage.getItem("@KyndorStore:token", (err, authToken) => {
      var data = {
        authToken: authToken,
        engagementType: "report",
        messageType: this.state.isGroup ? "group" : "one2one",
        root_message_id: msgId,
        roomId: msg.roomId,
        value: "report"
      };
      this.socket.emit("engage", data, d => {
        console.log(JSON.stringify(d));
        if (d.success) {
          msg.abuse.push(reportObj);
          const newMessages = this.state.messages.map((item, idx) => {
            if (item._id === msg._id) {
              return msg;
            }
            return item;
          });
          this.setState({ messages: newMessages });
        }
      });
    });
  };

  onLikeMsg = msgId => {
		let msg = {};
		const likeObj = {
			by: this.state.myId,
			likedByName: this.state.myName,
			reaction: "like",
			_id: msgId
		};
		this.state.messages.forEach(val => {
			if (val._id === msgId) {
				msg = { ...val };
			}
		});

		const isMeAgain = msg.likes.some(val => val.by === this.state.myId);
		if (isMeAgain) {
			AsyncStorage.getItem("@KyndorStore:token", (err, authToken) => {
				const data = {
					authToken: authToken,
					engagementType: "unlike",
					messageType: this.state.isGroup ? "group" : "one2one",
					root_message_id: msgId,
					roomId: msg.roomId,
					value: "unlike"
				};

				this.socket.emit("engage", data, d => {
					console.log(JSON.stringify(d));
				});
			})
				.then(() => {
					const unlike = msg.likes.filter(val => val.by !== this.state.myId);
					msg.likes = unlike;
					const newMessages = this.state.messages.map(item => {
						if (item._id === msg._id) {
							return msg;
						}
						return item;
					});
					this.setState({ messages: newMessages });
					console.log(newMessages);
				})
				.catch(e => {
					Alert.alert("Something went wrong.  ");
					console.log("error dislike: ", e);
				});
			return;
		}

		console.log("jkhkhkjhkjg");
		AsyncStorage.getItem("@KyndorStore:token", (err, authToken) => {
			const data = {
				authToken: authToken,
				engagementType: "react",
				messageType: this.state.isGroup ? "group" : "one2one",
				root_message_id: msgId,
				roomId: msg.roomId,
				value: "like"
			};

			this.socket.emit("engage", data, d => {
				console.log(JSON.stringify(d));
				if (d.success) {
					msg.likes.push(likeObj);
					const newMessages = this.state.messages.map(item => {
						if (item._id === msg._id) {
							return msg;
						}
						return item;
					});
					this.setState({ messages: newMessages });
				}
			});
		});
	};

  addComment = msgId => {
    let msg = {};
    this.state.messages.map((val, key) => {
      if (val._id === msgId) {
        msg = val;
      }
    });
    console.log("commenting");
    // this.inputRef.focus();
    // let isComenting = true;
    // this.setState({ isComenting, commentingMsg: msg });
  };

  onSendComment(msg, comment) {
    AsyncStorage.getItem("@KyndorStore:token", (err, authToken) => {
      var data = {
        authToken: authToken,
        engagementType: "comments",
        messageType: "group",
        root_message_id: msg._id,
        roomId: msg.roomId,
        value: comment
      };

      this.socket.emit("engage", data, function(d) {
        console.log(JSON.stringify(d));
      });
    })
      .then(() => {
        this.inputRef.blur();
        let isComenting = false;
        this.setState({ isComenting, commentingMsg: {}, comment: "" });
      })
      .catch(err => {
        alert("Error sending comment", err);
        this.inputRef.blur();
        let isComenting = false;
        this.setState({ isComenting, commentingMsg: {}, comment: "" });
      });
  }

  renderCustomActions(props) {
    return <CustomActions {...props} />;
  }

  renderGiftedChat = () => {
    let placeHldr = this.state.isComenting
      ? "Write a comment"
      : "Type message here";
    return (
      <GiftedChat
        messages={this.state.messages}
        placeholder={placeHldr}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        onInputTextChanged={comment => this.setState({ comment })}
        user={{
          _id: this.state.myId, // sent messages should have same user._id
          name: this.state.myName
        }}
        renderAvatarOnTop={true}
        bottomOffset={40}
        renderActions={this.renderCustomActions}
        // renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
        // onAddComment={this.addComment}
        onLike={this.onLikeMsg}
        onReport={this.onReportMsg}
        onDelete={this.deleteMessage}
        inputRef={input => (this.inputRef = input)}
        onPressAvatar={user => {
          console.log("user clicked");
          console.log(user);
          this.props.navigation.navigate("SingleChat", {
            userId: user._id,
            userName: user.name,
            isGroup: false
          });
        }}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: "#951dfe" },
            onPress: props => alert(`press on ${props}`)
          },
          {
            pattern: /\[(@[^:]+):([^\]]+)\]/i,
            style: styles.username,
            onPress: this.handleNamePress,
            renderText: this.renderText
          },
          // {
          //   pattern: /@(\w+)/,
          //   style: styles.mention,
          //   onPress: this.handleMentionPress
          // },
          {
            type: "phone",
            style: styles.phone,
            onPress: this.handlePhonePress
          },
          {
            type: "email",
            style: styles.email,
            onPress: this.handleEmailPress
          }
        ]}
      />
    );
  };

  renderModal = () => {
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
        visible={this.state.modalVisible}
      >
        <View style={styles.modalNav}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <TouchableOpacity
            // style={{flex:2}}
            onPress={() => {
              this.cancelModal();
            }}
          >
            {Platform.OS === "ios" ? (
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  fontFamily: "System",
                  color: "#fff"
                }}
              >
                Cancel
              </Text>
            ) : (
              <MaterialIcons
                name="close"
                size={22}
                style={{ color: "white" }}
              />
            )}
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "System",
              marginLeft: 10,
              color: "white",
              fontSize: 20
            }}
          >
            Group Members
          </Text>

          <TouchableOpacity
            // style={{flex:2, right:0, marginLeft:0}}
            onPress={() => {
              this.saveMembersModal();
            }}
          >
            {Platform.OS === "ios" ? (
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  fontStyle: "normal",
                  fontFamily: "System",
                  color: "#fff",
                  paddingRight: 15
                }}
              >
                Done
              </Text>
            ) : (
              <MaterialIcons
                name="check"
                size={22}
                style={{ color: "white", paddingRight: 15 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ padding: 20, paddingTop: 10, marginBottom: 40 }}>
          <MemberViewScreen mainState={this} />
        </View>
      </Modal>
    );
  };

  renderToolbar = data => {
    return (
      <Toolbar
        leftElement={
          <TouchableOpacity
            style={{ justifyContent: "flex-start" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name={Platform.OS === "ios" ? "chevron-left" : "arrow-back"}
                size={Platform.OS === "ios" ? 40 : 25}
                color="#fff"
              />
              {Platform.OS === "ios" ? (
                <Text
                  style={{
                    fontFamily: "System",
                    color: "#fff",
                    textAlign: "left",
                    marginLeft: -10
                  }}
                >
                  Back{" "}
                </Text>
              ) : (
                <Text />
              )}
            </View>
          </TouchableOpacity>
        }
        //onLeftElementPress={() => this.props.navigation.goBack()}
        // centerElement={this.state.chatHead}
        centerElement={
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "System",
                color: "white",
                fontSize: 18
              }}
            >
              {this.state.titleLine1}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "System",
                color: "white",
                fontSize: 11,
                alignSelf: Platform.OS === "ios" ? "center" : "flex-start"
              }}
            >
              {this.state.titleLine2}
            </Text>
          </View>
        }
        // rightElement={this.state.rightElement}
        // onRightElementPress={
        //   (rightElem) => {
        //     switch (rightElem.index) {
        //       case 0:
        //       // alert('Channel info clicked');
        //       this.props.navigation.navigate('ChannelInfo',{cid:this.state.channelId,members:this.state.channelMembers});
        //       break;
        //       case 1:
        //       // alert('Invite members clicked');
        //       this.setState({
        //         modalVisible: true,
        //       })
        //       this.updateSelectedMembers()
        //       break;
        //       default:
        //       break;
        //     }
        //   }
        // }

        rightElement={
          <Dropdown
            //label='Favorite Fruit'
            data={data}
            visible={this.state.isGroup}
            onChangeText={text => {
              console.log(text);
              if (text == 1) {
                this.props.navigation.navigate("ChannelInfo", {
                  cid: this.state.channelId,
                  members: this.state.channelMembers
                });
              }
              if (text == 2) {
                let thisELem = this;
                setTimeout(function() {
                  thisELem.setState({
                    modalVisible: true
                  });
                  thisELem.updateSelectedMembers();
                }, 500);
              }
            }}
            renderBase={() =>
              Platform.OS === "ios" ? (
                <Ionicons
                  name="ios-more"
                  color="#fff"
                  size={34}
                  style={{
                    //paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    display: this.state.isGroup ? "flex" : "none"
                  }}
                />
              ) : (
                <MaterialIcons
                  name="more-vert"
                  color="#fff"
                  size={24}
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    display: this.state.isGroup ? "flex" : "none"
                  }}
                />
              )
            }
            rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
            containerStyle={{ width: 40, height: 40 }}
            dropdownPosition={1}
            itemColor="rgba(0, 0, 0, .87)"
            pickerStyle={{
              width: 140,
              left: null,
              right: 0,
              marginRight: 8,
              marginTop: 24
            }}
          />
        }

        // searchable={{
        //   autoFocus: true,
        //   placeholder: 'Search',
        // }}
      />
    );
  };

  render() {
    console.log("state", this.state);
    const data = [
      { value: "1", label: "Chat group info" },
      { value: "2", label: "Invite Members" }
    ];
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          {this.renderModal()}

          {this.renderToolbar(data)}

          {this.renderGiftedChat()}
        </View>
        <BusyIndicator style={{ zIndex: 99 }} />
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontFamily: "System",
    fontSize: 14,
    color: "#aaa"
  },
  username: {
    fontFamily: "System",
    color: "green",
    fontWeight: "bold"
  },
  phone: {
    color: "blue",
    textDecorationLine: "underline"
  },
  email: {
    textDecorationLine: "underline"
  },
  mention: {
    color: "#951dfe",
    backgroundColor: "#efecd9",
    borderRadius: 5
  },
  modalNav: {
    alignItems: "center",
    //justifyContent: (Platform.OS === 'ios') ?'space-between':'flex-start',
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? (IsIphoneX() ? 50 : 30) : 15,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: "row",
    backgroundColor: colors.indigoBlue,
    //maxHeight: 60
  },
  modalFab: {
    backgroundColor: colors.indigoBlue,
    height: 50,
    width: 50,
    borderRadius: 50,
    padding: 14,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 5,
    elevation: 3,
    overflow: "hidden"
  },
  titleCenterText: {
    // flex:7,
    // marginLeft:(Platform.OS==='ios')?40:5
  }
});
