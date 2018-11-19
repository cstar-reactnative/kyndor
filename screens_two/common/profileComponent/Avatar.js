import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";
import colors from '@theme/colorsThree';
import { w, h } from "../helpers";
import images from "../../../images/index";

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;

const title = (
  <Text style={{ color: colors.blueGrey, fontFamily: 'System', fontSize: 18 }}>
    Upload image from
  </Text>
);

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }
  // showActionSheet = () => this.actionSheet.show();

  showActionSheet = () => this.props.onSelect();

  getActionSheetRef = ref => (this.actionSheet = ref);

  handlePress = index => {
    this.props.onSelect(index);
  };

  renderActionSheet = () => {
    const options = [
      "Cancel",
      {
        component: (
          <Text style={{ color: colors.charcoalGrey, fontFamily: 'System', fontSize: 24 }}>
            Camera
          </Text>
        ),
        height: 80
      },
      {
        component: (
          <Text style={{ color: colors.charcoalGrey, fontFamily: 'System', fontSize: 24 }}>
            Gallery
          </Text>
        ),
        height: 80
      }
    ];
    if (this.props.avatar) {
      options.push({
        component: (
          <Text style={{ color: colors.charcoalGrey, fontFamily: 'System', fontSize: 24 }}>
            Delete
          </Text>
        ),
        height: 80
      });
    }

    return (
      <ActionSheet
        ref={this.getActionSheetRef}
        title={title}
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={this.handlePress}
      />
    );
  };

  render() {
    const { avatar } = this.props;
    const {
      container,
      iconContainer,
      icon,
      imgContainer,
      image,
      button
    } = styles;

    return (
      <View style={container}>
        {!avatar ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={iconContainer}
            onPress={this.handlePress}
          >
            <Image source={images.camera} style={icon} />
          </TouchableOpacity>
        ) : (
          <View overflow="hidden" style={imgContainer}>
            <ImageBackground
              source={{ uri: avatar }}
              style={image}
              imageStyle={{ borderRadius: w(60) }}
              resizeMethod="resize"
              resizeMode="cover"
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.handlePress}
                style={button}
              >
                <Text style={{ fontFamily: 'System', color: "#fff" }}>EDIT</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
        {/* {this.renderActionSheet()} */}
      </View>
    );
  }
}
export default Avatar;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingVertical: h(25) },
  iconContainer: {
    backgroundColor: colors.lightBlueGrey,
    width: w(120),
    height: w(120),
    borderRadius: w(60),
    alignItems: "center",
    justifyContent: "center"
  },
  imgContainer: {
    width: w(120),
    height: w(120),
    borderRadius: w(60)
  },
  image: {
    width: w(120),
    height: w(120),
    justifyContent: "flex-end"
  },
  button: {
    backgroundColor: "rgba(56, 62, 83, 0.5)",
    height: h(32),
    alignItems: "center",
    justifyContent: "center"
  },
  icon: { width: w(50), height: w(50) }
});
