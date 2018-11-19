import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Button } from "react-native-elements";

export const NotifyList = ({ list }) => {

  let wanaJoin = (list.channel_name) ? 'channel ' + capitalize(list.channel_name) + ' of ' + capitalize(list.group_name) : 'group ' + capitalize(list.group_name)

  let reaction = (list.state) ? 'accepted' : 'rejected'
  
  return (
    <View>
      <ListItem
        containerStyle={{
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: '#fff',
          borderBottomColor: "#fff",
          borderRadius: 4,
          height: 110
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
        chevronColor='#fff'
        avatar={{uri:list.avatar_url}}
        titleContainerStyle={{
          marginTop: 10
        }}
        titleNumberOfLines={3}
        title={`${capitalize(list.username)} is ${reaction} by ${capitalize(list.updated_by_name)} to the ${wanaJoin}.`}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1
  },
  item: {
    margin: 15
  },
});
