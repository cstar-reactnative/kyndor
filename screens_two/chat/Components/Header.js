import React from "react";
import { Header } from "react-native-elements";
import Colors from '@theme/ColorsTwo';

export const HeaderNav = () => {
  return (
    <Header
      statusBarProps={{ barStyle: "light-content" }}
      outerContainerStyles={{ backgroundColor: Colors.brandPrimary }}
      innerContainerStyles={{ paddingTop:0 }}
      leftComponent={{
        icon: "md-arrow-round-back",
        type: "ionicon",
        color: "#fff"
      }}
      centerComponent={{
        text: "Chat",
        style: {
          fontFamily: 'System',
          fontWeight: "bold",
          fontStyle: "normal",
          fontSize: 16,
          letterSpacing: 0.3,
          color: "#fff"
        }
      }}
    />
  );
};
