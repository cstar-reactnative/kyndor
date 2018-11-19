import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Colors from '@theme/colorsThree';
import { w, h } from "../../common/helpers";

const _Avatar = ({ avatar_bg }) => {
  return (
    <Avatar
      rounded
      icon={{
        name: "ios-text",
        type: "ionicon",
        size: 32,
        color: "#fff"
      }}
      containerStyle={{ marginLeft: 5 }}
      overlayContainerStyle={{ backgroundColor: `${avatar_bg}` }}
    />
  );
};

const MyCustomElement = ({ color, mCount }) => {
  return (
    <View>
      <Text style={{ color: `${color}`, fontFamily: "System", fontWeight: "600", fontStyle: "normal", marginLeft: 18, fontSize: w(18), letterSpacing: 0}}>
        {mCount}
      </Text>
      <Text style={{ color: "#91939b", fontFamily: "System", fontWeight: "normal", fontStyle: "normal", fontSize: w(13), letterSpacing: 0}}>Members</Text>
    </View>
  );
};

capitalize = (s) => {
  var str = s.toLowerCase()
  var array = str.split(" ");
  var a = '';
  for(i=0;i<array.length;i++){
    var n = array[i];
    var a = a + n.charAt(0).toUpperCase() + n.slice(1) + ' ';
  }
  return a;
}

export const List_Item = ({ list, screenProps, avatar_bg = ['#32aee6', '#17a258', '#f7c620'][Math.floor(Math.random() * 3)] }) => {

  return (
    <TouchableOpacity onPress={ () => {
      screenProps.navigate('ChatScreen',{groupId:list.group_id, channelId:list.channel_id, isGroup:true, channelName:list.channel_name, groupName:list.group_name})
    }}>
      <ListItem
        containerStyle={{
          marginTop: 7,
          marginBottom: 7,
          borderBottomColor: "#fff",
          shadowColor: "rgba(183, 183, 183, 0.36)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 3,
          backgroundColor:'#fff',
        }}
        medium
        avatar={<_Avatar avatar_bg={avatar_bg} />}
        subtitle={<Text style={{fontFamily: "System", fontSize:w(13), marginLeft:10, color:Colors.blueGrey}}>{capitalize(list.group_name)}</Text>}
        // title={list.name}
        title={<Text style={{fontFamily: "System", fontWeight:'500', fontStyle: 'normal', lineHeight: h(20), fontSize:w(16), marginLeft:10, color:"rgb(38, 38, 40)"}}>{capitalize(list.channel_name)}</Text>}
        rightIcon={<MyCustomElement color={avatar_bg} mCount={list.mCount} />}
      />
    </TouchableOpacity>
  );
};
