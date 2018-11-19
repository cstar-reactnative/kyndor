import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { w, h } from "../helpers";
import colors from '@theme/colorsThree';
import images from "../../../images/index";

import Stores from '../../../stores/';
const api =  require('../../../api/index');

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

const ListItem = ({ data, onPress, onAddIconPress, icon }) => {
  const { item, index } = data;
  const { subText, circle, schoolIcon, textContainer } = styles;
  const color = [
    colors.darkSkyBlue,
    colors.goldenYellow,
    colors.vermillion,
    colors.warmBlue,
    colors.darkSeaGreen
  ];

  return (
    <View
      style={styles.container}
      activeOpacity={0.9}>
      <View style={{ justifyContent: "center" }}>
        <View
          style={[circle, { backgroundColor: color[index % color.length] }]}
        >
          <Image
            source={images.school}
            style={schoolIcon}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={textContainer}>
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {capitalize(item.name)}
          </Text>
          {/* {item.members &&
            item.members.length > 0 && (
              <Text style={subText}>
            {item.members.length}{" "}
            {item.members.length === 1 ? "member" : "members"}
              </Text>
          )} */}

          {item.meta_data &&
            item.meta_data.school_city && (
              <Text style={subText}>
                {capitalize(item.meta_data.school_city)}
              </Text>
            )}

          {/* <Text style={subText}>
              {item.meta_data.school_city}
          </Text> */}
        </View>
      </View>

      <RightIcon item={item} onAddIconPress={onAddIconPress} icon={icon} />
    </View>
  );
};

export default ListItem;

const RightIcon = ({ item, onAddIconPress, icon }) => {
  switch (icon) {
    case "add":
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onAddIconPress(item)}
          style={[styles.rightIconContainer, styles.addIcon]}
        >
          <Ionicons name="ios-add" color={colors.indigoBlue} size={30} />
        </TouchableOpacity>
      );
    case "check":
      return (
        <View
          style={[
            styles.rightIconContainer,
            { backgroundColor: colors.indigoBlue }
          ]}
        >
          <Ionicons name="ios-checkmark" color={colors.white} size={30} />
        </View>
      );
    case "hourglass":
      return (
        <View
          style={[
            styles.rightIconContainer,
            { backgroundColor: colors.orange }
            // { backgroundColor: colors.indigoBlue }
          ]}
        >
          <FontAwesome name="hourglass-3" color={colors.white} size={15} />
        </View>
      );
    case "close":
      return (
        <View
          style={[
            styles.rightIconContainer,
            { backgroundColor: colors.vermillion }
          ]}
        >
          <Ionicons name="ios-close" color={colors.white} size={30} />
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: h(10),
    marginHorizontal: w(20),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: h(13),
    paddingBottom: h(13),
    paddingHorizontal: w(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 5,
    elevation: 2
  },
  circle: {
    width: w(40),
    height: w(40),
    borderRadius: w(20),
    alignItems: "center",
    justifyContent: "center"
  },
  schoolIcon: {
    width: w(22),
    height: w(20),
    tintColor: "#fff"
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: w(15)
  },
  text: {
    fontFamily: 'System',
    color: "rgb(38, 38, 40)",
    fontWeight: "500",
    fontSize: w(16),
    lineHeight: h(20)
  },
  subText: {
    fontFamily: 'System',
    fontSize: w(13),
    color: colors.blueGrey
  },
  rightIconContainer: {
    width: w(30),
    height: w(30),
    borderRadius: w(15),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  addIcon: {
    borderColor: colors.indigoBlue,
    borderWidth: 2
  }
});
