import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from '@theme/colorsThree';
import { w, h } from "../helpers";

const Button = ({ text, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
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
