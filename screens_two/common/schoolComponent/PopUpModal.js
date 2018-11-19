import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  PlatformIOS,
  Modal,
  Image,
  AsyncStorage,
  View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { w, h } from "../helpers";
import colors from '@theme/colorsThree';
import images from "../../../images/index";

const PopUpModal = ({ myName, visible, close, value, onPress }) => {
  return (
    <Modal
      animationType={"slide"}
      transparent
      onRequestClose={close}
      visible={visible}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={close}
          activeOpacity={0.9}
        >
          <Ionicons
            name={PlatformIOS ? "ios-close-circle" : "md-close-circle"}
            color="#fff"
            size={26}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          {/* <Image source={images.popupimage} style={styles.image} /> */}
          <Text style={styles.titleText}>Congrats {myName}!</Text>
          <View style={styles.resultTextContainer}>
            <Text style={styles.resultText}>
              Your request to add{" "}
              <Text style={{ fontFamily: 'System', fontWeight: "600" }}>{value} </Text>
              is sent to the moderator. You will be added to the school group
              soon.
            </Text>
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.95}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Meanwhile Explore More
              </Text>
              <Ionicons name="md-arrow-forward" color="#fff" size={26} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: w(30),
    paddingTop: h(22)
  },
  closeIcon: {
    alignItems: "flex-end",
    paddingBottom: 7
  },
  container: {
    backgroundColor: colors.white,
    width: w(320),
    height: h(425),
    borderRadius: 10
  },
  image: {
    width: w(320),
    height: h(180),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  titleText: {
    fontFamily: 'System',
    color: colors.indigoBlue,
    textAlign: "center",
    marginTop: h(12),
    marginBottom: h(14),
    fontWeight: "600",
    fontSize: w(20)
  },
  resultTextContainer: {
    justifyContent: "space-between",
    flex: 1
  },
  resultText: {
    fontFamily: 'System',
    color: colors.charcoalGrey,
    textAlign: "center",
    paddingHorizontal: w(30),
    fontWeight: "400",
    fontSize: w(16)
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.indigoBlue,
    paddingVertical: h(20),
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  buttonText: {
    fontFamily: 'System',
    color: colors.white,
    fontSize: w(14),
    fontWeight: "500",
    marginRight: w(10)
  }
});
