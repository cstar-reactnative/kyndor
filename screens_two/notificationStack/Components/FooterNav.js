import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const FooterNav = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Icon
          name="ios-notifications-outline"
          type="ionicon"
          color="#c6c8d0"
          size={32}
        />
        <Text style={styles.text}>Vibes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon
          name="ios-school-outline"
          type="ionicon"
          color="#c6c8d0"
          size={32}
        />
        <Text style={styles.text}>School</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon
          name="ios-chatbubbles-outline"
          type="ionicon"
          size={32}
          color="#c6c8d0"
        />
        <Text style={styles.text}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon
          name="ios-notifications"
          type="ionicon"
          color="#511fb2"
          size={32}
        />
        <Text style={styles.text}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon name="ios-person" type="ionicon" color="#c6c8d0" size={32} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
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
    marginLeft: 15,
    marginRight: 20,
    marginTop: 3,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.3,
    color: "rgb(145, 147, 155)"
  }
});
