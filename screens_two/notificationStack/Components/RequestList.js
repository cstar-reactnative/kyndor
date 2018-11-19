import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { ListItem, Button } from "react-native-elements";
const api =  require('../../../api/index');

export const RequestList = ({ list }) => {

  capitalize = (s) => {
    if(s.length > 0){
      var str = s.toLowerCase()
      var array = str.split(" ");
      var a = '';
      for(i=0;i<array.length;i++){
        var n = array[i];
        var a = a + n.charAt(0).toUpperCase() + n.slice(1) + ' ';
      }
      return a;
    }
  }

  let wanaJoin = (list.channel_name) ? 'channel ' + capitalize(list.channel_name) + ' of ' + capitalize(list.group_name) : 'group ' + capitalize(list.group_name)

  let sid = (list.channel_name) ? list.channel_sub_id : list.subscription_id

  let isGroup = (list.channel_name) ? false : true

  processRequest = (des) => {
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        if(isGroup){
          console.log('@joinGroupAction')
          api.joinGroupAction({token:item, sid:sid, state:des}, (e, r) => {
            console.log('e: '+JSON.stringify(e))
            console.log('r: '+JSON.stringify(r))
            if(e){
              console.log("Error: "+e);
            }
            else{
              if(r.success == true){
                if(r.result.details.length > 0){
                  alert('Request completed successfully.')
                }
              }
              else {
                // alert('Failed!');
              }
            }
          })
        }
        else{
          console.log('@joinChannelAction')
          api.joinChannelAction({token:item, sid:subId, state:state}, (e, r) => {
            console.log('e: '+JSON.stringify(e))
            console.log('r: '+JSON.stringify(r))
            if(e){
              console.log("Error: "+e);
            }
            else{
              if(r.success == true){
                if(r.result.details.length > 0){
                  // let gotData = r.result.details[0]
                  // let gotAction = (gotData.state == 1) ? 'ACCEPTED' : 'REJECTED'
                  // alert('The user request has already been '+gotAction+' by '+gotData.updated_by_name+'.')

                  alert('Request completed successfully.')
                }
              }
              else {
                // alert('Failed!');
              }
            }
          })
        }
      }
    });
  }

  renderBottom = () => (
    <View style={styles.container}>
      <Button
        title="Approve"
        color="#841584"
        outline
        containerViewStyle={{
          // width: 100,
          // height: 50,
          paddingHorizontal:20,
          paddingVertical:30,
          marginTop: 10,
        }}
        borderRadius={50}
        fontSize={12}
        onPress={() => {
          this.processRequest(1)
        }}
      />
      <Button
        title="Decline"
        color="#e17d0d"
        outline
        containerViewStyle={{
          // width: 100,
          // height: 50,
          paddingHorizontal:20,
          paddingVertical:30,
          marginTop: 10
        }}
        borderRadius={50}
        fontSize={12}
        onPress={() => {
          this.processRequest(-1)
        }}
      />
    </View>
  );

  return (
    <View>
      <ListItem
        containerStyle={{
          marginTop: 5,
          marginBottom: 0,
          backgroundColor: '#fff',
          borderBottomColor: "#fff",
          borderLeftWidth: 3,
          borderLeftColor: "#511fb2",
          borderRadius: 4,
          height: 140
        }}
        large
        roundAvatar
        avatarContainerStyle={{
          width: 50,
          height: 50,
          borderRadius: 50
        }}
        avatarOverlayContainerStyle={{
          width: 50,
          height: 50,
          borderRadius: 50,
        }}
        avatarStyle={{
          width: 50,
          height: 50,
          borderRadius: 25
        }}
        // subtitle={<MyCustomElement subId={sid} isGroup={isGroup} />}
        subtitle={this.renderBottom()}
        chevronColor='#fff'
        avatar={{uri:list.avatar_url}}
        titleContainerStyle={{
          marginTop: 10
        }}
        titleNumberOfLines={2}
        // title={`${list.username} wants to join ${wanaJoin}.`}
        title={capitalize(list.username) + ' wants to join ' + wanaJoin }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    // flexWrap: "wrap",
    flex: 1,
    marginTop: -10,
    marginBottom:10
  },
  item: {
    margin: 15
  },
});
