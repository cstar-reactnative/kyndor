import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

export const UserinfoList = ({ user }) => {
  return (
    <View>
      <ListItem
        roundAvatar
        title={user.name}
        subtitle={user.type}
        avatar={{ uri: user.avatar_url }}
        containerStyle={{
          marginTop: -40,
          //marginBottom: 5,
          backgroundColor: "#fff",
          borderBottomColor: "#fff",
          borderRadius: 4,
          height: 147,
          shadowColor: "rgba(0, 0, 0, 0.13)",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 4,
          shadowOpacity: 1
        }}
        roundAvatar
        avatarContainerStyle={{
          width: 94,
          height: 94,
          borderRadius: 94
        }}
        avatarOverlayContainerStyle={{
          width: 94,
          height: 94,
          borderRadius: 94,
          margin: 10
        }}
        avatarStyle={{
          width: 94,
          height: 94,
          borderRadius: 47
        }}
        titleContainerStyle={{
          marginTop: 5,
          marginLeft: 20
        }}
        titleStyle={{
          fontFamily: "System",
          color: '#4a4a4a',
          fontSize: 24,
          fontWeight: "600",
          fontStyle: "normal",
          letterSpacing: 0.23,
        }}
        subtitleContainerStyle={{
          marginTop: 5,
          marginLeft: 20
        }}
        subtitleStyle={{
          fontFamily: "System",
          fontSize: 16,
          fontWeight: "normal",
          fontStyle: "normal",
          letterSpacing: 0.15,
          color: "#9b9b9b"
        }}
        chevronColor="#fff"
      />
    </View>
  );
};
