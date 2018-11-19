import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import colors from '@theme/colorsThree';
import { w, h } from "../helpers";

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
        {subTxt && subTxt.length>0 && (<Text style={[styles.subTextStyle, subTextStyle]}>{subTxt}</Text>)}
        {/* <Text style={[styles.subTextStyle, subTextStyle]}>{subTxt}</Text> */}

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
    marginTop: h(15),
    marginBottom: h(10),
    marginRight: w(20),
    marginLeft: 1,
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: 'System',
    color: colors.charcoalGrey,
    fontSize: w(24),
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center"
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
    letterSpacing: 0,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "center",
    fontSize: w(12)
  }
};
