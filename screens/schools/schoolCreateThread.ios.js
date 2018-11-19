import React, { Component } from "react";
import { TextField } from "react-native-material-textfield";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons"
import { TabNavigator, createStackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image,
  AsyncStorage,
  ImageBackground,
  Platform,
  Switch,
  Modal,
  FlatList,
  Alert
} from "react-native";
import CheckBox from 'react-native-check-box';
import Stores from '../../stores/';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');

class MemberView extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false
    }
  }

  checkClick(newVal, uid){
    this.setState({isChecked: newVal})
    // alert(this.props.mainState.state.selectedMember.length)

    if(newVal){
      if(this.props.mainState.state.selectedMember.length > 0){
        if(this.props.mainState.state.selectedMember.indexOf(uid) == -1) {
          let data = this.props.mainState.state.selectedMember
          data.push(uid)
          this.props.mainState.setState({selectedMember: data})
        }
      }
      else{
        let data = this.props.mainState.state.selectedMember
        data.push(uid)
        this.props.mainState.setState({selectedMember: data})
      }
    }
    else{
      if(this.props.mainState.state.selectedMember.length > 0){
        if(this.props.mainState.state.selectedMember.indexOf(uid) > -1) {
          let data = this.props.mainState.state.selectedMember
          let pos = data.indexOf(uid)
          data.splice(pos, 1)
          this.props.mainState.setState({selectedMember: data})
        }
      }
    }
  }

  componentWillMount(){
    if(this.props.mainState.state.selectedMember.length > 0){
      if(this.props.mainState.state.selectedMember.indexOf(this.props.uid) != -1){
        this.setState({isChecked:true})
      }
    }
  }

  render(){
    return(
      <View style={{flexDirection:'row',justifyContent:'center',paddingTop:10,paddingBottom:10}}>
        <View style={{flex:2}}>
          <Image style={{height:45,width:45}} source={this.props.avatar}/>
        </View>
        <View style={{flexDirection:'row',flex:8,justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#e9e9e9'}}>
          <View style={{flex:3,justifyContent:'center',flexDirection:'column'}}>
            <Text style={{fontFamily: 'System',color:'#393939',fontSize:15}}>{this.props.name}</Text>
            <Text style={{fontFamily: 'System',}}>Moderator</Text>
          </View>
          <View style={{justifyContent:'center'}}>
            <CheckBox
              style={{padding: 10}}
              onClick={()=>this.checkClick(!this.state.isChecked, this.props.uid)}
              isChecked={this.state.isChecked}
              checkBoxColor = {'#bf6cff'}
            />
          </View>
        </View>
      </View>
    )
  }
}

class MemberViewScreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false
    }
  }

  render(){
    if(this.props.mainState.state.groupMember.length > 0){
      return(
        <FlatList
          data={this.props.mainState.state.groupMember}
          renderItem={
            ({item}) => {
              return(
                <MemberView avatar={require('../../images/no-image.png')} name={item.name} uid={item.user_id} mainState={this.props.mainState}/>
              )
            }
          }
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      )
    }
    else{
      return(
        <View>
          <Text style={{fontFamily: 'System',}}>No members!</Text>
        </View>
      )
    }
  }
}

export default class CreatThread extends React.Component {
  constructor() {
      super();
      this.state = {
         toggled: false,
         toggleText: 'Public',
         desc: '',
         name: '',
         img: 'no-icon.png',
         modalVisible: false,
         selectedMember: [],
         groupMember: []
      }
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
   }

  static navigationOptions = {
    title: "Create Chat group",
    header: null
  };

