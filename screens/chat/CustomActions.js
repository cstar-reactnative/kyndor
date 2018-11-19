import PropTypes from "prop-types";
import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
  Platform,
  Image
} from "react-native";
import ImagePicker from 'react-native-image-picker';

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false
    };
    this.onActionsPress = this.onActionsPress.bind(this);
  }

  componentDidMount() {}
  shareSchool() {}
  shareCompany() {}

  selectPhotoTapped() {
    const options = {
      mediaType: 'photo', // 'photo' or 'video'
      //allowsEditing: true, // Built in functionality to resize/reposition the image after selection

      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // alert(JSON.stringify(response.uri));
        this.props.onSend({
          image: (Platform.OS==='android') ? response.uri : response.uri.replace('file://', ''),
          filePath: response.path,
          fileName: response.fileName
        });
      }
    });
  }

  onActionsPress() {
    // this.props.onActionButton();
    this.selectPhotoTapped()
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View>
        <Image
          source={require("./icons/attachment.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          style={[styles.container, this.props.containerStyle]}
          onPress={this.onActionsPress}
        >
          {this.renderIcon()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10
    // marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {}
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style
};
