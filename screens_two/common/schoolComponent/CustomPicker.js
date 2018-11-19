import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { w, h } from "../helpers";
import colors from '@theme/colorsThree';

const CustomPicker = ({ items, visible, close, onSelect, title }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent
      onRequestClose={close}
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          {items.map((val, indx) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={indx}
              onPress={() => onSelect(val)}
              style={styles.itemContainer}
            >
              <Text style={styles.itemText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default CustomPicker;

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    width: "60%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  title: {
    backgroundColor: colors.indigoBlue,
    alignItems: "center",
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  titleText: {
    fontFamily: 'System',
    fontSize: w(20),
    color: colors.white,
    fontWeight: "400"
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.blueGrey,
    paddingVertical: 15,
    paddingHorizontal: 12,
    justifyContent: "center"
  },
  itemText: { color: colors.charcoalGrey, fontFamily: 'System', fontSize: w(18) }
};