  randomColor() {
    let color = '';
    if (this.state.toggled) {
      color = '#9513fe';
    }
    else{
      color = '#a9a9a9';
    }
    return color;
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  createChannel(){
    if((this.state.desc.length > 0) && (this.state.name.length > 0)){
      let groupData = Stores.groupStore.getData()
      let groupId = groupData.group_id
      let access = 'public'

      if(this.state.toggled){
        access = 'private'
      }

      AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
        if(err){
          alert(err)
        }
        else{
          api.createChannel({token:item, icon:this.state.img, desc:this.state.desc, access:access, gid:groupId, c_name:this.state.name, member:this.state.selectedMember}, (e, r) => {
            if(e){
              alert("Error: "+e);
            }
            else{
              if(r.success == true){

                api.editChannelMembers({
                  cid: r.result.details[0].channel_id,
                  add: [r.result.details[0].created_by],
                  remove: [],
                  token: item
                }, (e, r) => {
                  if(e){
                    alert("Error: "+e);
                  }
                  else{
                    if(r.success == true){
                      Stores.privateChannelStore.updateData()
                      Alert.alert(
                        'Chat group',
                        'Success',
                        [
                          //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: () => this.props.navigation.navigate('Schools')},
                        ],
                        { cancelable: false }
                      )
                    }
                    else {
                      alert('Something went wrong. Please try again.');
                    }
                  }
                })

              }
              else {
                alert('Could not Create Chat group. Please try again!');
              }
            }
          })
        }
      });
    }
    else{
      alert('Please fill up all the fields.')
    }
  }

  getAllMembers(){
    let groupData = Stores.groupStore.getData()
    let groupId = groupData.group_id

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        alert(err)
      }
      else{
        api.getGroupParticipants({group_id: groupId, token: tokenItem}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              this.setState({groupMember: r.result.participants})
            }
            else {
              alert('Connection Failed!');
            }
          }
        })
      }
    });
  }

  componentWillMount(){
    this.getAllMembers()
  }

  cancelModal(){
    this.setState({
      modalVisible: false,
      selectedMember: []
    })
  }

  toggleThis(value){
    this.setState({ toggled: value })
    if(value){
      this.setState({ toggleText: 'Private' })
    }
    else{
      this.setState({ toggleText: 'Public' })
    }
  }

  render() {
    const {navigate, goBack} = this.props.navigation;
    return (
      <View style={styles.modalcontainer1}>
        <StatusBar backgroundColor="#efeff9" translucent={false} barStyle="dark-content" />

        <Modal
          animationType="slide"
          onRequestClose={() => { this.setState({modalVisible: false})}}
          visible={this.state.modalVisible}>

          <View style={styles.modalNav}>
            <TouchableOpacity
              onPress={() => {
                this.cancelModal()
              }}>
              <Text style={{marginTop: 8,fontSize: 17,
                  fontWeight: "normal",
              fontStyle: "normal",fontFamily: 'System',color: "#9513fe"}}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{fontFamily: 'System',marginLeft: 10, color: 'black', fontSize: 20}}>Group Members</Text>
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: false})}>
              <Text style={{fontSize: 17,
                fontWeight: "600",
              fontStyle: "normal",fontFamily: 'System',color: "#9513fe", paddingRight: 15}}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={{margin:20,marginBottom:'30%'}}>
            <MemberViewScreen mainState={this}/>
          </View>

          {/* <TouchableHighlight
            style={styles.modalFab} underlayColor={'transparent'}
            // onPress={() => this.saveMembers()}
            onPress={() => this.setState({modalVisible: false})}>
            <MaterialIcons
              name="check"
              size={22}
              style={{color:'white'}}
            />
          </TouchableHighlight> */}
          <TouchableHighlight activeOpacity={0.5} style={styles.modalFab} underlayColor={'transparent'} onPress={() => this.setState({modalVisible: false})}>
            <MaterialIcons
              name="check"
              size={30}
              color="#9513fe"
              style={{ alignSelf: "center" }}
            />
          </TouchableHighlight>
        </Modal>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: "#efeff9",
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 80,
            paddingTop: IsIphoneX()?45:20,
            paddingLeft: 15,
            paddingRight: 15,
            elevation: 2,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Schools')}>
            <Text style={{fontFamily: 'System',color: "#9513fe", alignItems: 'center', fontSize: 17}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={{fontFamily: 'System',color: "#000", fontSize: 18, fontWeight: "400", alignItems: 'center'}}>
            Create Chat group
          </Text>
          <TouchableOpacity onPress={() => this.createChannel()}>
            <Text style={{fontFamily: 'System',color: "#9513fe", fontWeight: 'bold', alignItems: 'center', fontSize: 17}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 20, width: "100%", backgroundColor: "#f4f4f7", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#bcbbc1"}}/>

        <View style={styles.modalcontainer2}>
          {/* <ImageBackground
            style={styles.modalimageContainer}>
            <View style={styles.modaloverlay} />
            <IonIcons
              style={styles.modalcameraiconstyle}
              name="ios-camera-outline"
              size={35}
            />
          </ImageBackground> */}


          <View style={styles.modaltextFieldContainer}>
            {/* <TextField
              style={styles.modaltextFieldstyle}
              label="Channel name"
              textColor="#000000"
              tintColor="#888585"
              baseColor="#afadad"
              lineWidth={0}
              fontSize={15}
              titleFontSize={11}
              labelFontSize={11}
              value={this.state.name}
              onChangeText={ (name) => this.setState({ name }) }
            /> */}
            <Text style={{fontFamily: 'System',fontSize: 12, color: "#888585"}}>Chat Group Name</Text>
            <TextInput
              style={styles.modaltextFieldstyle}
              textColor="#000000"
              fontSize={16}
              onSubmitEditing={() => {
                this.focusNextField('two');
              }}
              value={this.state.name}
              onChangeText={ (name) => this.setState({ name }) }
              placeholder="Chat Group Name"
              blurOnSubmit={ false }
              returnKeyType={ "next" }
              ref={ input => {
                this.inputs['one'] = input;
              }}
            />
          </View>
        </View>
        <View style={{width: "100%", backgroundColor: "#f4f4f7", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#bcbbc1"}}>
          <Text style={{fontFamily: 'System',padding: 15, color: "#484b89"}}>Description</Text>
        </View>
        <View style={{paddingTop: 10, flex: 0.2, borderBottomWidth: 1, borderBottomColor: "#bcbbc1", backgroundColor: "white"}}>
          {/* <TextField
            style={styles.textFieldstyle}
            label='Description'
            textColor='#888585'
            tintColor='#888585'
            baseColor='#afadad'
            lineWidth={1}
            multiline={true}
            fontSize={15}
            titleFontSize={11}
            labelFontSize={11}
            value={this.state.about}
            onChangeText={ (desc) => this.setState({ desc }) }
          /> */}

          <TextInput
            style={styles.textInput}
            textColor="#000000"
            padding={15}
            fontSize={16}
            value={this.state.about}
            onChangeText={ (desc) => this.setState({ desc }) }
            placeholder="Description"
            blurOnSubmit={ true }
            returnKeyType={ "done" }
            ref={ input => {
              this.inputs['two'] = input;
            }}
            multiline = {true}
          />

        </View>

        <View style={{height: 20, width: "100%", backgroundColor: "#f4f4f7", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#bcbbc1"}}/>

        <View style={styles.modaltextsection}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#bcbbc1", backgroundColor: "white", paddingTop: 12, paddingBottom: 12, paddingLeft: 15, paddingRight: 15,}}>
            <Text style={styles.modaltextstyle}>{this.state.toggleText} chat group</Text>
            <Switch
              onTintColor='#c988fe'
              tintColor='#a9a9a9'
              thumbTintColor={this.randomColor()}
              onValueChange={ (value) => this.toggleThis(value) }
              value={ this.state.toggled }
            />
          </View>
          <Text style={{fontFamily: 'System',paddingTop: 12, paddingBottom: 12, paddingLeft: 15, paddingRight: 15, color: "#bcbbc1"}}>Private chat groups are visible only to parents that you have invited. Public chat groups are visible to all parents in this school group.</Text>
        </View>

        <View style={{padding: 20}}>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'flex-start'}}
            onPress={() => {this.setState({modalVisible: true})}}>
            <MaterialIcons
              name="add"
              size={19}
              style={{color:'#9513fe', marginEnd: 10}}
            />
            <Text style={{fontFamily: 'System',color: '#9513fe', fontSize: 15}}>
              ADD MEMBERS
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableHighlight activeOpacity={0.5} style={styles.modalFab} underlayColor={'transparent'} onPress={() => this.createChannel()}>
          <MaterialIcons
            name="check"
            size={30}
            color="#9513fe"
            style={{ alignSelf: "center" }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalcontainer1: {
    flex: 1,
    alignContent: "flex-start",
    backgroundColor: "#f4f4f7",
    //paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  modalcontainer2: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "white"
  },
  modaltextFieldContainer: {
    flex: 1,
    //paddingLeft: 15,
    alignContent: 'center',
    justifyContent: 'center'
  },
  modaltextsection: {

  },
  modaltextsection1: {
    paddingTop: 15,
    marginLeft: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#e0dbdb",
    paddingBottom: 15
  },
  modaltextsection2: {
    paddingTop: 15,
    marginLeft: 20,
    paddingBottom: 15
  },
  modalcameraiconstyle: {
    color: "#9c9ebf",
    position: "absolute",
    //top: 42,
    //left: 42,
    color: "#9513fe"
  },
  modaltextstyle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: "600",
    color: "#444444"
  },
  modaltextFieldstyle: {
    fontFamily: 'System',
    fontWeight: "600",
    alignSelf: 'stretch',
    //height: 44,
    //paddingHorizontal: 10,
    //marginHorizontal: 20,
    marginTop: 5,
  },
  modalimageContainer: {
    width: 80,
    height: 80,
    //marginTop: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modaloverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(244, 231, 254, 1)",
    borderRadius: 50
  },
  modalFab: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ecd9fc",
    height: 50,
    width: 70,
    borderRadius: 10,
    position: "absolute",
    bottom: 15,
    right: 15,
    elevation: 3,
    zIndex: 5,
    overflow: "hidden"
  },
  textInput: {
    fontFamily: 'System',
    alignSelf: 'stretch',
    height: 44,
    //paddingHorizontal: 10,
    //marginHorizontal: 20,
    //marginBottom: 20,
  },
  modalNav: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: IsIphoneX()?50:30,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efeff9',
    //maxHeight: 60
  },
});
