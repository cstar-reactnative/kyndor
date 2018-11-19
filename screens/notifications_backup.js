import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ToolbarAndroid,
  Platform,
  AsyncStorage,
  FlatList,
  Image
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const api =  require('../api/index');

class ApproveGroupElement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true,
      approveText: 'Approve'
    }
  }
  approveRequest(subId){
    if(this.state.approveText == 'Approve'){
      this.setState({approveText: 'loading..'})
      AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
        if(err){
          alert(err)
        }
        else{
          api.acceptJoinRequest({token:item, sid:subId}, (e, r) => {
            if(e){
              alert("Error: "+e);
            }
            else{
              if(r.success == true){
                this.setState({approveText: 'Done!'})
              }
              else {
                // alert('Failed!');
              }
            }
          })
        }
      });
    }
  }
  render() {
    if(this.state.display){
      return (
        <View style={{paddingLeft: 15, backgroundColor: '#ededf3', flexDirection: 'row', marginBottom: 10}} >
          <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}} >
            <Image
              source={require('../images/null_avatar.png')}
              style={StyleSheet.absolutefill}
            />
          </View>
          <View style={{flex: 0.88, justifyContent: 'flex-end', marginLeft: 15, paddingTop: 10}} >
            <View style={{paddingRight: 15}} >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                <Text style={{fontSize: 16, fontWeight: '400', color: '#212121', paddingBottom: 2}} >{this.props.line1}</Text>
                <Text style={{fontSize: 14}} >{this.props.time}</Text>
              </View>
              <Text style={{fontSize: 14, color: '#484b89'}} >{this.props.line2}</Text>
              <Text style={{fontSize: 14}} >{this.props.line3}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop:5}}>
              <TouchableOpacity onPress={() => {this.approveRequest(this.props.sub_id)}} style={{padding:5, backgroundColor:'white', borderRadius:5}}>
                <Text style={{color:'green'}}>{this.state.approveText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.setState({display: false})}} style={{padding:5, backgroundColor:'white', borderRadius:5, marginLeft: 10}}>
                <Text style={{color:'red'}}>Dismiss</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr}/>
          </View>
        </View>
      )
    }
    else{
      return null;
    }
  }
}

class NotificationElement extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TouchableOpacity style={{paddingLeft: 15, backgroundColor: '#ededf3', flexDirection: 'row'}} >
        <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}} >
          <Image
            source={require('../images/null_avatar.png')}
            style={StyleSheet.absolutefill}
          />
        </View>
        <View style={{flex: 0.88, justifyContent: 'flex-end', marginLeft: 15, paddingTop: 10}} >
          <View style={{paddingRight: 15}} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
              <Text style={{fontSize: 16, fontWeight: '400', color: '#212121', paddingBottom: 2}} >{this.props.line1}</Text>
              <Text style={{fontSize: 14}} >{this.props.time}</Text>
            </View>
            <Text style={{fontSize: 14, color: '#484b89'}} >{this.props.line2}</Text>
            <Text style={{fontSize: 14}} >{this.props.line3}</Text>
          </View>
          <View style={styles.hr}/>
        </View>
      </TouchableOpacity>
    )
  }
}

class NoNotificationElement extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Text style={styles.noData}>
        You have no Notifications!
      </Text>
    )
  }
}

class ViewNotification extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    myNotification: []
  }
  componentWillMount(){
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        alert(err)
      }
      else{
        api.listGroupRequest({token: item}, (e, r) => {
          if(e){
            alert("Error: "+e);
          }
          else{
            if(r.success == true){
              this.setState({myNotification: r.result})
            }
            else {
              // alert('Failed!');
            }
          }
        })
      }
    });
  }
  render() {
    if (this.state.myNotification.length == 0) {
      return <NoNotificationElement/>
    }
    else {
      return (
        // <NotificationElement line1={'Lesly Jackson replied'} time={'09:34 AM'} line2={'Anniversary celebration'} line3={"How can we do that? It's irrational and not..."} />
        // <View>
        //   <ApproveGroupElement line1={'Group Name'} time={'09:34 AM'} line2={'Wants to join ... '} line3={"This school.."} />
        //   <ApproveGroupElement line1={'Group Name'} time={'09:34 AM'} line2={'Wants to join ... '} line3={"This school.."} />
        // </View>

        <FlatList
          data={this.state.myNotification}
          renderItem={({item}) => {
            return(
              <ApproveGroupElement sub_id={item.subscription_id} line1={item.username} time={'09:34 AM'} line2={'Wants to join ... '} line3={item.group_name} />
            )
          }}
          keyExtractor={(item, index) => item.subscription_id.toString()}
        />
      )
    }
  }
}

class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
    headerRight: <TouchableOpacity><MaterialIcons name="filter-list" size={28} style={{color:'white'}}/></TouchableOpacity>,
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#484b89',
      paddingRight: 10,
      elevation: 5,
    },
  };

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={{backgroundColor: '#fff', flex: 1, paddingTop: (Platform.OS === 'ios') ? 20 : 0}} >
        <StatusBar backgroundColor="#393c63" translucent={false} barStyle="light-content" />
        <View style={{marginTop: 15}} >
          <StatusBar backgroundColor="#32345f" translucent={false} barStyle="light-content" />
          <ViewNotification/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noData:{
    alignSelf: 'center',
    color: '#484b89',
    fontSize: 20
  },
  hr: {
    borderBottomColor: "#d4d4da",
    borderBottomWidth: 1.5,
    paddingBottom: 10
  },
  toolbar: {
    backgroundColor: '#484b89',
    height: 60
  }
});

const NotificationApp = createStackNavigator({
  MyProfile: { screen: Notifications }
});

export default NotificationApp
