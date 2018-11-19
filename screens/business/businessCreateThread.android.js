import React, { Component } from "react";
import { TextField } from "react-native-material-textfield";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TabNavigator, createStackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
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
import CheckBox from 'react-native-check-box'
import Stores from '../../stores/';
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
            <Text style={{color:'#393939',fontSize:15}}>{this.props.name}</Text>
            <Text>Moderator</Text>
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
          <Text>No members!</Text>
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

  createChannel(){
    var thisThing = this
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
          api.createChannel({
            token:item,
            icon:this.state.img,
            desc:this.state.desc,
            access:access,
            gid:groupId,
            c_name:this.state.name,
            member:this.state.selectedMember
          }, (e, r) => {
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
                          {text: 'OK', onPress: () => thisThing.props.navigation.navigate('Business')},
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
        <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" />

        <Modal
          animationType="slide"
          onRequestClose={() => { this.setState({modalVisible: false})}}
          visible={this.state.modalVisible}>

          <View style={styles.modalNav}>
            <TouchableOpacity
              onPress={() => {
                this.cancelModal()
              }}>
              <MaterialIcons
                name="close"
                size={22}
                style={{color:'white'}}
              />
            </TouchableOpacity>
            <Text style={{marginLeft: 10, color: 'white', fontSize: 20}}>Group Members</Text>
          </View>

          <View style={{margin:20, marginBottom:'30%'}}>
            <MemberViewScreen mainState={this}/>
          </View>

          <TouchableHighlight
            style={styles.modalFab} underlayColor={'transparent'}
            // onPress={() => this.saveMembers()}
            onPress={() => this.setState({modalVisible: false})}>
            <MaterialIcons
              name="check"
              size={22}
              style={{color:'white'}}
            />
          </TouchableHighlight>
        </Modal>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: "#484b89",
            height: 60,
            paddingLeft: 15,
            paddingTop: 15,
            elevation: 2,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Business')}>
            <Text style={{marginTop: 2}}>
              <MaterialIcons
                name="close"
                size={22}
                style={{color:'white'}}
              />
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "#f4f4f7", fontSize: 18, fontWeight: "400", paddingLeft: 15}}>
            Create Chat group
          </Text>
        </View>

        <View style={{paddingLeft:15, paddingRight:15}}>
          <TextField
            style={styles.modaltextFieldstyle}
            label="Chat group name"
            textColor="#000000"
            tintColor="#888585"
            baseColor="#afadad"
            lineWidth={1}
            fontSize={15}
            titleFontSize={11}
            labelFontSize={11}
            value={this.state.name}
            onChangeText={ (name) => this.setState({ name }) }
          />
        </View>

        <View style={{paddingLeft:15, paddingRight:15}}>
          <TextField
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
          />
        </View>

        <View style={styles.modaltextsection}>
          <View style={{flexDirection: 'row', paddingRight: 15, justifyContent: 'space-between'}}>
            <Text style={styles.modaltextstyle}>{this.state.toggleText} Chat group</Text>
            <Switch
              onTintColor='#c988fe'
              tintColor='#a9a9a9'
              thumbTintColor={this.randomColor()}
              onValueChange={ (value) => this.toggleThis(value) }
              value={ this.state.toggled }
            />
          </View>
          <Text style={{paddingRight: 50}}>
            Private chat groups are visible only to parents that you have invited. Public chat groups are visible to all parents in this business group.
          </Text>
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
            <Text style={{color: '#9513fe', fontSize: 15}}>
              ADD MEMBERS
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableHighlight style={styles.modalFab} underlayColor={'transparent'} onPress={() => this.createChannel()}>
          <MaterialIcons
            name="check"
            size={22}
            style={{color:'white'}}
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
    backgroundColor: "white",
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  modalcontainer2: {
    flex: 0.3,
    alignContent: "center",
    justifyContent: 'center',
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15
  },
  modaltextFieldContainer: {
    flex: 1,
    paddingLeft: 15,
    alignContent: 'center',
    justifyContent: 'center'
  },
  modaltextsection: {
    paddingTop: 20,
    paddingLeft: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#e0dbdb",
    paddingBottom: 25
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
    top: 44,
    left: 40,
    color: "#9513fe"
  },
  modaltextstyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444444"
  },
  modaltextFieldstyle: {
    fontWeight: "600"
  },
  modalimageContainer: {
    width: 80,
    height: 80,
    marginTop: 20,
    borderRadius: 50
  },
  modaloverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(244, 231, 254, 1)",
    borderRadius: 50
  },
  modalFab: {
    backgroundColor: '#9513fe',
    height: 50,
    width: 50,
    borderRadius: 50,
    padding: 14,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 5,
    elevation: 3,
    overflow:'hidden'
  },
  modalNav: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: (Platform.OS === 'ios') ? 30:15,
    paddingLeft: 15,
    paddingBottom: 15,
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#484b89',
    //maxHeight: 60
  },
});
