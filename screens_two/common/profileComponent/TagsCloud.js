import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SectionHeader from "./SectionHeader";
import colors from '@theme/colorsThree';
import { w, h } from "../helpers";

const TagsCloud = ({ onPress, data, selected }) => {
  const pressed = {
    container: {
      backgroundColor: colors.paleLilac,
      borderColor: colors.indigoBlue
    },
    text: { fontFamily: 'System', color: colors.indigoBlue }
  };
  return (
    <View style={styles.container}>
      <SectionHeader
        label="Areas of Interest"
        subTxt="Select below tags"
        withButton={false}
        style={{ marginTop: 0 }}
        textStyle={{ fontFamily: 'System', fontSize: w(22) }}
        subTextStyle={{ fontFamily: 'System', fontSize: w(18) }}
      />

      <View style={styles.tagsContainer}>
        {data.map((val, indx) => (
          <TouchableOpacity
            key={indx}
            onPress={() => onPress(indx)}
            style={[
              styles.buttonContainer,
              selected.includes(indx) && pressed.container
            ]}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.buttonText,
                selected.includes(indx) && pressed.text
              ]}
            >
              {val}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TagsCloud;

const styles = {
  container: {
    marginTop: h(25),
    marginBottom: h(30),
    justifyContent: "space-between"
  },
  tagsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  buttonContainer: {
    backgroundColor: "transparent",
    paddingVertical: h(4),
    paddingHorizontal: w(10),
    borderRadius: 25,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.blueGrey,
    marginTop: 5,
    marginLeft: 5
  },
  buttonText: {
    fontFamily: 'System',
    color: colors.blueGrey,
    fontWeight: "400",
    fontSize: w(14)
  }
};
