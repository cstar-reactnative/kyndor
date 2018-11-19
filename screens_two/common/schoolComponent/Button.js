import React from "react";
import { TouchableOpacity, Text, StyleSheet, PlatformIOS } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { w, h } from "../helpers";
import colors from '@theme/colorsThree';

const Button = ({ text, onPress, style, textStyle, icon }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {icon ? (
        <Ionicons name={icon} color={colors.white} size={30} />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.indigoBlue,
    marginTop: h(10),
    marginBottom: h(10),
    marginLeft: w(35),
    marginRight: w(35),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: w(30),
    height: h(50)
  },
  text: {
    fontFamily: 'System',
    color: colors.white,
    fontSize: w(15),
    fontWeight: "600",
    paddingVertical: h(15)
  }
});
