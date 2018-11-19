import React from "react";
import { Header } from "react-native-elements";
import Colors from '@theme/colorsThree';

export const HeaderNav = () => {
  return (
    <Header
      outerContainerStyles={{ backgroundColor: Colors.indigoBlue, height: 175, padding:20 }}
      rightComponent={{
        icon: "edit",
        color: "#fff",
        marginBottom: 93,
        // onPress: () => this.props.nav('ProfileEdit', {ProfileMain: this}),
        onPress: () => console.log('pressed')
      }}
      centerComponent={{
        text: "My Profile",
        style: {
          fontFamily: "System",
          fontSize: 18,
          fontWeight: "600",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "center",
          color: Colors.white,
          marginBottom: 95
        }
      }}
    />
  );
};
