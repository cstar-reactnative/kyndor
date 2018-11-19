import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
  StatusBar,
  ToolbarAndroid,
  ScrollView,
  AsyncStorage,
  FlatList,
  Switch,
  Platform
} from 'react-native';
import colors from '@theme/colorsThree';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IsIphoneX from '@theme/IsIphoneX';
const api =  require('../../api/index');

class ParticipantView extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return(
      <View style={{backgroundColor: 'white',paddingLeft: 15, flexDirection: 'row', marginTop: 12}} >
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 15}} >
          <Image
            source={this.props.profile_pic}
            style={StyleSheet.absolutefill}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}} >
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 15}} >
            <View style={{paddingLeft: 15, justifyContent: 'center'}} >
              <Text style={{fontFamily: 'System',fontSize: 16, color: '#212121'}} >{this.props.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}} >
              <View style={{justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{fontFamily: 'System',fontSize: 16, color: '#9513fe'}} >
                  {/* {this.props.about} */}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.hr} />
        </View>
      </View>
    )
  }
}

class ParticipantList extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    if(this.props.mainState.state.channelMember.length > 0){
      return(
        <FlatList
          data={this.props.mainState.state.channelMember}
          renderItem={
            ({item}) => {
              return(
                <ParticipantView
                  profile_pic={require('../../images/null_avatar.png')}
                  name={item.name}
                  about={item.about}
                />
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
          <Text style={{fontFamily: 'System', paddingLeft: 20}}>No Member added yet!</Text>
        </View>
      )
    }
  }
}

export default class AboutChannel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      channelName: '...loading...',
      channelDesc: '...loading...',
      channelIcon: '',
      channelMember: []
    };
  }

  // static navigationOptions =
  //   Platform.select({
  //     ios:{
  //     //title: 'Channel info',
  //     headerTintColor: '#ffffff',
  //     elevation: 0,
  //     headerStyle: {
  //       backgroundColor: '#484b89',
  //       elevation: 0
  //     }
  //   },
  //   android:{
  //     title: 'Channel info',
  //     header: null
  //   }
  // });

  static navigationOptions = {
    title: 'Channel info',
    header: null
  }

  getChannelInfo(cid){
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        // alert(err)
      }
      else{
        api.getChannelInfo({cid: cid, token: tokenItem}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            // alert(JSON.stringify(r))
            if(r.success == true){
              this.setState({
                channelName: r.result[0].channel_name,
                channelDesc: r.result[0].description,
                channelIcon: r.result[0].icon,
              })
            }
            else {
              alert('Something went wrong!');
            }
          }
        })
      }
    });
  }

  componentDidMount(){
    var { params } = this.props.navigation.state;
    var cid = params ? params.cid : 0;
    let cMem = params ? params.members : []
    this.setState({channelMember:cMem})
    this.getChannelInfo(cid)
  }

  render(){
    return(
      <View style={{backgroundColor: '#eeeeee', flex: 1, overflow: "hidden"}}>
        {/* <StatusBar backgroundColor={(Platform.OS === 'ios') ? "#efeff9" : "#32345f"} translucent={false} barStyle= {(Platform.OS === 'ios') ? "dark-content" : "light-content"} /> */}
        <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
        {(Platform.OS === 'ios') ? <TouchableOpacity style={{justifyContent: 'flex-start'}} onPress={() => this.props.navigation.goBack()}>
          <View style={{ backgroundColor: colors.indigoBlue, paddingTop: IsIphoneX()?50:30, flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="chevron-left"
              size={40}
              color="#fff"
            />
            <Text style={{fontFamily: 'System',color: "#fff", textAlign: 'left', marginLeft: -10}}>Back</Text>
          </View>
        </TouchableOpacity> :
        <MaterialIcons.ToolbarAndroid
          titleColor='#fff'
          navIconName= 'arrow-back'
          onIconClicked={() => this.props.navigation.goBack()}
          // actions={[
          //   {
          //     title: 'Star',
          //     iconName: 'star-border',
          //     iconSize: 25,
          //     iconColor: '#fff',
          //     show: 'always'
          //   },
          //   {
          //     title: 'Edit',
          //     iconName: 'edit',
          //     iconSize: 25,
          //     iconColor: '#fff',
          //     show: 'always'
          //   },
          //   {
          //     title: 'Options',
          //     iconName: 'more-vert',
          //     iconSize: 25,
          //     iconColor: '#fff',
          //     show: 'always'
          //   }
          // ]}
          // actions={toolbaractions}
          style={styles.toolbar}
          // onActionSelected={this._onActionSelected}
        />
        }

        <Image style={{elevation: 8, alignSelf: 'center', top: (Platform.OS==="ios") ? -40 : -50 }} width={100} height={100} source={require('../../images/null_avatar.png')}/>

        <View style={{top:-20, justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#fff'}} >
          <Text style={{fontFamily: 'System',color: '#484b89', fontSize: 18, paddingBottom: 5}} >
            {this.state.channelName}
          </Text>
          <Text style={{fontFamily: 'System',color: '#6c6c6c'}} >
            {this.state.channelDesc}
          </Text>
        </View>

        {/* <View style={{justifyContent: 'center', alignItems: 'center', padding: 15}} >
          <Text style={{fontSize: 16, color: '#939393'}} >Your comment</Text>
          </View>
          <View style={[styles.hr,{marginHorizontal: 15}]} />
          <Text style={{color: '#6c6c6c', paddingTop: 5, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, textAlign: 'center'}} >
          This comment will be show below the channel name in a channels list. It will help you to remind
        </Text> */}

        <View style={{backgroundColor: '#fff', padding: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
          <Text style={{fontFamily: 'System',fontSize: 16, color: '#000'}} >Mute group</Text>
          <Switch
            onValueChange={value=>
              this.setState({falseSwitchIsOn: value})
            }
            onTintColor='#c989fe'
            style={{marginBottom: 10}}
            thumbTintColor= '#9513fe'
            value={this.state.falseSwitchIsOn}
          />
        </View>

        {/* <ScrollView style={styles.containerShadow}>
          <Text style={{alignSelf: 'center', fontSize: 14, color: '#484b89', paddingTop: 20, fontWeight: '400', paddingLeft: 15}} >Participants</Text>

            <ParticipantView/>
            <ParticipantView/>

        </ScrollView> */}

        <ParticipantList mainState={this}/>

        {/* <Text style={{color: '#9513fe', fontSize: 16, marginTop: 20, textAlign: 'right', paddingRight: 15}} >LEAVE THE CHANNEL</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: colors.indigoBlue,
    height: 60
  },
  hr: {
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    marginLeft: 15
  },
  containerShadow: {
    shadowColor: '#000',
    shadowRadius: 100,
    shadowOffset: {height: 40},
    shadowOpacity: 1,
    backgroundColor: '#fff',
    elevation: 2
  }
});
