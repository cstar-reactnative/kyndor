import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { w, h } from "../helpers";
import colors from '@theme/colorsThree';

const SectionHeader = ({
  label,
  subTxt,
  onPress,
  style,
  textStyle,
  subTextStyle,
  withButton = true
}) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Text style={[styles.headerText, textStyle]}>{label}</Text>
        <Text style={[styles.subTextStyle, subTextStyle]}>{subTxt}</Text>
      </View>
      {withButton && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.buttonContainer}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = {
  container: {
    flexDirection: "row",
    marginTop: h(14),
    marginBottom: h(10),
    marginRight: w(20),
    marginLeft: 1,
    justifyContent: "space-between"
  },
  headerText: {
    fontFamily: 'System',
    color: colors.charcoalGrey,
    fontSize: w(20),
    fontWeight: "600",
    alignSelf: "center"
  },
  subTextStyle: {
    fontFamily: 'System',
    color: colors.blueGrey,
    fontWeight: "400",
    fontSize: w(16)
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: colors.indigoBlue,
    paddingVertical: h(6),
    paddingHorizontal: w(14),
    borderRadius: 15,
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: 'System',
    color: colors.white,
    fontWeight: "400",
    fontSize: w(12)
  }
};
